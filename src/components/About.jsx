import React from 'react';
import '../styles/about.css';

const About = () => {
    return (
        <div className="about-container container py-5" data-aos="fade-up">
            <h2 className="section-title">About Me</h2>
            <p className="about-text">
                Hello, I'm Lautaro Leal Del Prete.
                <br />
                I'm a Software Development and Quality student at Universidad del Norte Santo Tomás de Aquino.
                <br />
                I'm continuing my training in web development, programming, problem-solving, and teamwork. I already have experience in basic web development, customer service, and inventory control thanks to previous academic projects and jobs.
                <br />
                I'm especially motivated by teamwork. I have experience applying agile methodologies such as SCRUM, which has allowed me to develop organizational, communication, and effective collaboration skills in group projects.
                <br />
                I'm looking for opportunities to continue learning, add value to technology teams, and participate in projects that represent real challenges.
            </p>
        </div>
    );
};

export default About;
