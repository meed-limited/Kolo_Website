import React from "react";

import { Scrollbars } from "react-custom-scrollbars-2";
import { useNavigate } from "react-router-dom";

import { useCountdown } from "../../hooks/useCountDown";
import Frame from "../components/Frame";
import ListBox from "../components/ListBox";

const ProjectList = () => {
  const navigate = useNavigate();
  const [days, hours, minutes, seconds] = useCountdown("Dec 5, 2022 15:37:25");

  return (
    <Frame title="Project List">
      <div className="project-wrapper">
        <div className="title-section">
          <div className="title">Project Listing</div>
          <div className="project-time">
            <span className="iconify" data-icon="fluent:timer-32-regular"></span>{" "}
            <div className="countdown">
              Live for {days} more days and {`${hours}:${minutes}:${seconds}`}
            </div>
          </div>
        </div>
      </div>
      <div>
        <Scrollbars autoHide autoHideTimeout={1} style={{ width: "100%", height: "70vh" }}>
          <div onClick={() => navigate("/project-detail")}>
            <ListBox
              imagePath="assets/images/pl4.png"
              title="Planet Giant"
              detail="Planet Giant is a Third person Shooter taking place on a medieval multiverse. Players can control a ......                    "
              objective="00000000"
              backer="00000000"
              rank={1}
            />
          </div>
          <div onClick={() => navigate("/project-detail")}>
            <ListBox
              imagePath="assets/images/pl1.png"
              title="Gachapon!"
              detail="We based Gachapon on the vending machines popular in Japan and other Asian countries that dispense capsules with toys or other goodi......"
              objective="00000000"
              backer="00000000"
              rank={2}
            />
          </div>
          <div onClick={() => navigate("/project-detail")}>
            <ListBox
              imagePath="assets/images/pl2.png"
              title="Get the Cats"
              detail="A One-of-a-Kind Augmented Reality Game where you get cats......                    "
              objective="00000000"
              backer="00000000"
              rank={3}
            />
          </div>
        </Scrollbars>
      </div>
    </Frame>
  );
};

export default ProjectList;
