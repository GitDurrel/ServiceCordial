import React, { useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/all';
import { useGSAP } from '@gsap/react';
import { useThemeColors } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function NotreArt() {
  const colors = useThemeColors();
  const galleryRef = useRef(null);

  const galleryImages = [
    { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=300&fit=crop', size: 'small' },
    { src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=400&fit=crop', size: 'medium' },
    { src: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400&h=800&fit=crop', size: 'large' },
    { src: 'https://images.unsplash.com/photo-1607083206968-13611e3d76db?w=400&h=300&fit=crop', size: 'small' },
    { src: 'https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=300&fit=crop', size: 'medium' },
  ];

  useGSAP((context) => {
    const q = context.selector;
    const mm = gsap.matchMedia();

    const items = q(".gallery-item");

    gsap.from(items, {
      opacity: 0,
      y: 40,
      scale: 0.9,
      duration: 1,
      ease: "power3.out",
      stagger: 0.15,
      scrollTrigger: {
        trigger: galleryRef.current,
        start: "top 80%",
        once: true,
      },
    });

    mm.add("(min-width: 768px)", () => {
      const parallax = gsap.to(galleryRef.current, {
        y: -20,
        ease: "none",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.3,
        },
      });

      return () => parallax.scrollTrigger && parallax.scrollTrigger.kill();
    });

    return () => mm.revert();
  }, { scope: galleryRef });

  return (
    <section
      id="notre-art"
      className="py-20 px-6"
      style={{ background: colors.bgPrimary }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Titre */}
        <h2
          className="text-4xl md:text-5xl font-bold text-center mb-4"
          style={{ fontFamily: 'Playfair Display, serif', color: colors.textPrimary }}
        >
          Notre Art
        </h2>
        <div
          className="w-24 h-1 mx-auto mb-8"
          style={{ backgroundColor: colors.accent }}
        ></div>

        {/* Description */}
        <p
          className="text-sm font-[Poppins] font-semibold text-center max-w-4xl mx-auto mb-12 leading-relaxed"
          style={{ color: colors.textSecondary }}
        >
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. In suscipit,
          corporis, sit exercitationem molestiae reiciendis repellendus similique
          accusantium voluptatibus modi maiores corporis.
        </p>

        {/* Galerie */}
        <div
          ref={galleryRef}
          className="grid gap-4 max-w-5xl mx-auto grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        >
          {galleryImages.map((img, idx) => {
            const sizeClass = img.size === 'large' ? 'row-span-2' : '';
            return (
              <div
                key={idx}
                className={`gallery-item rounded-lg overflow-hidden shadow-lg cursor-pointer transform transition hover:scale-105 hover:-rotate-1 ${sizeClass}`}
              >
                <img
                  src={img.src}
                  alt={`Gallery ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
