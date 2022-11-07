import React from "react";
import { Button } from "react-bootstrap";

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
          <div className="project-body-wrapper">
            <div className="project-body">
              <img src="assets/images/project-detail.png" />
              <div className="detail-breakdown">
                <div className="organization">Organization</div>
                <div className="detail">
                  <img src="assets/images/organisation.png" />
                  <div className="breakdown">
                    <div className="summary">We love Japan Organization </div>
                    <div className="info">
                      We love Japan Organization aim to used blockchain technlog to build a small buiness and promote jp
                      culture xxxxxxxxxxxxxxxxxxxxx......
                    </div>
                    <div className="learn-more">Learn more{">>>"}</div>
                  </div>
                </div>
                <div className="obj-backer">
                  <div className="objective">
                    <div className="key">Objective:</div>
                    <div className="value">
                      <img src="assets/images/USDC.svg" /> <span>00000000</span>
                    </div>
                    <Button variant="danger">Contribute</Button>
                  </div>
                  <span className="iconify" data-icon="fluent:divider-short-20-regular"></span>
                  <div className="backer">
                    <div className="key">Number of Backers: : </div>
                    <div className="value">
                      <img src="assets/images/users.svg" /> <span>00000000</span>
                    </div>
                    <Button variant="success">Vote Now</Button>
                  </div>
                </div>
              </div>
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
