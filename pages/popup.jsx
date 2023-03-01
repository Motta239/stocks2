import { useState, useRef } from "react";

function Popup({ message }) {
  const [showPopup, setShowPopup] = useState(false);

  const handleMouseOver = () => {
    setShowPopup(true);
  };

  const handleMouseLeave = () => {
    setShowPopup(false);
  };

  return (
    <div className=" w-20 h-10  opacity-5 " style={{ position: "relative " }}>
      <div
        onMouseOver={handleMouseOver}
        onMouseLeave={handleMouseLeave}
        style={{ cursor: "pointer" }}
      ></div>
      {showPopup && (
        <div
          style={{
            position: "absolute",
            top: "30px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#fff",
            border: "1px solid #ddd",
            padding: "10px",
            boxShadow: "2px 2px 5px rgba(0, 0, 0, 0.3)",
          }}
        >
          {message}
        </div>
      )}
    </div>
  );
}

export default Popup;
