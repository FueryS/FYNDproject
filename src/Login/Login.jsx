import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaLock, FaCheck, FaHome, FaEnvelope } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import AuthService from "../services/AuthService";
import { useUser } from "../Backend/userContext";
import "./AuthPage.css";

function AuthPage() {
  const [isSignup, setIsSignup] = useState(false);
  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");
  const [cpass, setCpass] = useState("");
  const [username, setUsername] = useState("");
  const [address, setAddress] = useState("");

  const { user, loginUser, logoutUser } = useUser();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !email ||
      !pass ||
      (isSignup && (!username || pass !== cpass || !address))
    ) {
      toast.error("Please fill all fields correctly");
      return;
    }

    if (isSignup) {
      const result = await AuthService.signup({
        username,
        email,
        password: pass,
        address,
      });
      if (result.error) toast.error(result.error);
      else {
        toast.success("Signup successful!");
        if (result.user) loginUser(result.user);
      }
    } else {
      const result = await AuthService.login({ email, password: pass });
      if (result.error) toast.error(result.error);
      else {
        toast.success("Login successful!");
        if (result.user) loginUser(result.user);
      }
    }
  };

  const handleLogout = () => {
    logoutUser();
    toast.info("Logged out successfully");
  };

  // If user exists, show profile page instead of login/signup
  if (user) {
    return (
      <div className="user-info-container">
        <ToastContainer position="top-right" autoClose={2500} />
        <motion.div
          className="user-card"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="user-heading">Welcome, {user.username} 👋</h2>

          <div className="user-detail">
            <FaUser className="icon" /> <strong>Username:</strong>{" "}
            {user.username}
          </div>
          <div className="user-detail">
            <FaEnvelope className="icon" /> <strong>Email:</strong> {user.email}
          </div>
          {user.address && (
            <div className="user-detail">
              <FaHome className="icon" /> <strong>Address:</strong>{" "}
              {user.address}
            </div>
          )}

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </motion.button>
        </motion.div>
      </div>
    );
  }

  //Default: login/signup page
  return (
    <div className="auth-container">
      <ToastContainer position="top-right" autoClose={2500} />

      <motion.h1
        className={`auth-heading ${isSignup ? "signup" : "login"}`}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        {isSignup ? "Signup" : "Login"}
      </motion.h1>

      <div className="toggle-container">
        <span>Login</span>
        <label className="switch">
          <input
            type="checkbox"
            checked={isSignup}
            onChange={() => setIsSignup(!isSignup)}
          />
          <span className="slider"></span>
        </label>
        <span>Signup</span>
      </div>

      <motion.form
        className="auth-form"
        onSubmit={handleSubmit}
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.6 }}
      >
        {isSignup && (
          <div className="input-box">
            <FaUser className="icon" />
            <input
              type="text"
              placeholder="Username"
              required
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
        )}

        <div className="input-box">
          <FaUser className="icon" />
          <input
            type="email"
            placeholder="E-mail"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-box">
          <FaLock className="icon" />
          <input
            type="password"
            placeholder="Password"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
          />
        </div>

        {isSignup && (
          <>
            <div className="input-box">
              <FaCheck className="icon" />
              <input
                type="password"
                placeholder="Confirm Password"
                required
                value={cpass}
                onChange={(e) => setCpass(e.target.value)}
              />
            </div>

            <div className="input-box">
              <FaHome className="icon" />
              <input
                type="text"
                placeholder="Address"
                required
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
          </>
        )}

        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          className={`submit-btn ${isSignup ? "signup" : "login"}`}
          type="submit"
        >
          {isSignup ? "Signup" : "Login"}
        </motion.button>
      </motion.form>
    </div>
  );
}

export default AuthPage;
