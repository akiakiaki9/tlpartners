import React, { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";

export default function Switcher() {
    const { i18n } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const dropdownRef = useRef(null);
    const currentLang = i18n.language || "ru";

    const switchLanguage = (lang) => {
        i18n.changeLanguage(lang);
        localStorage.setItem("language", lang);
        setIsOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    const languages = {
        en: { name: "EN", flag: "/images/flags/britain.webp", label: "English" },
        ru: { name: "RU", flag: "/images/flags/russian.png", label: "Русский" },
        uz: { name: "UZ", flag: "/images/flags/uzbekistan.png", label: "O'zbek" },
    };

    const current = languages[currentLang] || languages.ru;

    return (
        <div className="language">
            <div className="language-switcher" ref={dropdownRef}>
                <button 
                    className={`language-selected ${isOpen ? 'open' : ''}`} 
                    onClick={() => setIsOpen(!isOpen)}
                    aria-label="Выбрать язык"
                >
                    <img src={current.flag} alt={current.name} className="language-flag" />
                    <span className="language-code">{current.name}</span>
                    {isOpen ? <FaChevronUp className="language-arrow" /> : <FaChevronDown className="language-arrow" />}
                </button>
                
                {isOpen && (
                    <div className="language-dropdown">
                        {Object.entries(languages).map(([code, lang]) => (
                            <button
                                key={code}
                                className={`language-dropdown-item ${currentLang === code ? 'active' : ''}`}
                                onClick={() => switchLanguage(code)}
                            >
                                <img src={lang.flag} alt={code} className="language-flag" />
                                <span className="language-name">{lang.name}</span>
                                <span className="language-label">{lang.label}</span>
                            </button>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};