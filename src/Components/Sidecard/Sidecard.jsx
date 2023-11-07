import React from "react";
import "./Sidecard.css";
import Image from "../../assets/image.png";

const Sidecard = () => {
  return (
    <div className="sideCard_container">
      <h3>Get Started with KoinX for FREE</h3>
      <p className="Koinx_para">
        With our range of feature that you can equip for free, KoinX allows you
        to be more educated and aware of tax report
      </p>
      <img src={Image} alt="Logo" className="Image" />
      <button className="GetStarted_button">Get Started for Free →</button>
    </div>
  );
};

export default Sidecard;
