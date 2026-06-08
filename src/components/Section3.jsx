import React, { useEffect, useRef } from 'react'
import { RiAdminFill } from "react-icons/ri";
import { BsFillPeopleFill } from "react-icons/bs";
import { GrMoney } from "react-icons/gr";
import { RiCriminalLine } from "react-icons/ri";
import { useTranslation } from 'react-i18next';

export default function Section3() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    const cardRefs = useRef([]);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section3-visible');
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
    
    const SECTION3 = [
        {
            id: 1,
            icon: RiAdminFill,
            title: t("service_3"),
            subtitle: t("service_4"),
            delay: 0
        },
        {
            id: 2,
            icon: BsFillPeopleFill,
            title: t("service_5"),
            subtitle: t("service_6"),
            delay: 0.1
        },
        {
            id: 3,
            icon: RiCriminalLine,
            title: t("service_7"),
            subtitle: t("service_8"),
            delay: 0.2
        },
        {
            id: 4,
            icon: GrMoney,
            title: t("service_9"),
            subtitle: t("service_10"),
            delay: 0.3
        },
    ];

    return (
        <div className='section3' ref={sectionRef}>
            <div className="section3-overlay"></div>
            <div className="main">
                <div className="section3-sar">
                    <p className="section3-sar__subtitle">{t("service_1")}</p>
                    <h1>{t("service_2")}</h1>
                    <div className='subtitle-line subtitle-line--center'></div>
                </div>
                <div className="section3-blok">
                    {SECTION3.map((item, index) => (
                        <div 
                            className='section3-blok__section' 
                            key={item.id}
                            ref={el => cardRefs.current[index] = el}
                            style={{ transitionDelay: `${item.delay}s` }}
                        >
                            <div className="section3-blok__section-icon">
                                <item.icon className='section3__icon' />
                            </div>
                            <p className='section3-blok__section__p-1'>{item.title}</p>
                            <p className='section3-blok__section__p-2'>{item.subtitle}</p>
                            <div className="section3-blok__section-line"></div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
};