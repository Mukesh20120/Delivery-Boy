import React, { useState, useEffect } from "react";


const FlickerIcon: React.FC = () => {

  const [color, setColor] = useState(false);

  useEffect(() => {
    const colorTime = setInterval(() => {
      setColor((prev) => !prev);
    }, 1000);
    return () => {
        clearInterval(colorTime);
    };
}, []);

console.log('running',Math.floor(Math.random()*10));
  return (
    <div>
      <div
        style={{
          width: "20px",
          height: "20px",
          backgroundColor: color ? "green" : "white",
          borderRadius: "10px",
        }}
      ></div>
    </div>
  );
};
export default FlickerIcon;
