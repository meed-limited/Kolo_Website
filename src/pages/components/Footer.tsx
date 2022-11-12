import React from "react";

import { Link } from "react-router-dom";

interface FooterProps {
  isLanding?: boolean;
}

const Footer: React.FC<FooterProps> = ({ isLanding }: FooterProps) => {
  return (
    <footer className={isLanding ? "landing-footer" : "footer"}>
      {isLanding && (
        <div className="footer-icons">
          <a href="#">
            <span className="iconify" data-icon="ic:sharp-discord"></span>
          </a>
          <a href="#">
            <span className="iconify" data-icon="entypo-social:twitter"></span>
          </a>
          <a href="#">
            <span className="iconify" data-icon="ant-design:youtube-filled"></span>
          </a>
          <a href="#">
            <span className="iconify" data-icon="eva:github-fill"></span>
          </a>
        </div>
      )}
      <div className="super-ultra">
        <span>Powered By</span>
        <img src="assets/images/super-ultra.svg" />
      </div>
      {isLanding && (
        <div className="footer-links">
          <Link to="/">Help</Link>
          <Link to="/">Report Bug</Link>
        </div>
      )}
    </footer>
  );
};

export default Footer;
