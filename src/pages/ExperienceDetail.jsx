import React, { useEffect } from 'react'
import { useTranslation } from 'react-i18next';
import { GoDotFill } from 'react-icons/go';
import { FaArrowLeft, FaShare, FaCalendarAlt, FaUser } from "react-icons/fa";
import { Link, useParams } from 'react-router-dom'
import Navbar from '../components/Navbar';
import Footer2 from '../components/Footer2';

export default function ExperienceDetail() {
    const { id } = useParams();
    const { t } = useTranslation();
    const EXP = t("EXP", { returnObjects: true });
    const experience = EXP.find(item => item.id === parseInt(id));
    
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [id]);

    const handleShare = () => {
        if (navigator.share) {
            navigator.share({
                title: experience?.title,
                url: window.location.href,
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            alert(t("page_copied") || "Ссылка скопирована!");
        }
    };

    if (!experience) {
        return (
            <div>
                <Navbar />
                <div className="not-found-page">
                    <div className="not-found-content">
                        <h1>404</h1>
                        <p>{t("page_not_found") || "Кейс не найден"}</p>
                        <Link to="/" className="not-found-home-btn">
                            <FaArrowLeft /> {t("page_back") || "Вернуться на главную"}
                        </Link>
                    </div>
                </div>
                <Footer2 />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            
            <div className="pagename">
                <div className="pagename-blok">
                    <div>
                        <h1>{t("page_detail") || "Детали кейса"}</h1>
                        <div className="pagename-line"></div>
                    </div>
                    <div>
                        <Link to="/">
                            <p className="pagename-blok__p-1">{t("page_1")}</p>
                        </Link>
                        <GoDotFill className="pagename-icon" />
                        <p className="pagename-blok__p-2">
                            {experience.title?.length > 40 ? experience.title.slice(0, 40) + "..." : experience.title}
                        </p>
                    </div>
                </div>
            </div>

            <div className="main">
                <div className='detail-container'>
                    <Link to="/" className="detail-back-btn">
                        <FaArrowLeft className="detail-back-icon" />
                        {t("page_back") || "Назад к кейсам"}
                    </Link>

                    <div className="detail-grid">
                        <div className="detail-main">
                            <div className="detail-card">
                                <div className="detail-image-wrapper">
                                    <img src={experience.image} alt={experience.title} className="detail-main-image" />
                                    <button onClick={handleShare} className="detail-share-btn">
                                        <FaShare />
                                    </button>
                                </div>
                                
                                <div className="detail-content">
                                    <div className="detail-meta-list">
                                        <div className="detail-meta-item">
                                            <FaCalendarAlt className="detail-meta-icon" />
                                            <span>{experience.duration}</span>
                                        </div>
                                        <div className="detail-meta-item">
                                            <FaUser className="detail-meta-icon" />
                                            <span>{experience.role || t("page_author") || "Tillayev Law Partners"}</span>
                                        </div>
                                    </div>
                                    
                                    <div className="detail-text">
                                        <p>{experience.subtitle_1}</p>
                                        {/* Показываем subtitle_2 только если он не пустой */}
                                        {experience.subtitle_2 && experience.subtitle_2.trim() !== "" && (
                                            <p>{experience.subtitle_2}</p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="detail-sidebar">
                            <div className="detail-sidebar-card">
                                <h3>{t("page_2")}</h3>
                                <div className="subtitle-line"></div>
                                
                                <div className="detail-related-list">
                                    {EXP.filter(item => item.id !== parseInt(id)).slice(0, 4).map(item => (
                                        <Link to={`/experience/${item.id}`} className="detail-related-item" key={item.id}>
                                            <img src={item.image} alt={item.title} className="detail-related-img" />
                                            <div className="detail-related-info">
                                                <p className="detail-related-title">{item.title}</p>
                                                <span className="detail-related-date">{item.duration}</span>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <Footer2 />
        </div>
    )
};