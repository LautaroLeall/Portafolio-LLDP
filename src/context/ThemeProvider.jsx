// src/context/ThemeProvider.jsx
import { useState, useEffect } from "react"
import { ThemeContext } from "./ThemeContext"

export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "dark"
    })

    useEffect(() => {
        const root = document.documentElement;
        const body = document.body;

        root.classList.remove("light", "dark");
        root.classList.add(theme);

        body.classList.remove("light", "dark");
        body.classList.add(theme);

        localStorage.setItem("theme", theme);
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'))
    }

    return (
        <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}
