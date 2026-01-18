import React, { useMemo, useRef, useState } from "react";
import { Link } from 'react-router-dom';
import { useThemeColors } from "./ThemeContext";
import { gsap } from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Heros() {
  const colors = useThemeColors();
  const containerRef = useRef(null);
  const heroRef = useRef(null);
  const [activeMissionIndex, setActiveMissionIndex] = useState(0);

  const missionItems = useMemo(
    () => [
      { key: "anniv", title: "🎉 Anniversaires", desc: "Des surprises personnalisées, élégantes et pleines d'émotion.", mediaType: "image", mediaSrc: "/img1.png" },
      { key: "romantique", title: "💖 Moments romantiques", desc: "Une mise en scène délicate, pensée avec cœur, pour marquer les esprits.", mediaType: "image", mediaSrc: "/img2.png" },
      { key: "domicile", title: "🎁 Surprises à domicile", desc: "Décor, musique, timing… tout est orchestré pour un effet WAOUH.", mediaType: "video", mediaSrc: "/video.mp4" },
      { key: "remerciements", title: "🙌 Remerciements & reconnaissance", desc: "Offrir du plaisir en cadeau, avec discrétion et professionnalisme.", mediaType: "image", mediaSrc: "/apropos.jpeg" },
      { key: "special", title: "✨ Événements spéciaux", desc: "Une expérience unique, authentique, élégante et mémorable.", mediaType: "image", mediaSrc: "/img1.png" },
    ],
    []
  );

  const activeItem = missionItems[activeMissionIndex];

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      // DESKTOP - Effet Freepik
      mm.add("(min-width: 1024px)", () => {
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "+=150%",
            scrub: 1,
            pin: true,
            anticipatePin: 1,
          },
        });

        tl
          // Texte disparaît
          .to(".hero-ui-header", {
            y: -200,
            opacity: 0,
            duration: 0.4,
            ease: "power2.out",
          }, 0)

          // Vidéo s'agrandit en fullscreen (RÉVISÉ)
          .to(".center-video-wrapper", {
            width: "100vw",
            height: "100vh",
            borderRadius: "0px",
            ease: "power1.inOut",
            duration: 1.2,
          }, 0)

          // Images flottantes s'envolent
          .to(".img-float-1", {
            x: -200,
            y: -300,
            opacity: 30,
            rotate: -20,
            duration: 1.5,
          }, 0)
          .to(".img-float-2", {
            x: -300,
            y: 200,
            opacity: 30,
            rotate: 15,
            duration: 1.5,
          }, 0)
          .to(".img-float-3", {
            x: 300,
            y: 50,
            opacity: 30,
            rotate: 20,
            duration: 1.5,
          }, 0);
      });

      // Mobile
      mm.add("(max-width: 1023px)", () => {
        gsap.to(".center-video-wrapper", {
          scale: 1.05,
          scrollTrigger: {
            trigger: heroRef.current,
            start: "top top",
            end: "bottom center",
            scrub: true
          }
        });
      });

      // Missions
      const items = containerRef.current?.querySelectorAll(".mission-item");
      items?.forEach((item, idx) => {
        ScrollTrigger.create({
          trigger: item,
          start: "top 60%",
          end: "bottom 40%",
          onEnter: () => setActiveMissionIndex(idx),
          onEnterBack: () => setActiveMissionIndex(idx),
        });
      });
    },
    { scope: containerRef }
  );

  return (
    <section ref={containerRef} id="acceuil" style={{ background: colors.bgPrimary }}>

      {/* HERO SECTION */}
      <div
        ref={heroRef}
        className="relative w-full min-h-screen overflow-hidden flex flex-col items-center justify-center px-6 py-32"
      >

        {/* Images Flottantes en arrière-plan */}
        <div className="absolute inset-0 w-full h-full pointer-events-none z-0 hidden lg:block">
          <div
            className="img-float-1 absolute top-[20%] left-[10%] w-[280px] h-[190px] rounded-2xl overflow-hidden shadow-2xl transform -rotate-6 will-change-transform"
            style={{ border: `4px solid ${colors.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)'}` }}
          >
            <img src="/img2_hero.jpg" className="w-full h-full object-cover" alt="decoration" />
          </div>
          <div
            className="img-float-2 absolute bottom-[15%] left-[10%] w-[240px] h-[300px] rounded-2xl overflow-hidden shadow-2xl transform rotate-3 will-change-transform"
            style={{ border: `4px solid ${colors.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)'}` }}
          >
            <img src="/img3_hero.jpg" className="w-full h-full object-cover" alt="decoration" />
          </div>
          <div
            className="img-float-3 absolute top-[25%] right-[5%] w-[320px] h-[400px] rounded-2xl overflow-hidden shadow-2xl transform rotate-6 will-change-transform"
            style={{ border: `4px solid ${colors.isDark ? 'rgba(255,255,255,0.1)' : 'rgba(15,23,42,0.1)'}` }}
          >
            <img src="/img_hero.jpeg" className="w-full h-full object-cover" alt="decoration" />
          </div>
        </div>

        {/* Contenu Principal - z-10 pour être au-dessus des images */}
        <div className="relative z-10 flex flex-col items-center w-full max-w-6xl">

          {/* Header Texte */}
          <div className="hero-ui-header flex flex-col items-center gap-6 text-center max-w-4xl mb-12">


            {/* Titre */}
            <h1 className="text-5xl lg:text-7xl font-normal leading-tight tracking-tight"
              style={{ fontFamily: "Playfair Display, serif", color: colors.textPrimary }}>
              Service Cordial
            </h1>

            {/* Sous-titre */}
            <p className="mb-2 text-base lg:text-xl opacity-60 max-w-2xl" style={{ color: colors.textPrimary }}>
              Offrez plus qu'un cadeau, offrez une surprise. Mariages, anniversaires...
              nous mettons en scène vos émotions avec élégance.
            </p>

            {/* CTA avec couleur jaune d'accentuation */}
            <Link
              to="/contact"
              className="group flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-bold transition-all hover:scale-105 shadow-lg"
              style={{
                backgroundColor: colors.accent,
                color: colors.isDark ? "#0F172A" : "#0B1220"
              }}
            >
              Préparer une surprise
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="-49 141 512 512" width="16" height="16" fill="currentColor" className="transition-transform duration-300 group-hover:translate-x-1">
                <path d="M-24 422h401.645l-72.822 72.822c-9.763 9.763-9.763 25.592 0 35.355 9.763 9.764 25.593 9.762 35.355 0l115.5-115.5a25 25 0 0 0 0-35.355l-115.5-115.5c-9.763-9.762-25.593-9.763-35.355 0-9.763 9.763-9.763 25.592 0 35.355l72.822 72.822H-24c-13.808 0-25 11.193-25 25S-37.808 422-24 422"></path>
              </svg>
            </Link>
          </div>

          {/* Vidéo Centrale (CORRIGÉE z-index) */}
          <div
            className="center-video-wrapper relative overflow-hidden shadow-2xl mx-auto z-50 
                 w-[95%] h-[50vh] rounded-3xl 
                 lg:w-[80%] lg:h-[60vh] lg:max-w-[1200px] lg:rounded-[24px]"
          >
            <video
              src="/video.mp4"
              className="w-full h-full object-cover"
              autoPlay muted loop playsInline
            />
            <div className="absolute inset-0 bg-black/10"></div>
          </div>

        </div>
      </div>

     {/* SECTION MISSION */}
      <div id="nos-offres" className="mission-section max-w-6xl mx-auto px-6 py-24">
        <div className="grid md:grid-cols-2 gap-16">
          
          <div className="mission-content space-y-8">
            <div>
              <p className="text-sm uppercase tracking-wider mb-3 font-bold" style={{ color: colors.accent }}>
                Notre mission
              </p>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 leading-tight" 
                style={{ fontFamily: "Playfair Display, serif", color: colors.textPrimary }}>
                Transformez chaque instant en souvenir
              </h2>
              <p className="text-base leading-relaxed" style={{ color: colors.textSecondary }}>
                Nous créons des moments mémorables grâce à des surprises personnalisées et pensées avec cœur.
              </p>
            </div>

            <div className="space-y-3">
              {missionItems.map((item, idx) => (
                <div 
                  key={item.key} 
                  className="mission-item p-5 rounded-xl cursor-pointer transition-all hover:scale-[1.02]"
                  style={{
                    backgroundColor: idx === activeMissionIndex
                      ? `${colors.accent}20`
                      : colors.isDark
                        ? "rgba(255,255,255,0.03)"
                        : "rgba(15,23,42,0.04)",
                    border: `2px solid ${idx === activeMissionIndex ? colors.accent : colors.isDark ? "rgba(255,255,255,0.1)" : "rgba(15,23,42,0.08)"}`,
                  }}
                  onMouseEnter={() => setActiveMissionIndex(idx)}
                >
                  <p className="font-bold mb-2 text-base" style={{ color: colors.textPrimary }}>
                    {item.title}
                  </p>
                  <p className="text-sm leading-relaxed" style={{ color: colors.textSecondary }}>
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="mission-content pt-10 md:pt-0">
            <div className="sticky top-24 space-y-8">
              
              {/* Card principale avec item actif */}
              <div 
                className="p-8 md:p-10 rounded-3xl backdrop-blur-sm transition-all duration-500"
                style={{
                  background: `linear-gradient(135deg, ${colors.accent}15, ${colors.accent}05)`,
                  border: `2px solid ${colors.accent}50`,
                  boxShadow: '0 20px 60px rgba(0,0,0,0.2)'
                }}
              >
                <div className="space-y-6">
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-12 h-12 rounded-full flex items-center justify-center text-2xl"
                      style={{ backgroundColor: `${colors.accent}30` }}
                    >
                      {activeItem.title.split(' ')[0]}
                    </div>
                    <h3 
                      className="text-2xl md:text-3xl font-bold"
                      style={{ 
                        fontFamily: "Playfair Display, serif", 
                        color: colors.textPrimary 
                      }}
                    >
                      {activeItem.title.replace(/^[^ ]+ /, '')}
                    </h3>
                  </div>
                  
                  <p 
                    className="text-lg leading-relaxed"
                    style={{ color: colors.textSecondary }}
                  >
                    {activeItem.desc}
                  </p>

                  <div className="pt-4 flex items-center gap-3">
                    <div 
                      className="h-1 w-20 rounded-full"
                      style={{ backgroundColor: colors.accent }}
                    />
                    <span 
                      className="text-xs uppercase tracking-wider font-bold"
                      style={{ color: colors.accent }}
                    >
                      Service Premium
                    </span>
                  </div>
                </div>
              </div>

              {/* Stats ou features */}
              <div className="grid grid-cols-2 gap-4">
                <div 
                  className="p-6 rounded-2xl text-center"
                  style={{
                    backgroundColor: `${colors.accent}10`,
                    border: `1px solid ${colors.accent}30`
                  }}
                >
                  <p 
                    className="text-3xl font-bold mb-1"
                    style={{ color: colors.accent }}
                  >
                    100%
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: colors.textSecondary }}
                  >
                    Personnalisé
                  </p>
                </div>
                
                <div 
                  className="p-6 rounded-2xl text-center"
                  style={{
                    backgroundColor: `${colors.accent}10`,
                    border: `1px solid ${colors.accent}30`
                  }}
                >
                  <p 
                    className="text-3xl font-bold mb-1"
                    style={{ color: colors.accent }}
                  >
                    24/7
                  </p>
                  <p 
                    className="text-sm"
                    style={{ color: colors.textSecondary }}
                  >
                    À l'écoute
                  </p>
                </div>
              </div>

              {/* CTA secondaire */}
              <Link
                to="/contact"
                className="block w-full text-center px-6 py-4 rounded-full font-semibold transition-all hover:scale-105"
                style={{
                  backgroundColor: colors.accent,
                  color: colors.isDark ? "#0F172A" : "#0B1220",
                  boxShadow: '0 10px 30px rgba(255, 193, 7, 0.3)'
                }}
              >
                Réserver cette prestation
              </Link>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
