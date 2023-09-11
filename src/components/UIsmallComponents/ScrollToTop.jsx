import React, { useState, useEffect } from "react";
import { BsFillArrowUpSquareFill } from "react-icons/bs";
import "./scrollToTop.css";
const ScrollToTop = () => {
  const [buttonVisible, setButtonVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.pageYOffset > 500) {
        setButtonVisible(true);
      } else {
        setButtonVisible(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <>
      {buttonVisible && (
        <BsFillArrowUpSquareFill
          className="scroll-to-top"
          onClick={handleScrollToTop}
        />
      )}
    </>
  );
};

export default ScrollToTop;
