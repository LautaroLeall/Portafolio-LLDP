import React from 'react'
import { useLanguage } from '../hooks/useLanguage'
import '../styles/languageToggle.css'

export default function LanguageToggle() {
    const { language, toggleLanguage } = useLanguage()

    return (
        <div className="language-toggle gap-2">
            <span className={`lang-label ${language === 'es' ? 'inactive' : ''}`}>EN</span>
            <div className={`toggle-lang ${language}`} onClick={toggleLanguage} title="Switch Language / Cambiar Idioma">
                <div className="ball-lang" />
            </div>
            <span className={`lang-label ${language === 'en' ? 'inactive' : ''}`}>ES</span>
        </div>
    )
}
