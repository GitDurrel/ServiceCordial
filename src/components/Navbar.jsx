import React, { useState, useRef } from "react";
import { useTheme, useThemeColors } from './ThemeContext';
import { Sun, Moon, Menu, X } from 'lucide-react';
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
  const { isDark, toggleTheme } = useTheme();
  const colors = useThemeColors();
  const [menuOpen, setMenuOpen] = useState(false);
  const navRef = useRef(null);

  useGSAP(() => {
    gsap.fromTo(
      navRef.current,
      { y: -40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" }
    );

    gsap.fromTo(
      navRef.current,
      {
        backgroundColor: "transparent",
        backdropFilter: "blur(0px)",
      },
      {
        backgroundColor: colors.navBg,
        backdropFilter: "blur(10px)",
        duration: 0.6,
        ease: "power1.inOut",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top -50",
          end: "top -200",
          scrub: true,
        },
      }
    );
  }, [colors.navBg]);

  return (
    <nav
      ref={navRef}
      className="shadow-lg sticky top-0 z-50 transition-all duration-300"
      style={{ color: colors.navText }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* LOGO */}
          <div className="text-lg font-semibold" style={{ color: colors.navText }}>
            <img src="/logo.png" alt="logo" className="h-16 w-auto" />
          </div>

          {/* MENU WEB */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#acceuil"
              className="text-gray-100 font-[Playfair Display] font-bold relative transition duration-300 hover:scale-105 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              style={{ color: colors.navText }}
            >
              Acceuil
            </a>
            <a
              href="#nos-offres"
              className="text-gray-100 font-[Playfair Display] font-bold relative transition duration-300 hover:scale-105 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              style={{ color: colors.navText }}
            >
              Nos offres
            </a>
            <a
              href="#contact"
              className="text-gray-100 font-[Playfair Display] font-bold relative transition duration-300 hover:scale-105 after:content-[''] after:block after:w-0 after:h-0.5 after:bg-yellow-400 after:transition-all after:duration-300 hover:after:w-full"
              style={{ color: colors.navText }}
            >
              Contact
            </a>
          </div>

           <button
            onClick={toggleTheme}
            className="p-2 rounded-full transition-all duration-300 hover:scale-110 mr-4"
            style={{
              backgroundColor: isDark ? '#FFC107' : '#1E293B',
              color: isDark ? '#0F172A' : '#FFC107'
            }}
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>

          {/* BOUTON MOBILE */}
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Ouvrir le menu"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* MENU MOBILE */}
        {menuOpen && (
          <div className="md:hidden pb-4">
            <a
              href="#acceuil"
              className="text-gray-100 block py-2 font-[Playfair Display] font-bold transition duration-300 hover:scale-105"
              style={{ color: colors.navText }}
            >
              Acceuil
            </a>
            <a
              href="#nos-offres"
              className="text-gray-100 block py-2 font-[Playfair Display] font-bold transition duration-300 hover:scale-105"
              style={{ color: colors.navText }}
            >
              Nos offres
            </a>
            <a
              href="#contact"
              className="text-gray-100 block py-2 font-[Playfair Display] font-bold transition duration-300 hover:scale-105"
              style={{ color: colors.navText }}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}
