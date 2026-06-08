import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next'
import { FaBriefcase, FaUsers, FaGlobe, FaTrophy } from "react-icons/fa";

export default function Section4() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    // Удаляем неиспользуемый counterRefs
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section4-visible');
                        // Запускаем анимацию счетчиков
                        startCounters();
                    }
                });
            },
            { threshold: 0.1 }
        );
        
        if (sectionRef.current) {
            observer.observe(sectionRef.current);
        }
        
        return () => observer.disconnect();
    }, []);
    
    const startCounters = () => {
        const counters = [
            { element: document.getElementById('counter1'), target: 1825 },
            { element: document.getElementById('counter2'), target: 532 },
            { element: document.getElementById('counter3'), target: 69 },
            { element: document.getElementById('counter4'), target: 32 }
        ];
        
        counters.forEach(counter => {
            if (!counter.element) return;
            
            let current = 0;
            const increment = counter.target / 50;
            const updateCounter = () => {
                if (current < counter.target) {
                    current += increment;
                    counter.element.textContent = Math.ceil(current) + (counter.target === 69 || counter.target === 32 ? '+' : '');
                    setTimeout(updateCounter, 20);
                } else {
                    counter.element.textContent = counter.target + (counter.target === 69 || counter.target === 32 ? '+' : '');
                }
            };
            updateCounter();
        });
    };
    
    const counters = [
        { id: 1, value: 1825, suffix: '', label: t("fun_5"), icon: FaBriefcase, color: 'main' },
        { id: 2, value: 532, suffix: '', label: t("fun_6"), icon: FaUsers, color: 'dark' },
        { id: 3, value: 69, suffix: '+', label: t("fun_7"), icon: FaGlobe, color: 'main' },
        { id: 4, value: 32, suffix: '+', label: t("fun_8"), icon: FaTrophy, color: 'dark' }
    ];

    return (
        <div className='section4' ref={sectionRef}>
            <div className="section4-overlay"></div>
            <div className="main">
                <div className="section4-blok">
                    <div className="section4-blok__section-1 animate-text">
                        <p>{t("fun_1")}</p>
                        <h1>{t("fun_2")}</h1>
                        <div className='subtitle-line'></div>
                    </div>
                    <div className="section4-blok__section-2 animate-text">
                        <p>{t("fun_3")}</p>
                        <p>{t("fun_4")}</p>
                    </div>
                </div>
                <div className="section4-footer">
                    {counters.map((counter, index) => (
                        <div 
                            className={`section4-footer__section section4-footer__section--${counter.color}`} 
                            key={counter.id}
                            style={{ animationDelay: `${index * 0.1}s` }}
                        >
                            <div className="section4-footer__section-icon">
                                <counter.icon />
                            </div>
                            <p className='section4-footer__section__p-1'>
                                <span id={`counter${counter.id}`}>0</span>
                                {counter.suffix}
                            </p>
                            <p className='section4-footer__section__p-2'>{counter.label}</p>
                            <div className="section4-footer__section-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};