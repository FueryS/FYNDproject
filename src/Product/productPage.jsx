import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { useCart } from "../Backend/CartContext.js";
import { useUser } from "../Backend/userContext.js";
import ProductService from "../services/productService.js";

import "./productPage.css";

function ProductPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useUser();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const prod = await ProductService.getProductById(id);
        setProduct(prod);
      } catch (err) {
        console.error("Failed to fetch product:", err);
      }
    }
    fetchProduct();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const add2Cart = () => {
    if (!user) {
      toast.warn("You must be logged in to add items to the cart!");
      return;
    }

    addToCart({
      id: product._id,
      price: product.price,
      name: product.name,
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Animations
  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6, ease: "easeOut" },
  };

  const fadeInLeft = {
    initial: { opacity: 0, x: -60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.2 },
  };

  const fadeInRight = {
    initial: { opacity: 0, x: 60 },
    animate: { opacity: 1, x: 0 },
    transition: { duration: 0.6, ease: "easeOut", delay: 0.4 },
  };

  const staggerContainer = {
    animate: {
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  return (
    <div className="container">
      <ToastContainer position="top-right" autoClose={2000} />

      {/* Hero Section */}
      <motion.section
        className="hero"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.5 }}
        variants={staggerContainer}
      >
        <motion.div className="hero-content" variants={fadeInUp}>
          <motion.h1 className="hero-title" variants={fadeInUp}>
            {product.name}
          </motion.h1>
          <motion.p className="hero-subtitle" variants={fadeInUp}>
            {product.description?.hero}
          </motion.p>
          <motion.div className="price-container" variants={fadeInUp}>
            <span className="price">{product.price} Rs</span>
            <span className="original-price">{product.originalPrice} Rs</span>
          </motion.div>
        </motion.div>

        <motion.div className="hero-image" variants={fadeInRight}>
          <div className="product-image-placeholder">
            {product.image ? (
              <img
                src={ProductService.getImageUrl(product.image)}
                className="placeholder-image0"
                alt={product.name}
              />
            ) : (
              <span className="placeholder-text">No Image</span>
            )}
          </div>
        </motion.div>
      </motion.section>

      {/* About / Details Section */}
      <motion.section
        className="details"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.3 }}
      >
        <motion.div className="details-content" variants={fadeInLeft}>
          <h2 className="section-title">About this product</h2>
          <p className="details-text">{product.description?.about}</p>
        </motion.div>

        <motion.div className="details-image" variants={fadeInRight}>
          <div className="product-image-placeholder">
            <span className="placeholder-text">Detail View</span>
          </div>
        </motion.div>
      </motion.section>

      {/* CTA Section */}
      <motion.section
        className="cta"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}
      >
        <h2 className="cta-title">{product.description?.pitch}</h2>
        <div className="cta-buttons">
          <button className="primary-button" onClick={add2Cart}>
            Add to Cart
          </button>
        </div>
      </motion.section>
    </div>
  );
}

export default ProductPage;
