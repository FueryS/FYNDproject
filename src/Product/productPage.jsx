import React from "react";
import { useParams } from "react-router-dom";
import { images } from "../Backend/imageCollector.js";
import { motion } from "framer-motion";
import { useCart } from "../Backend/CartContext.js";
import "./productPage.css";

function ProductPage() {
  //reload the image array in backend
  images.reloadImage();

  //page
  const { addToCart } = useCart();
  const { id } = useParams();
  const productId = parseInt(id, 10);
  const price = productId * 100; // Price calculation as requested

  const add2Cart = () => {
    addToCart({
      id: productId,
      price: price,
      name: heroTitle, // sets all the values in the the useParams
    });
    alert("Product added to cart!");
  };

  const imageIndex = productId - 1;
  const imagePath = images.getsImages
    ? images.getsImages()[imageIndex]
    : undefined;

  // Animation variants for smooth entrance effects
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

  // Hero section content
  const heroImage = imagePath ? (
    <img src={imagePath} className="hero-image" />
  ) : (
    "placeholder-image.png"
  );

  // Product details
  const heroTitle = "Premium Headphones";
  const heroSubtitle = "Experience the sound like never before";

  const originalPrice = id;

  //key features
  const title1 = "Superior Sound Quality";
  const desc1 = "Enjoy crystal-clear audio with deep bass and rich treble.";
  const title2 = "Comfortable Fit";
  const desc2 =
    "Ergonomic design ensures comfort during long listening sessions.";
  const title3 = "Long Battery Life";
  const desc3 = "Up to 30 hours of playback on a single charge.";
  const title4 = "Built-in Voice Assistant";
  const desc4 = "Access your favorite voice assistant with a simple touch.";

  // Product details text
  const detailsText =
    "These headphones are engineered for excellence, providing an immersive audio experience with advanced noise cancellation and high-fidelity sound.";
  const specsContent = [
    "Frequency Response: 20Hz - 20kHz",
    "Driver Size: 40mm dynamic drivers",
    "Weight: 290g",
    "Connectivity: Bluetooth 5.0, 3.5mm jack",
  ];
  const specList = (
    <ul className="specs-list">
      {specsContent.map((spec, index) => (
        <li key={index}>{spec}</li>
      ))}
    </ul>
  );

  return (
    <div className="container">
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
            {heroTitle}
          </motion.h1>
          <motion.p className="hero-subtitle" variants={fadeInUp}>
            {heroSubtitle}
          </motion.p>
          <motion.div className="price-container" variants={fadeInUp}>
            <span className="price">{price}rs</span>
            <span className="original-price">{originalPrice}</span>
          </motion.div>
        </motion.div>

        <motion.div className="hero-image" variants={fadeInRight}>
          <div className="product-image-placeholder">{heroImage}</div>
        </motion.div>
      </motion.section>

      {/* Features Section */}
      <motion.section
        className="features"
        initial="initial"
        whileInView="animate"
        viewport={{ once: false, amount: 0.2 }}
        variants={staggerContainer}
      >
        <motion.h2 className="section-title" variants={fadeInUp}>
          Key Features
        </motion.h2>

        <motion.div className="features-grid" variants={staggerContainer}>
          {[
            { title: title1, desc: desc1 },
            { title: title2, desc: desc2 },
            { title: title3, desc: desc3 },
            { title: title4, desc: desc4 },
          ].map((feature, index) => (
            <motion.div
              key={index}
              className="feature-card"
              variants={fadeInUp}
            >
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-desc">{feature.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      {/* Product Details */}


      {/* CTA Section */}
      <motion.section
        className="cta"
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.5 }}
        variants={fadeInUp}
      >
        <h2 className="cta-title">Ready to live a healthy life?</h2>
        <p className="cta-text">
          Free shipping on orders over $200. 30-day money-back guarantee.
        </p>
        <div className="cta-buttons">
          <button className="primary-button" onClick={add2Cart}>
            Add to Cart
          </button>
          <button className="secondary-button">Learn More</button>
        </div>
      </motion.section>
    </div>
  );
}

export default ProductPage;
