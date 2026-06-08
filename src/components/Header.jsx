import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

export default function Header() {
    const { t } = useTranslation();
    const videoRef = useRef(null);

    useEffect(() => {
        if (videoRef.current) {
            videoRef.current.playbackRate = 0.8; // Немного замедляем видео для элегантности
        }
    }, []);

    return (
        <div className="video-bg">
            <video
                ref={videoRef}
                src="/videos/header.mp4"
                type="video/mp4"
                autoPlay
                muted
                loop
                playsInline
            />
            <div className="effects"></div>
            <div className="video-bg__content">
                <p className="video-subtitle2 animate-fadeInUp">
                    {t("header_1")} <span>TLP</span>
                </p>
                <h1 className="video-title animate-fadeInUp animate-delay-1">
                    Tillayev Law Partners
                </h1>
                <p className="video-subtitle animate-fadeInUp animate-delay-2">
                    {t("header_3")}
                </p>
                <a href="#contacts" className="animate-fadeInUp animate-delay-3">
                    <button>{t("header_4")}</button>
                </a>
            </div>
        </div>
    );
}