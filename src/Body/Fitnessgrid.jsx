// FitnessGrid.jsx
import React from "react";
import { motion } from "framer-motion";

// Data for the cards
const fitnessOptions = [
  {
    title: "Body Weight",
    icon: "🏋️‍♂️",
    desc: "Bodyweight training is one of the most effective and versatile ways to improve strength and endurance, without the need for expensive gym equipment.",
  },
  {
    title: "Dumbbells",
    icon: "💪",
    desc: "Dumbbells are a versatile and essential piece of equipment for any fitness enthusiast, whether you're working out at home or in the gym.",
  },
  {
    title: "Classic Yoga",
    icon: "🧘",
    desc: "The term 'yoga' often denotes a modern form of Hatha yoga and a posture-based physical fitness, stress-relief practice.",
  },
  {
    title: "Exercise Bikes",
    icon: "🚴",
    desc: "Exercise bikes are a fantastic option for improving cardiovascular fitness and building lower body strength with minimal joint impact.",
  },
  {
    title: "Running",
    icon: "🏃",
    desc: "Running is one of the simplest yet most effective exercises to improve overall fitness, boost cardiovascular health, and build endurance.",
  },
  {
    title: "Strength",
    icon: "⚡",
    desc: "Strength training is a critical component of a balanced fitness routine, offering numerous benefits beyond building muscle.",
  },
];

// Parent + child animation settings
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.3 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function FitnessGrid() {
  return (
    <div className="bg-black text-white min-h-screen p-10">
      <h1 className="text-4xl font-bold text-center mb-10">MaxOut</h1>

      <motion.div
        className="grid md:grid-cols-3 gap-8"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {fitnessOptions.map((item, index) => (
          <motion.div
            key={index}
            variants={cardVariants}
            className="p-6 rounded-2xl bg-neutral-900 shadow-lg hover:shadow-xl transition"
          >
            <div className="text-5xl mb-4">{item.icon}</div>
            <h2 className="text-xl font-semibold mb-2">{item.title}</h2>
            <p className="text-sm text-gray-300">{item.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
}
