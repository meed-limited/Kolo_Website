import React from "react";

import Frame from "../components/Frame";
import LandingDetail from "../components/LandingDetail";

const Home = () => {
  return (
    <Frame title="Home" isLanding useDefaultScroll>
      <div className="home-wrapper">
        <div className="landing">
          <div className="title">Plays To Invest</div>
          <div className="sub-title">Plays to invest and get in micro-funding</div>
          <img src="assets/images/landing-img.png" />
        </div>
        <div className="landing-detail">
          <div className="sub-title">Fun and get in</div>
          <div className="title">
            Investing <br /> micro-funding
          </div>
          <div className="details">
            <LandingDetail
              title="What is KOLO?"
              description="Kolo is a Micro-funding DAO and GameFi platform that uses blockchain technology to redistribute advertising revenue from games to a micro-lending platform. Users apply for micro-loans, approval for which is given by the DAO."
              imagePath="kolo-landing.png"
              isReversed={false}
            />
            <LandingDetail
              title="What is micro-funding?"
              description="Micro-funding is a small loan offered to self-employed individuals and small business owners."
              imagePath="funding.png"
              isReversed={true}
            />
            <LandingDetail
              title="Where Do The Funds Come From?"
              description="A portion of ad revenues from the Kolo game platform are converted to USDC and held in the DAO. The DAO then decides how funds are used and distributed among applicant projects."
              imagePath="coin.png"
              isReversed={false}
            />
            <LandingDetail
              title="The DAO"
              description="The requirement to be a member of the DAO is to have a minimum of 1 KOL. Using the KOLO app allows users to collect points and receive KOL tokens. The more KOL tokens a user has, the more voting power they have."
              imagePath="dao.png"
              isReversed={true}
            />
            <LandingDetail
              title="Why Blockchain?"
              description="All transactions are recorded on the blockchain, ensuring security and transparency."
              imagePath="wallet.png"
              isReversed={false}
            />
            <LandingDetail
              title="What kind of projects are supported?"
              description="Kolo aims to democratize opportunity. Any entrepreneurial project such as farming or any small business needing a small investment to start or grow may apply. All applications are subject to the DAO’s approval, so the better the business plan and communication around the project, the higher the chances of success."
              imagePath="projects.png"
              isReversed={true}
            />
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default Home;
