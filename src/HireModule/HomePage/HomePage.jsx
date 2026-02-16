import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import TrainerService from "../HiremeServices/TrainerService";
import HireService from "../HiremeServices/HireService";
import "./HireMe.css";
import { useUser } from "../../Backend/userContext";
import { FaUserCircle, FaTrashAlt } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function HirePage() {
  const [trainers, setTrainers] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hiredList, setHiredList] = useState([]);
  const { user } = useUser();

  // Fetch all trainers
  useEffect(() => {
    const fetchTrainers = async () => {
      const data = await TrainerService.getAllTrainers();
      setTrainers(data);
    };
    fetchTrainers();
  }, []);

  // Fetch all hired trainers (if user logged in)
  useEffect(() => {
    const fetchHired = async () => {
      if (user?.email) {
        const data = await HireService.getHiredTrainers(user.email);
        setHiredList(data);
      }
    };
    fetchHired();
  }, [user]);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trainers.length);
  };

  const handleHire = async (trainer) => {
    if (!user) {
      toast.warning("Please login to hire a trainer");
      return;
    }

    const payload = {
      trainerEmail: trainer.email,
      trainerName: trainer.name,
      userEmail: user.email,
      userName: user.username,
    };

    const result = await HireService.hireTrainer(payload);
    if (result.error) toast.error(result.error);
    else {
      toast.success(`You hired ${trainer.name} successfully!`);
      setHiredList((prev) => [...prev, result.hired]); // add to list immediately
    }
  };

  const handleRemove = async (id) => {
    const result = await HireService.removeHiredTrainer(id);
    if (result.error) toast.error(result.error);
    else {
      toast.success("Trainer removed successfully!");
      setHiredList((prev) => prev.filter((item) => item._id !== id));
    }
  };

  if (trainers.length === 0) {
    return (
      <p style={{ textAlign: "center", marginTop: "2rem" }}>
        Loading trainers...
      </p>
    );
  }

  const trainer = trainers[currentIndex];

  return (
    <div className="hire-page">
      <ToastContainer position="top-right" autoClose={2500} />

      {/* Main Tinder-style Trainer Card */}
      <motion.div
        className="trainer-card"
        key={trainer._id}
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div className="trainer-image">
          <FaUserCircle size={120} color="#aaa" />
        </div>
        <h2>{trainer.name}</h2>
        <p>{trainer.specialization}</p>
        <p>{trainer.experience} years of experience</p>

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="hire-btn"
          onClick={() => handleHire(trainer)}
        >
          Hire
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="next-btn"
          onClick={handleNext}
        >
          Next
        </motion.button>
      </motion.div>

      {/* 🧾 Hired Trainers Section */}
      {user && (
        <div className="hired-section">
          <h2>Hired Trainers</h2>
          {hiredList.length > 0 ? (
            <ul>
              {hiredList.map((item) => (
                <motion.li
                  key={item._id}
                  className="hired-item"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                >
                  <div>
                    <strong>{item.trainerName}</strong> <br />
                    <span>{item.trainerEmail}</span>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="remove-btn"
                    onClick={() => handleRemove(item._id)}
                  >
                    <FaTrashAlt /> Remove
                  </motion.button>
                </motion.li>
              ))}
            </ul>
          ) : (
            <p>No trainers hired yet.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default HirePage;
