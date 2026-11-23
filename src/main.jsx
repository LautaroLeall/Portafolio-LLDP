import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import { ThemeProvider } from "./context/ThemeProvider"
import { LanguageProvider } from "./context/LanguageProvider"
import { LoaderProvider } from "./context/LoaderContext"
import App from "./App"
import "./index.css"

// Carga asíncrona CSP-strict de Google Fonts sin handlers inline
if (typeof document !== "undefined") {
  const fontLink = document.createElement("link")
  fontLink.rel = "stylesheet"
  fontLink.href =
    "https://fonts.googleapis.com/css2?family=Geist+Mono:wght@400;500;700&family=Geist:wght@400;500;600;700;800&display=swap"
  document.head.appendChild(fontLink)
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <LanguageProvider>
          <LoaderProvider>
            <App />
          </LoaderProvider>
        </LanguageProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
)
