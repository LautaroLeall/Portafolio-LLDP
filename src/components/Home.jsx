// src/components/Home.jsx
import React from 'react';
import { motion } from 'framer-motion';

const Home = () => {
    return (
        <motion.div
            className="container text-center py-5"
            initial={{ opacity: 0, y: -30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
        >
            <h1 className="display-4">Hola, soy Lautaro Leal Del Prete</h1>
            <p className="lead">Desarrollador Frontend | Apasionado por el código y el diseño</p>
            <a href="#projects" className="btn btn-primary mt-3">Ver proyectos</a>
        </motion.div>
    );
};

export default Home;
