import React from "react";
import "./Footer.css"; // Assuming you have an external CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-links">
        <a href="/privacy-policy" className="footer-link">Privacy Policy</a>
        <a href="/terms-of-service" className="footer-link">Terms of Service</a>
        <a href="/contact" className="footer-link">Contact Us</a>
      </div>
      <div className="footer-info">
        <p>© {new Date().getFullYear()} Your Company Name. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
