import React, { useRef } from "react";
import { Link } from 'react-router-dom';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useGSAP } from "@gsap/react";
import { useThemeColors } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function Footer() {
  const colors = useThemeColors();
  const facebookRef = useRef(null);
  const subscribeRef = useRef(null);
  const footerRef = useRef(null);

  useGSAP(() => {
    // Animation du bloc Facebook
    gsap.from(facebookRef.current, {
      y: 40,
      opacity: 0,
      duration: 0.9,
      ease: "power2.out",
      scrollTrigger: {
        trigger: facebookRef.current,
        start: "top 85%",
        once: true,
      },
    });

    // Pulse doux sur le bouton Abonnez-vous
    gsap.to(subscribeRef.current, {
      scale: 1.03,
      duration: 1.8,
      ease: "power1.inOut",
      repeat: -1,
      yoyo: true,
    });

    // Stagger des colonnes
    gsap.from(footerRef.current.querySelectorAll('.footer-column'), {
      y: 20,
      opacity: 0,
      duration: 0.8,
      ease: "power2.out",
      stagger: 0.12,
      scrollTrigger: {
        trigger: footerRef.current,
        start: "top 85%",
        once: true,
      },
    });
  }, []);

  return (
    <section className="py-16 px-6" style={{ background: colors.bgPrimary }}>
      <div className="max-w-7xl mx-auto">

        {/* Section Abonnement Facebook */}
        <div
          ref={facebookRef}
          className="p-8 md:p-12 rounded-3xl mb-16 text-center"
          style={{ backgroundColor: colors.bgSecondary }}
        >
          <h3
            className="text-2xl md:text-3xl font-bold mb-4"
            style={{ fontFamily: 'Playfair Display, serif', color: colors.textPrimary }}
          >
            Suivez-nous sur Facebook
          </h3>
          <p
            className="text-sm md:text-base mb-6"
            style={{ color: colors.textSecondary }}
          >
            Restez connecté avec nous et découvrez nos dernières œuvres et projets !
          </p>
          <a
            ref={subscribeRef}
            href="https://www.facebook.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-3 rounded-full font-bold transition-colors"
            style={{
              backgroundColor: colors.accent,
              color: colors.isDark ? '#0F172A' : '#FFFFFF'
            }}
          >
            Abonnez-vous
          </a>
        </div>

        {/* Footer */}
        <footer
          ref={footerRef}
          className="p-8 md:p-12 rounded-3xl"
          style={{ backgroundColor: colors.bgCard }}
        >
          <div className="grid md:grid-cols-3 gap-8">

            {/* Logo et description */}
            <div className="footer-column">
              <h2
                className="text-xl md:text-2xl font-bold mb-4"
                style={{ fontFamily: 'Playfair Display, serif', color: colors.textPrimary }}
              >
                Notre Art
              </h2>
              <p
                className="font-[Poppins] text-sm md:text-base leading-relaxed"
                style={{ color: colors.textSecondary }}
              >
                Notre Art vous offre une galerie unique et des services créatifs pour sublimer vos projets et événements.
              </p>
            </div>

            {/* Liens utiles */}
            <div className="footer-column">
              <h4 className="font-[Poppins] font-semibold mb-4" style={{ color: colors.textPrimary }}>Liens utiles</h4>
              <ul className="text-sm space-y-2">
                <li><Link to="/#nos-offres" className="hover:text-yellow-400 transition-colors" style={{ color: colors.textMuted }}>Nos Offres</Link></li>
                <li><Link to="/#notre-art" className="hover:text-yellow-400 transition-colors" style={{ color: colors.textMuted }}>Notre Art</Link></li>
                <li><Link to="/contact" className="hover:text-yellow-400 transition-colors" style={{ color: colors.textMuted }}>Contact</Link></li>
              </ul>
            </div>

            {/* Contact */}
            <div className="footer-column">
              <h4 className="font-[Poppins] font-semibold mb-4" style={{ color: colors.textPrimary }}>Contact</h4>
              <p className="text-sm mb-2" style={{ color: colors.textMuted }}>Email: servicecordiale@gmail.com</p>
              <p className="text-sm mb-2" style={{ color: colors.textMuted }}>Téléphone: +1 514 574 3785 / +237 686 35 35 24</p>
            </div>
          </div>

          <div className="mt-12 text-center text-sm font-[Poppins]" style={{ color: colors.textMuted }}>
            &copy; SERVICE CORDIAL - Notre Art notre service créatif.
          </div>
        </footer>

      </div>
    </section>
  );
}
