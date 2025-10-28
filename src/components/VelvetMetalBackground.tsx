import React from "react";
import "./velvetMetalBackground.css";

const VelvetMetalBackground: React.FC = () => {
  return (
    <div className="velvet-metal-bg">
      <div className="velvet-metal-overlay"></div>
      <div className="velvet-metal-vignette"></div>
    </div>
  );
};

export default VelvetMetalBackground;
