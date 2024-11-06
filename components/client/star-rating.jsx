"use client";
import { useState } from "react";

function StarRating() {
  const [rateHover, setRateHover] = useState(0);
  const [rateClick, setRateClick] = useState(0);

  //handle mouse passe sur composant
  const handleMouseOver = (value) => {
    setRateHover(value);
  };

  //handle mouse sort du composant
  const handleMouseOut = () => {
    setRateHover(0);
  };

  //handle click du composant
  const handleClick = (value) => {
    setRateClick(value);
  };

  return (
    <label className="mt-4">
      Difficulté :
      <div className="mt-2 flex items-center">
        {[1, 2, 3].map((value) => (
          <svg
            key={value}
            onMouseEnter={() => handleMouseOver(value)}
            onMouseLeave={handleMouseOut}
            onClick={() => handleClick(value)}
            className={`size-8 cursor-pointer transition duration-200`}
            fill="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M12 .587l3.668 7.431 8.166 1.183-5.906 5.748 1.394 8.114L12 18.897l-7.322 3.845 1.394-8.114-5.906-5.748 8.166-1.183z"
              fill={`${rateClick >= value ? "#FFA500" : "#D3D3D3"}`}
              stroke={`${rateHover >= value ? "black" : "transparent"}`}
              strokeWidth="1.5"
            />
          </svg>
        ))}
        <input type="hidden" name="dificultyLevel" value={rateClick} />
      </div>
    </label>
  );
}

export default StarRating;
