import './aboutMain.css';
import { motion } from 'framer-motion';

function About() {
  return (
    <motion.div className="about-container"
      initial={{opacity:0 , y: 50}}
      animate={{opacity:1 , y: 0}}
      transition={{ duration: 0.5 }}>
      <motion.div
        initial={{opacity:0 , y: 80}}
        animate={{opacity:1 , y: 0}}
        transition={{ duration: 1 }}>
      <h1 className="about-title">About Us</h1>
      <p className="about-text">
        Welcome to <strong>MyApp</strong>! We build fast, simple, and beautiful web experiences.
      </p>
      <p className="about-text">
        This project is crafted with React, creativity, and a touch of obsession for clean UI.
      </p>
      <p className="about-text">
        Thank you for being here — we hope you enjoy the experience!
      </p>
      </motion.div>
    </motion.div>
  );
}

export default About;
