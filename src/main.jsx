import React from "react"
import ReactDOM from "react-dom/client"
import "bootstrap/dist/css/bootstrap.min.css"
import { ThemeProvider } from "./context/ThemeProvider"
import { LanguageProvider } from "./context/LanguageProvider"
import { ModalProvider } from "./context/ModalProvider"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ThemeProvider>
      <LanguageProvider>
        <ModalProvider>
          <App />
        </ModalProvider>
      </LanguageProvider>
    </ThemeProvider>
  </React.StrictMode>
)
