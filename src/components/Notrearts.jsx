import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// Simuler le contexte de thème pour l'artifact
const useThemeColors = () => ({
  bgPrimary: '#0F172A',
  textPrimary: '#FFFFFF',
  textSecondary: '#94A3B8',
  accent: '#FCD34D',
  isDark: true
});

export default function NotreArt() {
  const colors = useThemeColors();
  const galleryRef = useRef(null);
  const sectionRef = useRef(null);

  const galleryImages = [
    { src: '/img2.jpg', size: 'small'},
    { src: '/img5.jpg', size: 'medium'},
    { src: '/img_art2.jpg', size: 'large', alt: 'Composition florale' },
    { src: '/img_art.jpg', size: 'small', alt: 'Décoration de table' },
    { src: '/img_art3.jpg', size: 'medium', alt: 'Arrangement créatif' },
    { src: '/img_art4.jpeg', size: 'small', alt: 'Détails raffinés' },
  ];

  useGSAP(() => {
    const q = gsap.utils.selector(galleryRef);
    const items = q(".gallery-item");

    // Animation d'entrée du titre et description
    const titleTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: sectionRef.current,
        start: "top 80%",
        once: true,
      }
    });

    titleTimeline
      .from('.art-title', {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      })
      .from('.art-bar', {
        scaleX: 0,
        transformOrigin: "center",
        duration: 0.6,
        ease: "power2.out"
      }, "-=0.4")
      .from('.art-description', {
        y: 30,
        opacity: 0,
        duration: 0.7,
        ease: "power2.out"
      }, "-=0.3");

    // Animation d'apparition des images avec effet stagger élégant
    gsap.from(items, {
      opacity: 0,
      y: 60,
      scale: 0.85,
      rotation: -5,
      duration: 1.2,
      ease: "power3.out",
      stagger: {
        amount: 0.8,
        from: "start",
        ease: "power1.inOut"
      },
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 75%",
        once: true,
      },
    });

    // Effet parallax subtil sur desktop
    const mm = gsap.matchMedia();
    
    mm.add("(min-width: 768px)", () => {
      items.forEach((item, index) => {
        const speed = index % 2 === 0 ? 30 : -30;
        
        gsap.to(item, {
          y: speed,
          ease: "none",
          scrollTrigger: {
            trigger: item,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.5,
          },
        });
      });
    });

    return () => mm.revert();
  }, { scope: sectionRef });

  return (
    <section
      ref={sectionRef}
      id="notre-art"
      className="py-20 px-6 overflow-hidden"
      style={{ background: colors.bgPrimary }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <h2
          className="art-title text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ fontFamily: 'Playfair Display, serif', color: colors.textPrimary }}
        >
          Notre Art
        </h2>
        <div
          className="art-bar w-24 h-1 mx-auto mb-8"
          style={{ backgroundColor: colors.accent }}
        ></div>

        {/* Description */}
        <p
          className="art-description text-sm md:text-base font-[Poppins] text-center max-w-3xl mx-auto mb-16 leading-relaxed"
          style={{ color: colors.textSecondary }}
        >
          Découvrez notre savoir-faire à travers une sélection de nos créations les plus emblématiques. 
          Chaque composition raconte une histoire unique, mêlant élégance, créativité et attention aux détails.
        </p>

        {/* Galerie avec Masonry Layout */}
        <div
          ref={galleryRef}
          className="grid gap-4 md:gap-6 max-w-6xl mx-auto"
          style={{
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gridAutoFlow: 'dense'
          }}
        >
          {galleryImages.map((img, idx) => {
            // Classes de taille pour un effet masonry
            const sizeClasses = {
              small: 'row-span-1',
              medium: 'row-span-2 md:col-span-1',
              large: 'row-span-2 md:row-span-3 md:col-span-2'
            };

            return (
              <div
                key={idx}
                className={`gallery-item group relative rounded-xl overflow-hidden shadow-lg cursor-pointer ${sizeClasses[img.size]}`}
                style={{
                  background: colors.isDark ? '#1E293B' : '#F1F5F9',
                  minHeight: img.size === 'small' ? '200px' : img.size === 'medium' ? '300px' : '400px'
                }}
              >
                {/* Image avec overlay au hover */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full h-full object-cover transition-all duration-700 ease-out group-hover:scale-110 group-hover:rotate-2"
                    loading="lazy"
                  />
                  
                  {/* Overlay avec effet de lumière */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    style={{
                      background: `linear-gradient(135deg, ${colors.accent}20 0%, transparent 60%)`
                    }}
                  />
                  
                  {/* Bordure lumineuse au hover */}
                  <div 
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      boxShadow: `inset 0 0 40px ${colors.accent}40`
                    }}
                  />
                </div>

                {/* Badge décoratif optionnel */}
                {idx === 0 && (
                  <div 
                    className="absolute top-4 right-4 px-3 py-1 rounded-full text-xs font-semibold font-[Poppins] backdrop-blur-sm"
                    style={{
                      backgroundColor: `${colors.accent}90`,
                      color: colors.isDark ? '#0F172A' : '#FFFFFF'
                    }}
                  >
                    Nouveau
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Bouton Voir Plus (optionnel) */}
        <div className="text-center mt-16">
          <button
            className="group relative px-8 py-4 rounded-full font-[Playfair Display] font-bold text-lg overflow-hidden transition-all duration-300 hover:scale-105"
            style={{
              backgroundColor: 'transparent',
              border: `2px solid ${colors.accent}`,
              color: colors.accent
            }}
          >
            <span className="relative z-10 transition-colors duration-300 group-hover:text-slate-900">
              Voir toute la galerie
            </span>
            
            {/* Effet de remplissage au hover */}
            <div 
              className="absolute inset-0 scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left"
              style={{ backgroundColor: colors.accent }}
            />
          </button>
        </div>
      </div>
    </section>
  );
}