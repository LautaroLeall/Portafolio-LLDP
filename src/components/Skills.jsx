import React from 'react';
import '../styles/skills.css';

const skills = [
    { name: 'HTML', level: 90 },
    { name: 'CSS', level: 85 },
    { name: 'JavaScript', level: 80 },
    { name: 'React', level: 75 },
    { name: 'Bootstrap', level: 80 },
];

const Skills = () => {
    return (
        <div className="skills-container container py-5" data-aos="fade-up">
            <h2 className="section-title">Skills</h2>
            {skills.map((skill, index) => (
                <div className="skill-bar" key={index}>
                    <span>{skill.name}</span>
                    <div className="bar-bg">
                        <div className="bar-fill" style={{ width: `${skill.level}%` }}></div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Skills;
