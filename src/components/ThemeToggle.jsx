import React, { useEffect, useState } from 'react'
import { Sun, Moon } from 'lucide-react'
import '../styles/themeToggle.css'

export default function ThemeToggle() {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const saved = localStorage.getItem('theme') || 'light'
        setTheme(saved)
        document.body.classList.toggle('dark-mode', saved === 'dark')
    }, [])

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        document.body.classList.toggle('dark-mode', newTheme === 'dark')
        localStorage.setItem('theme', newTheme)
    }

    return (
        <div className="theme-toggle d-flex align-items-center justify-content-center gap-2">
            <Sun className={`icon ${theme === 'dark' ? 'inactive' : ''}`} />
            <div className={`toggle ${theme}`} onClick={toggleTheme}>
                <div className="ball" />
            </div>
            <Moon className={`icon ${theme === 'light' ? 'inactive' : ''}`} />
        </div>
    )
}
