import React, { useState, useEffect } from "react";
import "./welcome.css";

const Welcome = () => {
  const images = [
    {
      src: "/image-slider-6.jpeg",
      text: "ආයුබෝවන්! Welcome! வணக்கம்!",
      smallText: "Hospital Staff Leave Management System (HSLMS)",
    },
    {
      src: "/image-slider-2.jpg",
      text: "Relieve the Burden of Tracking Staff Leaves",
      smallText:
        "Easily manage and monitor leave records for every team member.",
    },
    {
      src: "/image-slider-1.jpg",
      text: "Empowering Hospital Staff",
      smallText:
        "Manage your time off with ease, so you can focus on patient care.",
    },
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className="slider-container">
      {images.map((image, index) => (
        <div
          key={index}
          className={`slide ${index === currentIndex ? "active" : ""}`}
          style={{ backgroundImage: `url(${image.src})` }}
        >
          <div className="slide-text">
            <h1>{image.text}</h1>
            <p className="small-text">{image.smallText}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Welcome;
