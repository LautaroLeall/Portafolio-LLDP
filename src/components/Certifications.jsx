import { useState } from 'react'
import '../styles/certifications.css'

const certificationsData = [
    {
        title: 'Legacy Front End',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/legacy-front-end',
        date: '2025-08-05',
        // Ruta de la imagen que mostrarás al hacer hover:
        imgSrc: '/images/certifications/legacy-front-end.jpg',
    },
    {
        title: 'JavaScript Algorithms And Data Structures',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/javascript-algorithms-and-data-structures-v8',
        date: '2025-08-04',
        imgSrc: '/images/certifications/javascript-algorithms.jpg',
    },
    {
        title: 'Front End Development Libraries',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/front-end-development-libraries',
        date: '2025-07-24',
        imgSrc: '/images/certifications/front-end-libraries.jpg',
    },
    {
        title: 'Responsive Web Design',
        institution: 'FreeCodeCamp',
        link: 'https://www.freecodecamp.org/certification/lautaroleall/responsive-web-design',
        date: '2025-07-23',
        imgSrc: '/images/certifications/responsive-web-design.jpg',
    },
    {
        title: 'Web Development | Digitalers Academy',
        institution: 'Educacion IT',
        link: 'https://www.educacionit.com/perfil/lautaro-leal-del-prete-1069835/certificado/81949',
        date: '2024-05-27',
        imgSrc: '/images/certifications/web-development-digitalers.jpg',
    },
    {
        title: 'Introduction to Programming',
        institution: 'Educacion IT',
        link: 'https://www.educacionit.com/perfil/lautaro-leal-del-prete-1069835/certificado/54677',
        date: '2025-05-08',
        imgSrc: '/images/certifications/introduction-programming.jpg',
    },
    {
        title: 'Programming Logic',
        institution: 'Rolling Code School',
        link: 'https://certs.rollingcodeschool.com/bGF1dGFyb2xlYWw0QGdtYWlsLmNvbQ==-1743082204316-1.png',
        date: '2025-03-30',
        imgSrc: '/images/certifications/programming-logic.jpg',
    },
]

const Certifications = () => {
    // Guardamos el índice de la tarjeta que está hover para mostrar la imagen
    const [hoveredIndex, setHoveredIndex] = useState(null)

    return (
        <div className="certifications-container">
            <h2 className="certifications-title">My Certifications</h2>
            <div className="certifications-grid">
                {certificationsData.map(({ title, institution, link, date, imgSrc }, index) => (
                    <div
                        key={index}
                        className="certification-card"
                        onMouseEnter={() => setHoveredIndex(index)}
                        onMouseLeave={() => setHoveredIndex(null)}
                    >
                        <a
                            href={link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="certification-link"
                            title={`Open certification for ${title}`}
                        >
                            {title}
                        </a>
                        <p className="certification-institution">{institution}</p>
                        <p className="certification-date">{date}</p>

                        {/* Imagen que aparece SOLO si está en hover */}
                        {hoveredIndex === index && (
                            <div className="certification-image-container">
                                {/* 
                  Aquí debes poner la imagen de la certificación, 
                  solo cambia la ruta en imgSrc en el arreglo.
                */}
                                <img
                                    src={imgSrc}
                                    alt={`Certification: ${title}`}
                                    className="certification-image"
                                    loading="lazy"
                                />
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Certifications
