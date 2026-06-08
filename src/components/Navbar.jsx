import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaInstagram, FaTelegramPlane, FaWhatsapp, FaBars, FaTimes } from "react-icons/fa";
import Switcher from './Switcher';
import { useTranslation } from 'react-i18next';

export default function Navbar() {
    const { t } = useTranslation();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Блокируем/разблокируем скролл при открытии/закрытии меню
    useEffect(() => {
        if (isMenuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isMenuOpen]);

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <nav className={`navbar ${isScrolled ? 'navbar--scrolled' : ''}`}>
                <div className="navbar-container">
                    {/* Логотип */}
                    <Link to='/' className="navbar-logo" onClick={closeMenu}>
                        <img src="/images/logo.png" alt="TLP Law Firm" />
                    </Link>

                    {/* Десктопное меню */}
                    <div className="navbar-desktop">
                        <div className="navbar-info">
                            <p className="navbar-text">{t("navbar")}</p>
                            <div className="navbar-social">
                                <a href="https://www.instagram.com/advokat_tillayev/" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="Instagram">
                                    <FaInstagram className="navbar__icon" />
                                </a>
                                <a href="https://t.me/TLP_tlp" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="Telegram">
                                    <FaTelegramPlane className="navbar__icon" />
                                </a>
                                <a href="https://wa.me/message/7G56GOTVWLQEK1" 
                                   target="_blank" 
                                   rel="noopener noreferrer"
                                   aria-label="WhatsApp">
                                    <FaWhatsapp className="navbar__icon" />
                                </a>
                            </div>
                        </div>
                        <Switcher />
                    </div>

                    {/* Мобильная кнопка меню + Switcher рядом */}
                    <div className="navbar-mobile-controls">
                        <div className="navbar-mobile-switcher">
                            <Switcher />
                        </div>
                        <button 
                            className="navbar-mobile-toggle"
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            aria-label="Меню"
                        >
                            {isMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Мобильное меню */}
                <div className={`navbar-mobile-menu ${isMenuOpen ? 'navbar-mobile-menu--open' : ''}`}>
                    {/* Кнопка закрытия внутри меню (крестик сверху) */}
                    <button 
                        className="navbar-mobile-close"
                        onClick={closeMenu}
                        aria-label="Закрыть меню"
                    >
                        <FaTimes />
                    </button>
                    
                    <div className="navbar-mobile-content">
                        <div className="navbar-mobile-info">
                            <p className="navbar-mobile-text">{t("navbar")}</p>
                        </div>
                        <div className="navbar-mobile-social">
                            <a href="https://www.instagram.com/advokat_tillayev/" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               onClick={closeMenu}
                               aria-label="Instagram">
                                <FaInstagram className="navbar__icon" />
                                <span>Instagram</span>
                            </a>
                            <a href="https://t.me/TLP_tlp" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               onClick={closeMenu}
                               aria-label="Telegram">
                                <FaTelegramPlane className="navbar__icon" />
                                <span>Telegram</span>
                            </a>
                            <a href="https://wa.me/message/7G56GOTVWLQEK1" 
                               target="_blank" 
                               rel="noopener noreferrer"
                               onClick={closeMenu}
                               aria-label="WhatsApp">
                                <FaWhatsapp className="navbar__icon" />
                                <span>WhatsApp</span>
                            </a>
                        </div>
                    </div>
                </div>
            </nav>
            
            {/* Отступ для контента при фиксированной навигации */}
            <div className="navbar-spacer"></div>
        </>
    );
}