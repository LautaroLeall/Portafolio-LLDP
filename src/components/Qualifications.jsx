// src/components/Qualifications.jsx
import { useState } from 'react'
import Education from './Education'
import Certifications from './Certifications'

// Componente Qualifications
// Contenedor padre que maneja el acordeón para Education y Certifications
const Qualifications = () => {
    // Estado que guarda cuál sección está abierta: 'education', 'certifications' o null
    const [openSection, setOpenSection] = useState(null)

    // Función para manejar apertura/cierre de secciones
    const handleToggle = (section) => {
        // Si clickeas la misma sección que ya está abierta → se cierra
        // Si clickeas otra → se abre esa y se cierra la anterior
        setOpenSection((prev) => (prev === section ? null : section))
    }

    return (
        <div className="qualifications-container">
            {/* Education */}
            <Education
                isOpen={openSection === 'education'}
                onToggle={() => handleToggle('education')}
            />

            {/* Certifications */}
            <Certifications
                isOpen={openSection === 'certifications'}
                onToggle={() => handleToggle('certifications')}
            />
        </div>
    )
}

export default Qualifications
