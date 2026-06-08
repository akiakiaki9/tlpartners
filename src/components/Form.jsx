import React, { useState } from 'react';
import { IoLocationOutline } from "react-icons/io5";
import { TbPhoneCall } from "react-icons/tb";
import { PiChats } from "react-icons/pi";
import { FaTelegramPlane, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
import { useTranslation } from 'react-i18next';

export default function Form() {
    const { t } = useTranslation();
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        message: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState({ type: '', message: '' });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        // Очищаем статус при изменении полей
        if (status.message) setStatus({ type: '', message: '' });
    };

    const sendToTelegram = async (data) => {
        const botToken = process.env.REACT_APP_TG_BOT_TOKEN;
        const chatId = process.env.REACT_APP_TG_CHAT_ID;
        
        if (!botToken || !chatId) {
            throw new Error('Telegram bot credentials not configured');
        }

        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleString('ru-RU', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit'
        });

        const message = `
📋 <b>НОВОЕ СООБЩЕНИЕ С САЙТА</b>
━━━━━━━━━━━━━━━━━━━━
👤 <b>Имя:</b> ${data.firstName || 'Не указано'}
👥 <b>Фамилия:</b> ${data.lastName || 'Не указано'}
📧 <b>Email:</b> ${data.email || 'Не указан'}
💬 <b>Сообщение:</b>
${data.message || 'Не указано'}
━━━━━━━━━━━━━━━━━━━━
🕐 <b>Время:</b> ${formattedDate}
🌐 <b>Сайт:</b> tlpartners.uz
        `;

        const url = `https://api.telegram.org/bot${botToken}/sendMessage`;
        
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'HTML',
                disable_web_page_preview: true
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.description || 'Failed to send message');
        }

        return await response.json();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Валидация
        if (!formData.firstName || !formData.message) {
            setStatus({
                type: 'error',
                message: t("form_error") || 'Пожалуйста, заполните имя и сообщение'
            });
            return;
        }

        setIsLoading(true);
        setStatus({ type: '', message: '' });

        try {
            await sendToTelegram(formData);
            
            setStatus({
                type: 'success',
                message: t("form_success") || 'Сообщение успешно отправлено! Мы свяжемся с вами в ближайшее время.'
            });
            
            // Очищаем форму
            setFormData({
                firstName: '',
                lastName: '',
                email: '',
                message: ''
            });
            
            // Через 5 секунд убираем сообщение об успехе
            setTimeout(() => {
                setStatus({ type: '', message: '' });
            }, 5000);
            
        } catch (error) {
            console.error('Error sending message:', error);
            setStatus({
                type: 'error',
                message: t("form_error_send") || 'Ошибка при отправке сообщения. Пожалуйста, попробуйте позже или свяжитесь с нами по телефону.'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='form' id='contacts'>
            <div className="main">
                <div className="form-header">
                    <div className="form-header__section-1 animate-text">
                        <p>{t("form_1")}</p>
                        <h1>{t("form_2")}</h1>
                        <div className='subtitle-line'></div>
                    </div>
                    <div className="form-header__section-2 animate-text">
                        <div className="form-header__section-2__part">
                            <div>
                                <IoLocationOutline className='form-header__icon' />
                                <p>{t("form_3")}</p>
                            </div>
                        </div>
                        <div className="form-header__section-2__part">
                            <div>
                                <TbPhoneCall className='form-header__icon' />
                                <a href='tel:+998903305735'>+998 90 330-57-35</a>
                            </div>
                            <div>
                                <PiChats className='form-header__icon' />
                                <a href='mailto:tillayevlawpartners@gmail.com'>tillayevlawpartners@gmail.com</a>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Статус сообщения */}
                {status.message && (
                    <div className={`form-status form-status--${status.type}`}>
                        <div className="form-status__icon">
                            {status.type === 'success' ? <FaCheckCircle /> : <FaExclamationCircle />}
                        </div>
                        <p>{status.message}</p>
                    </div>
                )}
                
                <form className="form-blok" onSubmit={handleSubmit}>
                    <div className="form-blok__section">
                        <input 
                            type="text" 
                            placeholder={`${t("form_4")} *`} 
                            name="firstName" 
                            value={formData.firstName} 
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        />
                        <input 
                            type="text" 
                            placeholder={t("form_5")} 
                            name="lastName" 
                            value={formData.lastName} 
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                        <input 
                            type="email" 
                            placeholder={t("form_6")} 
                            name="email" 
                            value={formData.email} 
                            onChange={handleChange}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="form-blok__section">
                        <textarea 
                            placeholder={`${t("form_7")} *`} 
                            name="message" 
                            value={formData.message} 
                            onChange={handleChange}
                            disabled={isLoading}
                            required
                        />
                    </div>
                    <div className="form-blok__section">
                        <button type='submit' disabled={isLoading}>
                            {isLoading ? (
                                <>
                                    <span className="spinner"></span>
                                    {t("form_sending") || "Отправка..."}
                                </>
                            ) : (
                                <>
                                    <FaTelegramPlane className="form-submit-icon" />
                                    {t("form_8")}
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};