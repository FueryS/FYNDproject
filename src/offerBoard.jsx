import React, { useState, useEffect, useRef } from 'react';
import {images} from './Backend/imageCollector.js'
import './offerBoard.css';

function ScrollingOffer() {
  const [offerImages, setOfferImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const offersRef = useRef(null);

  useEffect(() => {
    images.collectOfferImage();
    setOfferImages(images.getOfferImages());
  }, []);

  // Detect which image is in view
  useEffect(() => {
    const handleScroll = () => {
      if (!offersRef.current) return;
      const imgs = Array.from(offersRef.current.querySelectorAll('img'));
      const scrollLeft = offersRef.current.scrollLeft;
      const containerWidth = offersRef.current.offsetWidth;

      let closestIdx = 0;
      let closestDist = Infinity;

      imgs.forEach((img, idx) => {
        const imgLeft = img.offsetLeft;
        const dist = Math.abs(imgLeft - scrollLeft);
        if (dist < closestDist) {
          closestDist = dist;
          closestIdx = idx;
        }
      });

      setCurrentIndex(closestIdx);
    };

    const ref = offersRef.current;
    if (ref) {
      ref.addEventListener('scroll', handleScroll, { passive: true });
    }
    return () => {
      if (ref) ref.removeEventListener('scroll', handleScroll);
    };
  }, [offerImages]);

  const imageStorage = offerImages.map((image, index) => (
    <img
      id={`oimg${index}`}
      key={`offer-${index}`}
      src={image}
      alt={`Offer ${index + 1}`}
    />
  ));

  const navigationButtons = offerImages.map((_, index) => (
    <a
      key={`offer-nav-${index}`}
      href={`#oimg${index}`}
    >
      <div className={`offer-nav-button${currentIndex === index ? ' active' : ''}`}/>
    </a>
  ));

  return (
    <div className='offer-wrapper'>
      <div className='offers' ref={offersRef}>{imageStorage}</div>
      <div className='offer-nav'>{navigationButtons}</div>
    </div>
  );
}

export default ScrollingOffer;