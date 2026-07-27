import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvider } from "./context/ThemeProvider"
import { LanguageProvider } from "./context/LanguageProvider"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
)
