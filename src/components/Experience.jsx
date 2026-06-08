import React, { useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Slider from "react-slick";
import { FaCalendarAlt, FaArrowRight, FaStar } from "react-icons/fa";
import { useTranslation } from 'react-i18next';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function Experience() {
    const { t } = useTranslation();
    const EXP = t("EXP", { returnObjects: true });
    const sliderRef = useRef(null);

    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 4000,
        pauseOnHover: true,
        cssEase: "cubic-bezier(0.4, 0, 0.2, 1)",
        customPaging: (i) => (
            <div className="exp-custom-dot"></div>
        ),
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    arrows: false,
                },
            },
        ],
    };

    return (
        <div className='exp'>
            <div className="exp-bg-pattern"></div>
            <div className="main">
                <div className="exp-header">
                    <div className="exp-header__section-1 animate-text">
                        <p>{t("exp_1")}</p>
                        <h1>{t("exp_2")}</h1>
                        <div className='subtitle-line'></div>
                    </div>
                    <div className="exp-header__section-2 animate-text">
                        <p>{t("exp_3")}</p>
                    </div>
                </div>
                
                <Slider ref={sliderRef} {...settings} className="exp-blok">
                    {EXP.map((item, index) => (
                        <div className='exp-blok__section' key={item.id}>
                            <div className="exp-blok__section-image">
                                <img src={item.image} alt={item.title} />
                                <div className="exp-blok__section-overlay">
                                    <FaStar className="exp-blok__section-star" />
                                </div>
                            </div>
                            <div className="exp-blok__section__container">
                                <div className="exp-blok__section__container__header">
                                    <FaCalendarAlt className='exp-blok__section__container__header__icon' />
                                    <p>{item.duration}</p>
                                </div>
                                <h3>{item.title}</h3>
                                <p className="exp-blok__section__description">{item.description || item.subtitle}</p>
                                <Link to={`/experience/${item.id}`}>
                                    <button className="exp-btn">
                                        <span>{t("exp_4")}</span>
                                        <FaArrowRight className="exp-btn-icon" />
                                    </button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};