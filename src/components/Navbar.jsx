import React from 'react';
import { Link } from 'react-scroll';
import { motion } from 'framer-motion';
import '../styles/navbar.css';

const Navbar = () => {
    return (
        <motion.nav
            className="bottom-navbar"
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
        >
            <ul className="nav-buttons">
                <li><Link to="home" smooth={true} duration={500}>Inicio</Link></li>
                <li><Link to="about" smooth={true} duration={500}>Sobre mí</Link></li>
                <li><Link to="skills" smooth={true} duration={500}>Skills</Link></li>
                <li><Link to="projects" smooth={true} duration={500}>Proyectos</Link></li>
                <li><Link to="contact" smooth={true} duration={500}>Contacto</Link></li>
            </ul>
        </motion.nav>
    );
};

export default Navbar;
