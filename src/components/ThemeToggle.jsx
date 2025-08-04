// src/components/ThemeToggle.jsx
import React from 'react'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '../hooks/useTheme'
import '../styles/themeToggle.css'

export default function ThemeToggle() {
    const { theme, setTheme } = useTheme()

    const toggleTheme = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
    }

    return (
        <div className="theme-toggle gap-2">
            <Sun className={`icon ${theme === 'dark' ? 'inactive' : ''}`} />
            <div className={`toggle ${theme}`} onClick={toggleTheme}>
                <div className="ball" />
            </div>
            <Moon className={`icon ${theme === 'light' ? 'inactive' : ''}`} />
        </div>
    )
}
