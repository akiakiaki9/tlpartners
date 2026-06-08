import React from 'react'
import { Link } from 'react-router-dom'
import { FaPhone, FaTelegramPlane, FaInstagram, FaArrowUp } from "react-icons/fa";
import { IoMdMail, IoLogoWhatsapp } from "react-icons/io";
import { useTranslation } from 'react-i18next';

export default function Footer() {
    const { t } = useTranslation();
    
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <div className='footer'>
            <div className="footer-bg-pattern"></div>
            <div className="main">
                <div className="footer-header animate-footer">
                    <Link to='/' className="footer-logo">
                        <img src="/images/logo.PNG" alt="TLP Logo" />
                    </Link>
                    <p>{t("footer_1")}</p>
                </div>
                
                <div className="footer-divider"></div>
                
                <div className="footer-blok">
                    <div className="footer-blok__section-1 animate-footer">
                        <h4>{t("footer_contact") || "Контакты"}</h4>
                        <div className="footer-blok__section-1__part">
                            <FaPhone className='footer-blok__section-1__icon' />
                            <a href="tel:+998903305735">+998 90 330-57-35</a>
                        </div>
                        <div className="footer-blok__section-1__part">
                            <IoMdMail className='footer-blok__section-1__icon' />
                            <a href="mailto:tillayevlawpartners@gmail.com">tillayevlawpartners@gmail.com</a>
                        </div>
                    </div>
                    
                    <div className="footer-blok__section-2 animate-footer">
                        <h4>{t("footer_2")}</h4>
                        <div className="footer-social-icons">
                            <a href="https://t.me/TLP_tlp" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <FaTelegramPlane className='footer-blok__section-2__icon' />
                            </a>
                            <a href="https://www.instagram.com/advokat_tillayev" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <FaInstagram className='footer-blok__section-2__icon' />
                            </a>
                            <a href="https://wa.me/message/7G56GOTVWLQEK1" target="_blank" rel="noopener noreferrer" className="footer-social-link">
                                <IoLogoWhatsapp className='footer-blok__section-2__icon' />
                            </a>
                        </div>
                    </div>
                </div>
                
                <div className="footer-bottom">
                    <p>{t("footer_3")} <span>WebGeneration</span></p>
                    <button onClick={scrollToTop} className="footer-scroll-top">
                        <FaArrowUp />
                    </button>
                </div>
            </div>
        </div>
    )
};