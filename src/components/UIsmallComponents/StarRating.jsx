import React, { useState } from "react";
import { estimateDrink } from "../../http/drinksApi";
import "./StarRating.css";

const StarRating = ({ disabled, id, rating, onRatingChange, userId }) => {
  const [hoveredRating, setHoveredRating] = useState(0);

  const handleMouseOver = (index) => {
    setHoveredRating(index);
  };
  console.log(rating);
  const handleMouseLeave = () => {
    setHoveredRating(0);
  };
  function handleClick(i) {
    const voteIndex = i;
    onRatingChange(id, voteIndex, userId);
  }

  const stars = [];
  for (let i = 1; i <= 5; i++) {
    const filled = i <= (hoveredRating || rating);
    stars.push(
      <span
        key={i}
        className={`star ${filled ? "filled" : ""}`}
        onMouseOver={() => handleMouseOver(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        ★
      </span>
    );
  }

  return (
    <div style={disabled && { pointerEvents: "none" }} className="star-rating">
      {stars}
    </div>
  );
};

export default StarRating;
