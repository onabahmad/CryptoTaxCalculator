import React, { useState } from "react";
import "./Navbar.css";
import { FaBars } from "react-icons/fa";
import logoImage from "../../assets/Logo.3331aa2fc2f35c00e58921b44a2ebf0d.png";

const Navbar = () => {
  const [showOptions, setShowOptions] = useState(false);

  const toggleOptions = () => {
    setShowOptions(!showOptions);
  };

  return (
    <nav>
      <div className="navbar-container">
        <img src={logoImage} alt="Logo" className="logo" />
        <button className="menu-icon" onClick={toggleOptions}>
          <FaBars />
        </button>
        <ul className={`options ${showOptions ? "active" : ""}`}>
          <li>
            <a href="/features">Features</a>
          </li>
          <li>
            <a href="/exchange">Exchange</a>
          </li>
          <li>
            <a href="/how-it-works">How it Works</a>
          </li>
          <li>
            <a href="/blog">Blog</a>
          </li>
          <li>
            <a href="/about-us">About Us</a>
          </li>
          <div className="signup_button">
            <li>
              <button className="signup">Sign In</button>
            </li>
          </div>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
