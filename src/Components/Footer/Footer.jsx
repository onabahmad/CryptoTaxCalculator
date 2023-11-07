import React from "react";
import "./Footer.css";
import { BiLogoLinkedin } from "react-icons/bi";
import { BiLogoFacebook } from "react-icons/bi";
import { AiOutlineInstagram } from "react-icons/ai";
import { BiLogoTwitter } from "react-icons/bi";
import { AiFillYoutube } from "react-icons/ai";

const Footer = () => {
  return (
    <div className="footer_container">
      <p className="all_rights">
        © All rights reserved by Simplify Infotech Pvt.Ltd.
      </p>
      <div className="socials_details">
        <BiLogoLinkedin className="socials" />
        <BiLogoFacebook className="socials" />
        <AiOutlineInstagram className="socials" />
        <BiLogoTwitter className="socials" />
        <AiFillYoutube className="socials" />
      </div>
      <div>
        <h4 className="Product_company_PR">Product</h4>
        <h5>Features</h5>
        <h5>How it works</h5>
      </div>
      <div>
        <h4 className="Product_company_PR">Company</h4>
        <h5>Backed By</h5>
        <h5>Term of use</h5>
        <h5>Privacy Policy</h5>
      </div>

      <div>
        <h4 className="Product_company_PR">PR and Media enquiries</h4>
        <h5>communications@koinx.com</h5>
      </div>
    </div>
  );
};

export default Footer;
