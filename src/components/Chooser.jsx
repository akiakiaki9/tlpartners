import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaCheck, FaGlobe } from "react-icons/fa";

export default function Chooser() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [selectedLang, setSelectedLang] = useState(localStorage.getItem("language") || null);

    const languages = {
        en: { name: "EN", flag: "/images/flags/britain.webp", label: "English", fullName: "English" },
        ru: { name: "RU", flag: "/images/flags/russian.png", label: "Русский", fullName: "Русский" },
        uz: { name: "UZ", flag: "/images/flags/uzbekistan.png", label: "O'zbek", fullName: "O'zbek tili" },
    };

    useEffect(() => {
        if (!selectedLang) {
            setIsOpen(true);
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [selectedLang]);

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        setSelectedLang(lang);
        setIsOpen(false);
        document.body.style.overflow = "";
    };

    if (!isOpen) return null;

    return (
        <div className="choose-modal-overlay">
            <div className="choose-modal">
                <div className="choose-modal-icon">
                    <FaGlobe />
                </div>
                <h2 className="choose-modal-title">Choose your language</h2>
                <p className="choose-modal-subtitle">Выберите язык / Tilni tanlang</p>
                
                <div className="choose-language-options">
                    {Object.entries(languages).map(([code, lang]) => (
                        <div
                            key={code}
                            className="choose-language-item"
                            onClick={() => switchLanguage(code)}
                        >
                            <div className="choose-language-flag-wrapper">
                                <img src={lang.flag} alt={code} className="choose-flag" />
                            </div>
                            <span className="choose-language-code">{lang.name}</span>
                            <span className="choose-language-name">{lang.fullName}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};