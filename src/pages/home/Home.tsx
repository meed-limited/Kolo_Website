import React from "react";

import Frame from "../components/Frame";

const Home = () => {
  return (
    <Frame title="Home" isLanding>
      <div className="home-wrapper">
        <div className="landing">
          <div className="title">What is KOLO?</div>
          <div className="sub-title">
            KOLO is a DAO Micro-funding gamefi platform using blockchain technology to redistribute game revenue to
            various projects. Itis a platform that provides its users have easy access to invest and get in
            micro-funding
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default Home;
