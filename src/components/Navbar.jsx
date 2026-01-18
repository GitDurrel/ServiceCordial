import React, { useState, useRef, useEffect } from "react";
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
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const hideTimeoutRef = useRef(null);

  // Gestion du scroll pour cacher/afficher la navbar
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const currentScrollY = window.scrollY;

          // Afficher la navbar si on scroll vers le haut
          if (currentScrollY < lastScrollY) {
            setIsVisible(true);
            
            // Reset le timer de disparition après 5s
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
            
            hideTimeoutRef.current = setTimeout(() => {
              if (window.scrollY > 100) {
                setIsVisible(false);
              }
            }, 5000);
          } 
          // Cacher la navbar si on scroll vers le bas (après 100px)
          else if (currentScrollY > lastScrollY && currentScrollY > 100) {
            setIsVisible(false);
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
          }

          // Toujours afficher si on est en haut de la page
          if (currentScrollY < 50) {
            setIsVisible(true);
            if (hideTimeoutRef.current) {
              clearTimeout(hideTimeoutRef.current);
            }
          }

          setLastScrollY(currentScrollY);
          ticking = false;
        });

        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
      if (hideTimeoutRef.current) {
        clearTimeout(hideTimeoutRef.current);
      }
    };
  }, [lastScrollY]);

  useGSAP(() => {
    // Animation d'entrée initiale
    gsap.fromTo(
      navRef.current,
      { y: -100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out", delay: 0.2 }
    );

    // Animation du background au scroll
    gsap.fromTo(
      navRef.current,
      {
        backgroundColor: "rgba(15, 23, 42, 0)",
        backdropFilter: "blur(0px)",
      },
      {
        backgroundColor: colors.navBg,
        backdropFilter: "blur(20px)",
        duration: 0.3,
        ease: "power2.inOut",
        scrollTrigger: {
          trigger: document.documentElement,
          start: "top -50",
          end: "top -100",
          scrub: 1,
        },
      }
    );
  }, [colors.navBg]);

  // Animation de show/hide
  useEffect(() => {
    if (navRef.current) {
      gsap.to(navRef.current, {
        y: isVisible ? 0 : -100,
        opacity: isVisible ? 1 : 0,
        duration: 0.4,
        ease: "power2.inOut"
      });
    }
  }, [isVisible]);

  return (
    <nav
      ref={navRef}
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{ 
        color: colors.navText,
        boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
      }}
      onMouseEnter={() => {
        if (window.scrollY > 100) {
          setIsVisible(true);
          if (hideTimeoutRef.current) {
            clearTimeout(hideTimeoutRef.current);
          }
        }
      }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">

          {/* LOGO */}
          <div className="text-lg font-semibold flex items-center">
            <img src="/logo.png" alt="logo" className="h-16 w-auto" />
          </div>

          {/* MENU DESKTOP */}
          <div className="hidden md:flex space-x-8 items-center">
            <a
              href="#acceuil"
              className="text-gray-100 font-[Playfair Display] font-bold relative transition-all duration-300 hover:scale-110 after:content-[''] after:block after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              style={{ 
                color: colors.navText,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                gsap.to(e.currentTarget.querySelector('::after'), {
                  width: '100%',
                  backgroundColor: colors.accent
                });
              }}
            >
              Acceuil
            </a>
            <a
              href="#nos-offres"
              className="text-gray-100 font-[Playfair Display] font-bold relative transition-all duration-300 hover:scale-110 after:content-[''] after:block after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              style={{ 
                color: colors.navText,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Nos offres
            </a>
            <a
              href="#contact"
              className="text-gray-100 font-[Playfair Display] font-bold relative transition-all duration-300 hover:scale-110 after:content-[''] after:block after:w-0 after:h-0.5 after:transition-all after:duration-300 hover:after:w-full"
              style={{ 
                color: colors.navText,
                textShadow: '0 2px 4px rgba(0,0,0,0.1)'
              }}
            >
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={toggleTheme}
              className="p-2.5 rounded-full transition-all duration-300 hover:scale-110 hover:rotate-12"
              style={{
                backgroundColor: isDark ? '#FFC107' : '#1E293B',
                color: isDark ? '#0F172A' : '#FFC107',
                boxShadow: isDark 
                  ? '0 4px 15px rgba(255, 193, 7, 0.4)' 
                  : '0 4px 15px rgba(30, 41, 59, 0.4)'
              }}
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {/* BOUTON MOBILE */}
            <button
              className="md:hidden text-gray-300 p-2"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Ouvrir le menu"
              style={{ color: colors.navText }}
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* MENU MOBILE */}
        {menuOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <a
              href="#acceuil"
              className="text-gray-100 block py-3 px-4 rounded-lg font-[Playfair Display] font-bold transition-all duration-300 hover:scale-105"
              style={{ 
                color: colors.navText,
                backgroundColor: 'rgba(255, 193, 7, 0.1)'
              }}
              onClick={() => setMenuOpen(false)}
            >
              Acceuil
            </a>
            <a
              href="#nos-offres"
              className="text-gray-100 block py-3 px-4 rounded-lg font-[Playfair Display] font-bold transition-all duration-300 hover:scale-105"
              style={{ 
                color: colors.navText,
                backgroundColor: 'rgba(255, 193, 7, 0.1)'
              }}
              onClick={() => setMenuOpen(false)}
            >
              Nos offres
            </a>
            <a
              href="#contact"
              className="text-gray-100 block py-3 px-4 rounded-lg font-[Playfair Display] font-bold transition-all duration-300 hover:scale-105"
              style={{ 
                color: colors.navText,
                backgroundColor: 'rgba(255, 193, 7, 0.1)'
              }}
              onClick={() => setMenuOpen(false)}
            >
              Contact
            </a>
          </div>
        )}
      </div>
    </nav>
  );
}