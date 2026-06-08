import React, { useEffect, useRef } from 'react';
import { IoIosPeople } from "react-icons/io";
import { SiAdguard } from "react-icons/si";
import { FaUserClock } from "react-icons/fa6";
import { useTranslation } from 'react-i18next';

export default function Section() {
    const { t } = useTranslation();
    const sectionRefs = useRef([]);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('section-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        sectionRefs.current.forEach((ref) => {
            if (ref) observer.observe(ref);
        });

        return () => observer.disconnect();
    }, []);

    const SECTION = [
        {
            id: 1,
            icon: IoIosPeople,
            title: t("section_1"),
            subtitle: t("section_2"),
            delay: 0
        },
        {
            id: 2,
            icon: SiAdguard,
            title: t("section_3"),
            subtitle: t("section_4"),
            delay: 0.1
        },
        {
            id: 3,
            icon: FaUserClock,
            title: t("section_5"),
            subtitle: t("section_6"),
            delay: 0.2
        }
    ];

    return (
        <div className='section'>
            <div className="main">

                <div className="section-blok">
                    {SECTION.map((item, index) => (
                        <div
                            className='section-blok__section'
                            key={item.id}
                            ref={el => sectionRefs.current[index] = el}
                            style={{ transitionDelay: `${item.delay}s` }}
                        >
                            <div className="section-blok__section-part">
                                <div className="section-blok__section-part-1">
                                    <item.icon className="section__icon" />
                                </div>
                            </div>
                            <div className="section-blok__section-part">
                                <p className='section-blok__section-part__p-1'>{item.title}</p>
                                <p className='section-blok__section-part__p-2'>{item.subtitle}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}