import React, { useEffect, useState } from 'react';
import { RiCloseLargeFill, RiFileCopyLine } from "react-icons/ri";
import { FaLocationDot, FaPhone, FaCheck } from "react-icons/fa6";
import { BsBank } from "react-icons/bs";
import { BiIdCard } from "react-icons/bi";
import { useTranslation } from 'react-i18next';

export default function Licences() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [copiedField, setCopiedField] = useState(null);

    const toggleModal = () => setIsOpen(!isOpen);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    const copyToClipboard = (text, field) => {
        navigator.clipboard.writeText(text);
        setCopiedField(field);
        setTimeout(() => setCopiedField(null), 2000);
    };

    const requisites = [
        {
            id: 1,
            icon: FaLocationDot,
            label: t("lic_3"),
            value: "Ташкент, Мирабадский район, улица Чимкент, 17",
            copyValue: "Ташкент, Мирабадский район, улица Чимкент, 17",
            type: "address"
        },
        {
            id: 2,
            icon: FaPhone,
            label: "Телефон",
            value: "+998 90 330-57-35",
            copyValue: "+998903305735",
            type: "phone"
        },
        {
            id: 3,
            icon: BsBank,
            label: t("lic_4"),
            value: "р/с: 20208000807000541001",
            copyValue: "20208000807000541001",
            type: "bank"
        },
        {
            id: 4,
            icon: BiIdCard,
            label: `${t("lic_5")}: 311063819`,
            value: "ИНН: 311063819",
            copyValue: "311063819",
            type: "inn"
        }
    ];

    return (
        <div className='licence'>
            <div className="licence-overlay"></div>
            <div className="main">
                <div className="licence-blok animate-text">
                    <p className="licence-title">
                        {t("lic_1")}
                        <span className="licence-title-line"></span>
                    </p>
                    <button onClick={toggleModal} className="licence-btn">
                        <span>{t("lic_2")}</span>
                    </button>
                </div>
            </div>

            {isOpen && (
                <div className="modal-overlay" onClick={toggleModal}>
                    <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                        <div className="modal-header">
                            <h3>{t("lic_1")}</h3>
                            <button className="close-btn" onClick={toggleModal}>
                                <RiCloseLargeFill className='close-btn__icon' />
                            </button>
                        </div>
                        
                        <div className="modal-body">
                            {requisites.map((item) => (
                                <div className="modal-body__section" key={item.id}>
                                    <div className="modal-body__section-icon">
                                        <item.icon className='modal-body__icon' />
                                    </div>
                                    <div className="modal-body__section-content">
                                        <p className="modal-body__label" style={{ color: '#fff' }}>{item.label}</p>
                                        <div className="modal-body__value-wrapper">
                                            <p className="modal-body__value">{item.value}</p>
                                            <button 
                                                className="modal-body__copy"
                                                onClick={() => copyToClipboard(item.copyValue, item.type)}
                                            >
                                                {copiedField === item.type ? <FaCheck /> : <RiFileCopyLine />}
                                                <span>{copiedField === item.type ? 'Скопировано!' : 'Копировать'}</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        
                        <div className="modal-footer">
                            <p>© {new Date().getFullYear()} Tillayev Law Partners</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};