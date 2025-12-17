import gsap from 'gsap';
import { useEffect, useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { ScrollTrigger } from 'gsap/all';
import { useThemeColors } from './ThemeContext';

gsap.registerPlugin(ScrollTrigger);

const Nosoffres = () => {
    const colors = useThemeColors();
    const [currentIndex, setCurrentIndex] = useState(0);
    const sectionRef = useRef(null);

    const allServices = [
        {
            id: 1,
            name: "Pack amour",
            title: "Aspernatur voluptates",
            description: "Voluptatibus culpa? Quidem, in. Aspernatur voluptates sed quae in! Lorem ipsum dolor sit amet consectetur adipisicing elit.",
            image: "/img7.png"
        },
        {
            id: 2,
            name: "Pack anniversaire",
            title: "La solution tout-en-un pour vos événements",
            description: "Service Cordiale simplifie l'organisation d'événements avec une gamme complète de services.",
            image: "/img7.png"
        },
        {
            id: 3,
            name: "Pack bapteme",
            title: "La solution tout-en-un pour vos événements",
            description: "Service Cordiale simplifie l'organisation d'événements avec une gamme complète de services.",
            image: "/img7.png"
        },
        {
            id: 4,
            name: "Pack composé",
            title: "La solution tout-en-un pour vos événements",
            description: "Service Cordiale simplifie l'organisation d'événements avec une gamme complète de services.",
            image: "/img7.png"
        }
    ];

    const totalServices = allServices.length;

    // Animation d'entrée de section
    useGSAP((context) => {
        // Use gsap's selector bound to the section ref so `q` is a function
        // that only queries inside this component's section element.
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
            .from(q('.offers-nav button'), { y: 20, opacity: 0, stagger: 0.1 }, "-=0.2");
    }, []);

    // Animation des slides
    useGSAP((context) => {
        const tl = gsap.timeline({ defaults: { duration: 0.7, ease: "power2.out" } });

        tl.to('.image-gsap', { x: -40, opacity: 0, duration: 0.25 })
            .set('.image-gsap', { x: 40, opacity: 0 })
            .to('.image-gsap', { x: 0, opacity: 1 })
            .to('.title-gsap', { y: -10, opacity: 0, duration: 0.2 }, 0)
            .set('.title-gsap', { y: 20, opacity: 0 })
            .to('.title-gsap', { y: 0, opacity: 1 }, "-=0.1")
            .to('.details-title-gsap', { y: -10, opacity: 0, duration: 0.2 }, 0)
            .set('.details-title-gsap', { y: 20, opacity: 0 })
            .to('.details-title-gsap', { y: 0, opacity: 1 }, "-=0.1")
            .to('.details-description-gsap', { y: -10, opacity: 0, duration: 0.2 }, 0)
            .set('.details-description-gsap', { y: 20, opacity: 0 })
            .to('.details-description-gsap', { y: 0, opacity: 1 }, "-=0.1");

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
            <div className="text-center mb-12">
                <h2 className="offers-title text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'Playfair Display, serif', color: colors.textPrimary }}>
                    Nos Offres
                </h2>
                <div className="offers-bar w-24 h-1 mx-auto mb-8" style={{ backgroundColor: colors.accent }}></div>
            </div>

            {/* Navigation */}
            <nav className="offers-nav flex flex-wrap justify-center gap-8 mb-16">
                {allServices.map((service, index) => (
                    <button
                        key={service.id}
                        className={`pb-2 font-[Poppins] border-b-2 transition-all ${index === currentIndex ? 'text-white border-yellow-400' : 'text-gray-400 border-transparent hover:text-white'}`}
                        onClick={() => goToSlide(index)}
                    >
                        {service.name}
                    </button>
                ))}
            </nav>

            {/* Contenu */}
            <div className="max-w-7xl mx-auto relative">
                <div className="flex items-center justify-between gap-8 font-[Poppins]">
                    {/* Flèche gauche */}
                    <button
                        className="flex flex-col items-start gap-2 hover:text-yellow-400 transition-colors"
                        onClick={() => goToSlide(currentIndex - 1)}
                    >
                        <span className="text-sm md:text-base" style={{ color: colors.textPrimary }}>{prevService.name}</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: colors.accent }}>
                            <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" />
                        </svg>
                    </button>

                    {/* Image */}
                    <div className="cocktail shrink-0 flex justify-center items-center">
                        <img
                            src={currentService.image}
                            alt={currentService.name}
                            className="image-gsap w-80 h-64 md:w-96 md:h-80 object-cover rounded-lg"
                        />
                    </div>

                    {/* Flèche droite */}
                    <button
                        className="flex flex-col items-end gap-2 hover:text-yellow-400 transition-colors"
                        onClick={() => goToSlide(currentIndex + 1)}
                    >
                        <span className="text-sm md:text-base" style={{ color: colors.textPrimary }}>{nextService.name}</span>
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20" style={{ color: colors.accent }}>
                            <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" />
                        </svg>
                    </button>
                </div>

                {/* Bouton Commander */}
                <div className="mt-24 text-center md:text-left md:absolute md:bottom-0 md:left-0">
                    <button className="rounded-full font-[Playfair Display] font-bold transition-all shadow-lg px-6 py-3 hover:scale-105 hover:shadow-xl"
                        style={{
                            backgroundColor: colors.accent,
                            color: colors.isDark ? '#0F172A' : '#FFFFFF'
                        }}
                    >
                        Commander
                    </button>
                </div>

                {/* Détails */}
                <div className="details mt-12 md:mt-0 md:absolute md:right-0 md:bottom-0 md:max-w-md">
                    <div>
                        <p className="title-gsap text-2xl md:text-3xl font-[Poppins] font-bold mb-4" style={{ color: colors.accent }}>
                            {currentService.name}
                        </p>
                    </div>

                    <h2 className="details-title-gsap text-lg font-semibold font-[Poppins]" style={{ color: colors.textPrimary }}>
                        {currentService.title}
                    </h2>

                    <p className="details-description-gsap text-sm leading-relaxed font-[Poppins]" style={{ color: colors.textSecondary }}>
                        {currentService.description}
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Nosoffres;
