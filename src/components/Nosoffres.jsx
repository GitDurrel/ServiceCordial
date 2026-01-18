import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { Link } from 'react-router-dom';
import { useThemeColors } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Nosoffres = () => {
    const colors = useThemeColors();
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);
    const lightBeamRef = useRef(null);

    const allServices = [
        {
            id: 1,
            name: "Pack amour",
            title: "Exprimez vos sentiments avec élégance",
            description: "Un pack pensé pour surprendre, émouvoir et créer des moments romantiques inoubliables.",
            image: "/bouquet-pack-amour-complet.png"
        },
        {
            id: 2,
            name: "Pack anniversaire",
            title: "Célébrez chaque année avec style",
            description: "Tout le nécessaire pour organiser un anniversaire mémorable sans stress ni improvisation.",
            image: "/pack-anniv-avec-bouquet.png"
        },
        {
            id: 3,
            name: "Pack bapteme",
            title: "Un moment sacré, parfaitement organisé",
            description: "Une solution complète pour célébrer le baptême dans la sérénité et l’élégance.",
            image: "/pack-bapteme-revisité.png"
        },
        {
            id: 4,
            name: "Pack composé",
            title: "Créez un événement à votre image",
            description: "Composez librement votre pack selon vos besoins et le style de votre événement.Bouquet d'argent, bouquet de fleur, ...",
            image: "/pack-composé-revisité.jpg"
        }

    ];

    const totalServices = allServices.length;

    // Animation d'entrée de section
    useGSAP(() => {
        const q = gsap.utils.selector(sectionRef);
        gsap.timeline({
            defaults: { ease: "power2.out", duration: 0.8 },
            scrollTrigger: {
                trigger: sectionRef.current,
                start: "top 80%",
                once: true,
            }
        })
            .from(q('.offers-title'), { y: 40, opacity: 0 })
            .from(q('.offers-bar'), { scaleX: 0, transformOrigin: "center" }, "-=0.4")
            .from(q('.light-beam'), { opacity: 0, scale: 0.5 }, "-=0.2")
            .from(q('.offers-nav button'), { y: 20, opacity: 0, stagger: 0.1 }, "-=0.3");
    }, []);

    // Animation des slides - SANS toucher au faisceau lumineux
    useGSAP(() => {
        const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power2.out" } });

        // Animation de l'image principale
        tl.to('.main-image-gsap', { scale: 0.9, opacity: 0, duration: 0.3 })
            .set('.main-image-gsap', { scale: 1.1, opacity: 0 })
            .to('.main-image-gsap', { scale: 1, opacity: 1, duration: 0.4 });

        // Animation des images latérales
        tl.to(['.side-image-prev', '.side-image-next'], {
            opacity: 0,
            duration: 0.2
        }, 0)
            .set(['.side-image-prev', '.side-image-next'], { opacity: 0 })
            .to(['.side-image-prev', '.side-image-next'], {
                opacity: 0.4,
                duration: 0.3
            }, "-=0.2");

        // Animation du texte
        tl.to('.title-gsap', { y: -10, opacity: 0, duration: 0.2 }, 0)
            .set('.title-gsap', { y: 20, opacity: 0 })
            .to('.title-gsap', { y: 0, opacity: 1 }, "-=0.3")
            .to('.details-title-gsap', { y: -10, opacity: 0, duration: 0.2 }, 0)
            .set('.details-title-gsap', { y: 20, opacity: 0 })
            .to('.details-title-gsap', { y: 0, opacity: 1 }, "-=0.3")
            .to('.details-description-gsap', { y: -10, opacity: 0, duration: 0.2 }, 0)
            .set('.details-description-gsap', { y: 20, opacity: 0 })
            .to('.details-description-gsap', { y: 0, opacity: 1 }, "-=0.3");

        return () => tl.kill();
    }, [currentIndex]);

    const goToSlide = (index) => {
        setCurrentIndex((index + totalServices) % totalServices);
    };

    const getServiceAt = (indexOffset) => allServices[(currentIndex + indexOffset + totalServices) % totalServices];

    const currentService = getServiceAt(0);
    const prevService = getServiceAt(-1);
    const nextService = getServiceAt(1);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex(prev => (prev + 1) % totalServices);
        }, 10000);
        return () => clearInterval(interval);
    }, [totalServices]);

    return (
        <section ref={sectionRef} id="nos-offres" className="relative py-20 px-6 overflow-hidden" style={{ background: colors.bgPrimary }}>
            {/* Titre */}
            <div className="text-center mb-8 relative">
                <h2 className="offers-title text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: colors.textPrimary }}>
                    Nos Offres
                </h2>
                <div className="offers-bar w-24 h-1 mx-auto relative" style={{ backgroundColor: colors.accent, boxShadow: `0 0 20px ${colors.accent}` }}>
                    {/* Point lumineux source */}
                    <div
                        className="absolute left-1/2 top-0 -translate-x-1/2 w-3 h-2 rounded-full pointer-events-none"
                        style={{
                            backgroundColor: colors.accent,
                            boxShadow: `0 0 30px 8px ${colors.accent}`,
                            zIndex: 10
                        }}
                    />
                </div>

                {/* Cône de lumière - Version SVG qui s'arrête au panier */}
                <div
                    ref={lightBeamRef}
                    className="light-beam absolute left-1/2 -translate-x-1/2 pointer-events-none"
                    style={{
                        top: '100%',
                        marginTop: '-4px',
                        zIndex: 3,
                        height: '170px', // Hauteur fixe qui s'arrête au niveau du panier
                        overflow: 'hidden' // Coupe net le faisceau
                    }}
                >
                    <svg width="400" height="280" viewBox="0 0 400 280" preserveAspectRatio="xMidYMin meet">
                        <defs>
                            {/* Gradient pour l'effet de lumière qui s'intensifie vers le bas */}
                            <linearGradient id="lightGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                                <stop offset="0%" style={{ stopColor: colors.accent, stopOpacity: 0.4 }} />
                                <stop offset="70%" style={{ stopColor: colors.accent, stopOpacity: 0.5 }} />
                                <stop offset="100%" style={{ stopColor: colors.accent, stopOpacity: 0.6 }} />
                            </linearGradient>

                            {/* Filtre pour le flou */}
                            <filter id="lightBlur">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="20" />
                            </filter>
                        </defs>

                        {/* Cône principal de lumière */}
                        <path
                            d="M 200 0 L 80 280 L 320 280 Z"
                            fill="url(#lightGradient)"
                            filter="url(#lightBlur)"
                        />

                        {/* Cône central plus intense */}
                        <path
                            d="M 200 0 L 140 280 L 260 280 Z"
                            fill="url(#lightGradient)"
                            filter="url(#lightBlur)"
                            opacity="0.7"
                        />

                        {/* Rayon central */}
                        <line
                            x1="300"
                            y1="0"
                            x2="200"
                            y2="280"
                            stroke={colors.accent}
                            strokeWidth="2"
                            opacity="0.5"
                            filter="url(#lightBlur)"
                        />
                    </svg>
                </div>
            </div>

            {/* Navigation - Liste des packs avec opacité */}
            <nav className="offers-nav flex flex-wrap justify-center gap-6 mb-16 relative z-10">
                {allServices.map((service, index) => (
                    <button
                        key={service.id}
                        className={`pb-2 font-[Poppins] text-sm md:text-base transition-all duration-500 ${index === currentIndex
                                ? 'font-bold opacity-100 scale-110'
                                : 'opacity-50 hover:opacity-75'
                            }`}
                        style={{ color: colors.textPrimary }}
                        onClick={() => goToSlide(index)}
                    >
                        {service.name}
                    </button>
                ))}
            </nav>

            {/* Contenu Carousel */}
            <div className="max-w-7xl mx-auto relative" style={{ minHeight: '500px' }}>
                {/* Zone centrale éclairée avec les 3 images */}
                <div className="relative h-96 flex items-center justify-center mb-16">
                    {/* Image précédente (gauche) */}
                    <div className="side-image-prev absolute left-0 md:left-12 z-0 transform -rotate-6 transition-all duration-500">
                        <img
                            src={prevService.image}
                            alt={prevService.name}
                            className="w-44 h-32 md:w-64 md:h-52 object-cover rounded-lg shadow-xl"
                            style={{ opacity: 0.4, filter: 'brightness(0.7)' }}
                        />
                    </div>

                    {/* Image principale (centre) - sous le faisceau lumineux */}
                    <div className="main-image-container relative z-20 flex justify-center items-center">
                        <div className="absolute inset-0 rounded-2xl"
                            style={{
                                background: `radial-gradient(circle, ${colors.accent}15 0%, transparent 80%)`,
                                filter: 'blur(40px)',
                                transform: 'scale(1.5)'
                            }}
                        />
                        <img
                            src={currentService.image}
                            alt={currentService.name}
                            className="main-image-gsap relative w-64 h-52 md:w-96 md:h-80 object-cover rounded-2xl shadow-2xl"
                            style={{
                                boxShadow: `0 20px 60px -15px ${colors.accent}60, 0 0 40px -10px ${colors.accent}40`
                            }}
                        />
                    </div>

                    {/* Image suivante (droite) */}
                    <div className="side-image-next absolute right-0 md:right-12 z-0 transform rotate-6 transition-all duration-500">
                        <img
                            src={nextService.image}
                            alt={nextService.name}
                            className="w-44 h-32 md:w-64 md:h-52 object-cover rounded-lg shadow-xl"
                            style={{ opacity: 0.4, filter: 'brightness(0.7)' }}
                        />
                    </div>
                </div>

                {/* Flèches de navigation */}
                <button
                    className="absolute left-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: `${colors.accent}20` }}
                    onClick={() => goToSlide(currentIndex - 1)}
                    aria-label="Panier précédent"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: colors.accent }}>
                        <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                    </svg>
                </button>

                <button
                    className="absolute right-0 top-1/2 -translate-y-1/2 z-30 p-3 rounded-full transition-all hover:scale-110"
                    style={{ backgroundColor: `${colors.accent}20` }}
                    onClick={() => goToSlide(currentIndex + 1)}
                    aria-label="Panier suivant"
                >
                    <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: colors.accent }}>
                        <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                    </svg>
                </button>

                {/* Section inférieure : Bouton Commander & Détails */}
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-8 mt-8">
                    {/* Bouton Commander */}
                    <div className="text-center md:text-left">
                        <Link
                            to="/contact"
                            className="inline-flex items-center justify-center rounded-full font-[Playfair Display] font-bold transition-all shadow-lg px-8 py-4 hover:scale-105 hover:shadow-xl"
                            style={{
                                backgroundColor: colors.accent,
                                color: colors.isDark ? '#0F172A' : '#0B1220',
                                boxShadow: `0 4px 20px ${colors.accent}40`
                            }}
                        >
                            Commander
                        </Link>
                    </div>

                    {/* Détails du pack */}
                    <div className="details max-w-md text-center md:text-left">
                        <p className="title-gsap text-2xl md:text-3xl font-[Poppins] font-bold mb-3" style={{ color: colors.accent }}>
                            {currentService.name}
                        </p>

                        <h3 className="details-title-gsap text-lg font-semibold font-[Poppins] mb-2" style={{ color: colors.textPrimary }}>
                            {currentService.title}
                        </h3>

                        <p className="details-description-gsap text-sm leading-relaxed font-[Poppins]" style={{ color: colors.textSecondary }}>
                            {currentService.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Nosoffres;
