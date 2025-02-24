import React, { useState, useEffect } from "react";
import Confetti from "react-confetti";

const ConfettiComponent = () => {
  const [dimensions, setDimensions] = useState({
    width: window.innerWidth,
    height: document.documentElement.scrollHeight, // Covers entire scrollable area
  });

  useEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: window.innerWidth,
        height: document.documentElement.scrollHeight, // Adjust height on resize
      });
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleResize); // Update height on scroll

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleResize);
    };
  }, []);

  return <Confetti width={dimensions.width} height={dimensions.height} />;
};

export default ConfettiComponent;
