import "./bodywrapper.css";
import { Routes, Route } from "react-router-dom";
import { motion } from "framer-motion";
import React, { useState, useEffect } from "react";

// Context
import { CartProvider } from "../Backend/CartContext";
import { UserProvider } from "../Backend/userContext";

// Components
import LeftBarMain from "../LeftBar/leftBarMain.jsx";
import SearchBarMain from "../searchBar/searchBar.jsx";
import Board from "../OfferBoard/offerBoard.jsx";
import ScheduleMain from "../Schedule/scheduleMain.jsx";
import BodyMain from "./bodymain.jsx";
import ProductPage from "../Product/productPage.jsx";

// Pages
import About from "../About/aboutMain.jsx";
import Contact from "../Contacts/contactMain.jsx";
import LandingPage from "../LandingPage/LandingPage.jsx";
import AuthPage from "../Login/Login.jsx";
import HirePage from "../HireModule/HomePage/HomePage.jsx";
import FitnessGrid from "./Fitnessgrid.jsx";

// Services
import ProductService from "../services/productService.js";

function BodyWrapper() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const result = await ProductService.getProducts();
        setProducts(result);
      } catch (error) {
        console.error("Failed to load products:", error);
      }
    }
    fetchProducts();
  }, []);

  return (
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
          {products.map((p) => (
            <BodyMain
              key={p._id}
              id={p._id}
              imagePath={ProductService.getImageUrl(p.image)}
            />
          ))}
        </motion.div>
      </div>
    </div>
  );
}

function BWmain() {
  return (
    <UserProvider>
      <CartProvider>
        <Routes>
          <Route path="/" element={<BodyWrapper />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/FYNDproject" element={<LandingPage />} />
          <Route path="/hireme" element={<HirePage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/demo" element={<FitnessGrid />} />
        </Routes>
      </CartProvider>
    </UserProvider>
  );
}

export default BWmain;
