import React, { useEffect, useRef } from 'react'
import { useTranslation } from 'react-i18next';
import { BsArrowRight, BsCheckCircle } from "react-icons/bs";
import { FaRegHandshake } from "react-icons/fa";

export default function Section2() {
    const { t } = useTranslation();
    const sectionRef = useRef(null);
    
    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section2-visible');
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
    
    const SECTION2 = [
        {
            id: 1,
            content: t("about_5")
        },
        {
            id: 2,
            content: t("about_6")
        },
        {
            id: 3,
            content: t("about_7")
        },
        {
            id: 4,
            content: t("about_8")
        },
    ];

    return (
        <div className='section2' ref={sectionRef}>
            <div className="main">
                <div className="section2-blok">
                    <div className="section2-blok__section section2-blok__section--left">
                        <p className='section2-blok__section__p-1 animate-text'>{t("about_1")}</p>
                        <h1 className='animate-text'>{t("about_2")}</h1>
                        <div className='subtitle-line animate-text'></div>
                        <p className='section2-blok__section__p-2 animate-text'>{t("about_3")}</p>
                        <p className='section2-blok__section__p-2 animate-text'>{t("about_4")}</p>
                        <div className="section2-blok__section__container">
                            {SECTION2.map((item, index) => (
                                <div className="section2-blok__section__container-part" key={item.id} style={{ animationDelay: `${index * 0.1}s` }}>
                                    <BsCheckCircle className='section2-blok__section__container__icon' />
                                    <p>{item.content}</p>
                                </div>
                            ))}
                        </div>
                        <div className="section2-blok__section__footer animate-text">
                            <p>{t("about_9")}</p>
                            <a href="tel:+998903305735" className="phone-link">+998 90 330-57-35</a>
                        </div>
                    </div>
                    <div className="section2-blok__section section2-blok__section-2">
                        <div className="section2-blok__section-2__blok">
                            <div className="section2-blok__section-2__icon">
                                <FaRegHandshake />
                            </div>
                            <h1>15<span>+</span></h1>
                            <p>{t("about_10")}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
};