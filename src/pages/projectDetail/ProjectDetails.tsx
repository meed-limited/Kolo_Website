import React from "react";

import { useNavigate } from "react-router-dom";

import { useCountdown } from "../../hooks/useCountDown";
import Frame from "../components/Frame";

const ProjectDetails = () => {
  const navigate = useNavigate();
  const [days, hours, minutes, seconds] = useCountdown("Dec 5, 2022 15:37:25");

  return (
    <Frame title="Project Detail">
      <div className="product-detail">
        <div className="goBack" onClick={() => navigate(-1)}>
          {"<<<"}
        </div>
        <div className="content">
          <div className="header-wrapper">
            <div className="header">
              <div className="title">Gachapon!</div>
              <div className="rank">#2</div>
            </div>
            <div className="header">
              <div className="note">By We love Japan Organization</div>
              <div className="expiryTimer">
                <span className="iconify" data-icon="fluent:timer-32-regular"></span>{" "}
                <div className="countdown">
                  Live for {days} more days and {`${hours}:${minutes}:${seconds}`}
                </div>
              </div>
            </div>
          </div>
          <div className="project-body">
            <img src="assets/images/project-detail.png" />
            <div className="detail-breakdown">
              <div className="organization">Organization</div>
            </div>
          </div>
          <div></div>
          <div></div>
        </div>
      </div>
    </Frame>
  );
};

export default ProjectDetails;
