// LandingPage.jsx
import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { motion, useMotionValue, useTransform } from "framer-motion";
import "./LandingPage.css";

//elements
import TextPressure from "./interactiveHero.jsx";

function LandingPage() {
  // Mouse position motion values
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Scroll velocity for squish/stretch effect
  const scrollVelocity = useMotionValue(0);

  // Refs for all links to calculate distance from cursor
  const linkRefs = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const mx = (e.clientX / window.innerWidth - 0.5) * 10; // tweak distance
      const my = (e.clientY / window.innerHeight - 0.5) * 10;
      mouseX.set(mx);
      mouseY.set(my);

      // Optional: dynamic factor per link based on proximity
      linkRefs.current.forEach((el, index) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const elCenterX = rect.left + rect.width / 2;
        const elCenterY = rect.top + rect.height / 2;

        const dx = e.clientX - elCenterX;
        const dy = e.clientY - elCenterY;
        const distance = Math.sqrt(dx * dx + dy * dy);

        // Smaller distance → higher multiplier (closer moves more)
        const factor = Math.max(0.5, 5 / (distance / 50 + 1)); // tweak factor scaling

        // Set CSS variables for this link to use in motion style
        el.style.setProperty("--move-x", `${mx * factor}px`);
        el.style.setProperty("--move-y", `${my * factor}px`);
      });
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Scroll tracking
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const delta = window.scrollY - lastScrollY;
      scrollVelocity.set(delta);
      lastScrollY = window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [mouseX, mouseY, scrollVelocity]);

  const scale = useTransform(
    scrollVelocity,
    [-100, -20, 0, 20, 100],
    [0.9, 0.97, 1, 0.97, 0.9]
  );

  // Define your links dynamically
  const links = [
    {
      to: "/",
      title: "🛒 Feel like stocking up?",
      desc: "Explore and buy gym equipment & fitness accessories.",
    },
    {
      to: "/hireme",
      title: "💪 Want personal guidance?",
      desc: "Hire a trainer for online guidance & live chat support.",
    },
    // Add more links here and animation works automatically
  ];

  return (
    <div className="landing-container">
      {/* Hero Section */}
      <motion.header
        className="landing-hero"
        style={{ x: mouseX, y: mouseY, scale }}
      >
        <TextPressure />
        <p className="landing-subtitle">Strength. Discipline. Progress.</p>
      </motion.header>

      {/* Links Section */}
      <div className="landing-links">
        {links.map((link, i) => (
          <motion.div
            key={i}
            ref={(el) => (linkRefs.current[i] = el)}
            style={{
              x: "var(--move-x)", // uses computed variable from mouse proximity
              y: "var(--move-y)",
              scale,
            }}
          >
            <Link to={link.to} className="landing-link">
              <motion.h3 whileHover={{ scale: 1.1 }}>{link.title}</motion.h3>
              <p className="landing-desc">{link.desc}</p>
            </Link>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

export default LandingPage;
