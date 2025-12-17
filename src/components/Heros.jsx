import React, { useMemo, useRef, useState } from "react";
import { useThemeColors } from "./ThemeContext";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

gsap.registerPlugin(ScrollTrigger);

export default function Heros() {
  const colors = useThemeColors();
  const containerRef = useRef(null);
  const confettiContainerRef = useRef(null);

  const [activeMissionIndex, setActiveMissionIndex] = useState(0);

  const missionItems = useMemo(
    () => [
      {
        key: "anniv",
        title: "🎉 Anniversaires",
        desc: "Des surprises personnalisées, élégantes et pleines d’émotion.",
        mediaType: "image",
        mediaSrc: "/img1.jpg",
      },
      {
        key: "romantique",
        title: "💖 Moments romantiques",
        desc: "Une mise en scène délicate, pensée avec cœur, pour marquer les esprits.",
        mediaType: "image",
        mediaSrc: "/img2.png",
      },
      {
        key: "domicile",
        title: "🎁 Surprises à domicile",
        desc: "Décor, musique, timing… tout est orchestré pour un effet WAOUH.",
        mediaType: "video",
        mediaSrc: "/video.mp4",
      },
      {
        key: "remerciements",
        title: "🙌 Remerciements & reconnaissance",
        desc: "Offrir du plaisir en cadeau, avec discrétion et professionnalisme.",
        mediaType: "image",
        mediaSrc: "/apropos.jpeg",
      },
      {
        key: "special",
        title: "✨ Événements spéciaux",
        desc: "Une expérience unique, authentique, élégante et mémorable.",
        mediaType: "image",
        mediaSrc: "/img().",
      },
    ],
    []
  );

  const activeItem = missionItems[activeMissionIndex];

  // 1) Setup GSAP/ScrollTriggers (UNE SEULE FOIS)
  useGSAP(
    (context) => {
      const q = context.selector;
      const mm = gsap.matchMedia();

      // --- hauteur navbar réelle (pour éviter contenu caché) ---
      const getNavH = () => {
        const nav = document.querySelector("nav");
        return nav?.offsetHeight ? nav.offsetHeight : 72;
      };

      // --- confettis init ---
      const confettiContainer = confettiContainerRef.current;
      if (confettiContainer) {
        const existing = confettiContainer.querySelectorAll(".confetti-piece");
        if (!existing.length) {
          const palette = ["#FFC107", "#F8FAFC", "#A5C9FF", "#FFE7A0"];
          Array.from({ length: 18 }).forEach(() => {
            const piece = document.createElement("span");
            piece.className = "confetti-piece";
            Object.assign(piece.style, {
              position: "absolute",
              width: "7px",
              height: "12px",
              borderRadius: "5px",
              backgroundColor: gsap.utils.random(palette),
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: "8",
              opacity: "0",
            });
            confettiContainer.appendChild(piece);
          });
        }
      }

      const playConfetti = () => {
        if (!confettiContainer) return;
        const pieces = confettiContainer.querySelectorAll(".confetti-piece");
        if (!pieces.length) return;

        gsap.fromTo(
          pieces,
          { x: 0, y: 0, scale: 0.6, opacity: 1, rotate: 0 },
          {
            duration: 1.2,
            x: () => gsap.utils.random(-95, 95),
            y: () => gsap.utils.random(-95, 45),
            rotate: () => gsap.utils.random(-240, 240),
            scale: () => gsap.utils.random(0.8, 1.35),
            opacity: 0,
            ease: "power3.out",
            stagger: 0.035,
          }
        );
      };

      // confettis on enter
      ScrollTrigger.create({
        trigger: q(".hero-top")[0],
        start: "top 80%",
        once: true,
        onEnter: playConfetti,
      });

      // intro
      gsap
        .timeline({
          defaults: { duration: 0.9, ease: "power2.out" },
          scrollTrigger: {
            trigger: q(".hero-top")[0],
            start: "top 80%",
            once: true,
          },
        })
        .from(q(".hero-text-block .title"), { y: 40, opacity: 0 })
        .from(q(".hero-text-block .subtitle"), { y: 22, opacity: 0 }, "-=0.55")
        .from(q(".hero-text-block .hero-cta"), { y: 18, opacity: 0 }, "-=0.45")
        .from(q(".hero-left-card, .hero-center-media, .hero-right-card"), { y: 24, opacity: 0, stagger: 0.1 }, "-=0.45")
        .add(playConfetti, "-=0.25");

      // Freepik effect desktop (avec offset navbar)
      mm.add("(min-width: 1024px)", () => {
        const navH = getNavH();

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q(".hero-top")[0],
            start: `top top+=${navH}`,
            end: `bottom+=150% top+=${navH}`,
            scrub: true,
            pin: true,
            anticipatePin: 1,
            invalidateOnRefresh: true,
          },
        });

        tl.fromTo(q(".hero-center"), { flexBasis: "36%" }, { flexBasis: "88%", duration: 1.2, ease: "power2.out" }, 0)
          .fromTo(q(".hero-left"), { flexBasis: "32%", opacity: 1 }, { flexBasis: "0%", opacity: 0, duration: 1 }, 0.05)
          .fromTo(q(".hero-right"), { flexBasis: "32%", opacity: 1 }, { flexBasis: "0%", opacity: 0, duration: 1 }, 0.05)
          .to(q(".hero-center-media"), { scale: 1.22, borderRadius: "0px", duration: 1.1, ease: "power2.out" }, 0.18);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // mobile light
      mm.add("(max-width: 1023px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: q(".hero-top")[0],
            start: "top 80%",
            end: "bottom center",
            scrub: true,
          },
        });

        tl.to(q(".hero-center-media"), { scale: 1.08, duration: 1 }, 0)
          .to(q(".hero-left"), { y: 24, opacity: 0.6, duration: 1 }, 0)
          .to(q(".hero-right"), { y: 24, opacity: 0.6, duration: 1 }, 0);

        return () => {
          tl.scrollTrigger?.kill();
          tl.kill();
        };
      });

      // Mission: activation au scroll (sans boucle rAF)
      const itemEls = q(".mission-item");
      itemEls.forEach((el, idx) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 65%",
          end: "bottom 35%",
          onEnter: () => setActiveMissionIndex(idx),
          onEnterBack: () => setActiveMissionIndex(idx),
        });
      });

      // mission fade
      gsap.from(q(".mission-fade"), {
        y: 24,
        opacity: 0,
        duration: 0.9,
        ease: "power2.out",
        stagger: 0.1,
        scrollTrigger: {
          trigger: q(".mission-section")[0],
          start: "top 80%",
          once: true,
        },
      });

      // refresh correct quand la navbar change
      ScrollTrigger.addEventListener("refreshInit", () => {
        // nothing, just ensures navH recalculated through invalidateOnRefresh
      });

      return () => {
        mm.revert();
        ScrollTrigger.getAll().forEach((st) => {
          // ne tue pas tout globalement si tu as d'autres sections,
          // mais ici on est scoped, donc ok: context.revert() gère la plupart.
        });
      };
    },
    { scope: containerRef }
  );

  // 2) Anim du media mission à chaque changement d’item (propre)
  useGSAP(
    (context) => {
      const q = context.selector;
      const media = q(".mission-media")[0];
      if (!media) return;

      gsap.fromTo(
        media,
        { y: 10, opacity: 0.65, scale: 0.985 },
        { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: "power2.out" }
      );
    },
    { scope: containerRef, dependencies: [activeMissionIndex] }
  );

  return (
    <section
      ref={containerRef}
      id="acceuil"
      className="relative py-16 md:py-20 px-4 md:px-8 overflow-hidden"
      style={{ background: colors.bgPrimary }}
    >
      <div className="max-w-7xl mx-auto space-y-20">
        {/* HERO TOP */}
        <div className="hero-top grid lg:grid-cols-2 gap-12 items-center">
          {/* Texte */}
          <div className="hero-text-block space-y-6">
            <h1
              className="title text-6xl md:text-7xl lg:text-8xl leading-[0.92] tracking-wide font-extrabold relative"
              style={{
                fontFamily: "Playfair Display, serif",
                color: colors.textPrimary,
                textShadow: "inset 0 2px 8px rgba(0,0,0,0.35), 0 10px 30px rgba(0,0,0,0.22)",
                WebkitTextStroke: "1px rgba(0,0,0,0.14)",
              }}
            >
              SERV
              <span className="hero-i relative inline-block mx-0.5">
                <span className="relative inline-block">
                  I
                  <span className="hero-i-dot absolute left-1/2 -translate-x-1/2 -top-2" style={{ width: 10, height: 10 }}>
                    <span
                      className="hero-i-dot-core inline-block rounded-full"
                      style={{
                        width: "100%",
                        height: "100%",
                        backgroundColor: colors.accent,
                        boxShadow: "0 0 10px rgba(255,193,7,0.9)",
                        position: "relative",
                        zIndex: 10,
                      }}
                    />
                    <span ref={confettiContainerRef} className="hero-confetti absolute inset-[-10px] pointer-events-none" />
                  </span>
                </span>
              </span>
              CE CORDIALE
            </h1>

            <p
              className="subtitle font-[Poppins] font-medium text-sm md:text-base lg:text-lg max-w-3xl leading-relaxed opacity-90"
              style={{ color: colors.textSecondary }}
            >
              Offrez plus qu’un cadeau, offrez une surprise. Mariages, anniversaires, baptêmes, demandes spéciales…
              Service Cordiale met en scène vos émotions.
            </p>

            <div className="hero-cta flex flex-wrap items-center gap-4">
              <a
                href="https://wa.me/237690271950"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-3 rounded-full font-[Poppins] font-semibold shadow-lg transition-transform duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: colors.accent, color: colors.isDark ? "#0F172A" : "#0B1220" }}
              >
                Préparer une surprise
              </a>
              <a
                href="#nos-offres"
                className="px-6 py-3 rounded-full font-[Poppins] font-semibold border transition-all duration-300 hover:-translate-y-0.5"
                style={{ borderColor: colors.accent, color: colors.textPrimary }}
              >
                Découvrir nos offres
              </a>
            </div>
          </div>

          {/* VISUEL : plus grand */}
          <div className="hero-visual flex gap-5 items-stretch">
            <div className="hero-left basis-[32%] shrink-0 flex items-center justify-center">
              <div
                className="hero-left-card relative w-full rounded-3xl overflow-hidden shadow-2xl"
                style={{ height: "clamp(230px, 26vw, 380px)" }}
              >
                <img src="/img1.png" alt="Client surpris" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>

            <div className="hero-center basis-[36%] shrink-0 flex items-center justify-center">
              <div
                className="hero-center-media relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10"
                style={{ height: "clamp(230px, 26vw, 380px)", background: colors.bgSecondary }}
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover"
                  src="/video.mp4"
                  autoPlay
                  muted
                  loop
                  playsInline
                />
              </div>
            </div>

            <div className="hero-right basis-[32%] shrink-0 flex items-center justify-center">
              <div
                className="hero-right-card relative w-full rounded-3xl overflow-hidden shadow-2xl"
                style={{ height: "clamp(230px, 26vw, 380px)" }}
              >
                <img src="/img2.png" alt="Cadeaux prêts à être offerts" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        {/* MISSION SECTION */}
        <div className="mission-section grid lg:grid-cols-2 gap-12 items-start">
          <div className="space-y-8 mission-fade">
            <div className="space-y-3">
              <p className="text-sm font-[Poppins] uppercase tracking-[0.25em]" style={{ color: colors.accent }}>
                Notre mission
              </p>
              <h2
                className="text-3xl md:text-4xl font-bold"
                style={{ fontFamily: "Playfair Display, serif", color: colors.textPrimary }}
              >
                Transformez chaque instant en souvenir
              </h2>
              <p className="text-base font-[Poppins] leading-relaxed" style={{ color: colors.textSecondary }}>
                Chez Service Cordial, nous croyons qu’un cadeau n’est pas seulement un objet : c’est une émotion, un souvenir, un sourire.
                <br />
                Notre mission est simple : créer des moments mémorables grâce à des surprises personnalisées, élégantes et pensées avec cœur.
              </p>
            </div>

            <div className="space-y-4">
              {missionItems.map((it, idx) => (
                <div
                  key={it.key}
                  className="mission-item p-4 rounded-2xl border border-white/10 cursor-pointer transition-all"
                  style={{
                    backgroundColor: idx === activeMissionIndex ? "rgba(255,193,7,0.10)" : "transparent",
                  }}
                  onMouseEnter={() => setActiveMissionIndex(idx)}
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                    <div className="space-y-1">
                      <p className="font-[Poppins] font-semibold" style={{ color: colors.textPrimary }}>
                        {it.title}
                      </p>
                      <p className="text-sm font-[Poppins]" style={{ color: colors.textSecondary }}>
                        {it.desc}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="space-y-3">
              <p className="text-sm font-[Poppins]" style={{ color: colors.textSecondary }}>
                Chaque détail compte : le choix des couleurs, le décor, la musique, les fleurs, le timing…
                Nous prenons le temps de comprendre vos envies et votre histoire.
              </p>
              <ul className="space-y-2">
                {["Service professionnel et discret", "Respect du budget", "Organisation fluide", "Offrir le plaisir en cadeau"].map((t) => (
                  <li key={t} className="flex items-start gap-3 font-[Poppins]">
                    <span className="mt-2 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: colors.accent }} />
                    <span style={{ color: colors.textSecondary }}>{t}</span>
                  </li>
                ))}
              </ul>
              <p className="font-[Poppins] font-semibold" style={{ color: colors.textPrimary }}>
                Chez Service Cordial, nous transformons chaque instant en souvenir.
              </p>
            </div>
          </div>

          <div className="mission-fade">
            <div className="mission-media relative w-full rounded-3xl overflow-hidden shadow-2xl border border-white/10"
              style={{ height: "clamp(320px, 34vw, 520px)" }}
            >
              <div
                className="absolute inset-0 blur-3xl opacity-40"
                style={{ background: "linear-gradient(135deg, rgba(255,193,7,0.35), rgba(122,162,247,0.25))" }}
              />
              <div className="relative w-full h-full">
                {activeItem.mediaType === "video" ? (
                  <video
                    key={activeItem.mediaSrc}
                    className="absolute inset-0 w-full h-full object-cover"
                    src={activeItem.mediaSrc}
                    autoPlay
                    muted
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    key={activeItem.mediaSrc}
                    src={activeItem.mediaSrc}
                    alt={activeItem.title}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                )}
              </div>
            </div>

            <div className="mt-5 p-5 rounded-2xl border border-white/10" style={{ backgroundColor: colors.bgCard }}>
              <p className="font-[Poppins] font-semibold" style={{ color: colors.textPrimary }}>
                {activeItem.title}
              </p>
              <p className="text-sm font-[Poppins]" style={{ color: colors.textSecondary }}>
                {activeItem.desc}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
