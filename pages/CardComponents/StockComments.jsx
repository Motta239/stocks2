import React, { useState } from "react";

function StockComments({ item, i, user }) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="flex items-center relative space-x-2 comment rounded-xl  ease-in-out border-[0.5px]"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div>{item}</div>
      {isHovered && (
        <div>
          <button className="btn btn-xs btn-danger">Delete</button>
        </div>
      )}
    </div>
  );
}

export default StockComments;
