import React from 'react'
import { useTranslation } from 'react-i18next';
import { FaHeart } from "react-icons/fa";

export default function Footer2() {
    const { t } = useTranslation();
    const currentYear = new Date().getFullYear();
    
    return (
        <div className='footer2'>
            <div className="footer2-container">
                <div className="footer2-blok">
                    <p>
                        © {currentYear} {t("footer_3")} 
                        <a href="https://akbarsoft.uz" target="_blank" rel="noopener noreferrer">
                            Akbar Soft
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
};