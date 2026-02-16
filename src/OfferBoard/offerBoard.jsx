import React, { useState, useEffect, useRef } from "react";
import OfferService from "../services/offerService.js";
import "./offerBoard.css";

function ScrollingOffer() {
  const [offerImages, setOfferImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const offersRef = useRef(null);

  useEffect(() => {
    async function loadOffers() {
      const products = await OfferService.getOffers();
      // Map products → image URLs
      const imgs = products.map((p) => OfferService.getImageUrl(p.image));
      setOfferImages(imgs);
      console.log(imgs);
    }
    loadOffers();
  }, []);

  // Detect which image is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!offersRef.current) return;
      const imgs = Array.from(offersRef.current.querySelectorAll("img"));
      const scrollLeft = offersRef.current.scrollLeft;

      let closestIdx = 0;
      let closestDist = Infinity;

      imgs.forEach((img, idx) => {
        const dist = Math.abs(img.offsetLeft - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      setCurrentIndex(closestIdx);
    };

    const ref = offersRef.current;
    if (ref) ref.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      if (ref) ref.removeEventListener("scroll", handleScroll);
    };
  }, [offerImages]);

  return (
    <div className="offer-wrapper">
      <div className="offers" ref={offersRef}>
        {offerImages.map((image, index) => (
          <img
            id={`oimg${index}`}
            key={`offer-${index}`}
            src={image}
            alt={`Offer ${index + 1}`}
          />
        ))}
      </div>
      <div className="offer-nav">
        {offerImages.map((_, index) => (
          <a key={`offer-nav-${index}`} href={`#oimg${index}`}>
            <div
              className={`offer-nav-button${
                currentIndex === index ? " active" : ""
              }`}
            />
          </a>
        ))}
      </div>
    </div>
  );
}

export default ScrollingOffer;
