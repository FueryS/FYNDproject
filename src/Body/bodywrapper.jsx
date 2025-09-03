import "./bodywrapper.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import { images } from "../Backend/imageCollector.js";
import React, { useState, useEffect } from "react";
import { CartProvider } from "../Backend/CartContext"; // adjust path as needed

// Components
import Board from "../offerBoard";
import ScheduleMain from "../Schedule/scheduleMain.jsx";
import LeftBarMain from "../LeftBar/leftBarMain.jsx";
import SearchBarMain from "../searchBar/searchBar.jsx";
import BodyMain from "./bodymain.jsx";
import ProductPage from "../Product/productPage.jsx";

//pages
import About from "../About/aboutMain.jsx";
import Contact from "../Contacts/contactMain.jsx";

function BodyWrapper() {
  const [imagesLoaded, setImagesLoaded] = useState([]);

  useEffect(() => {
    images.collectImage();
    const loadedImages = images.getsImages();
    setImagesLoaded(loadedImages);
  }, []);

  return (
    <>
      <div className="main-container">
        <div className="LBM">
          <LeftBarMain />
        </div>

        <div className="container-0">
          <div className="container-SBM-Board-SM">
            <div className="container-SBM-Board">
              <motion.div
                className="SBM"
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <SearchBarMain />
              </motion.div>

              <motion.div
                className="Board"
                initial={{ opacity: 0, x: -70 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
              >
                <Board />
              </motion.div>
            </div>
            <motion.div
              className="SM"
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <ScheduleMain />
            </motion.div>
          </div>
          <motion.div
            className="BDM"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            {Array.from({ length: imagesLoaded.length }).map((_, i) => (
              <BodyMain key={i} id={i + 1} imagePath={imagesLoaded[i]} />
            ))}
          </motion.div>
        </div>
      </div>
    </>
  );
}

function BWmain() {
  return (
    <CartProvider>
      <Routes>
        <Route path="/" element={<BodyWrapper />} />
        <Route path="/product/:id" element={<ProductPage />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </CartProvider>
  );
}

export default BWmain;
