import React from "react";
import { FaStar } from "react-icons/fa";

function RatingStar({ valueStar }) {
  const stars = Array(5).fill(0);

  return (
    <div>
      {" "}
      {stars.map((_, index) => {
        return (
          <FaStar
            key={index}
            color={valueStar > index ? "var(--yellow-dark)" : "var(--grey-300)"}
            className="icon"
          />
        );
      })}
    </div>
  );
}

export default RatingStar;
