import React from "react";

import { Button } from "react-bootstrap";

import Frame from "../components/Frame";

const SubmitSuccess = () => {
  return (
    <Frame title="Success">
      <div className="submit-success-wrapper">
        <div className="title">Congratulations</div>
        <img src="assets/images/pl5.png" />
        <div className="footer">
          <img src="assets/images/documentupload.svg" />
          <div className="footer-content">
            <div className="footer-header">You have submitted</div>
            <div className="footer-project">PJ Name</div>
            <div className="footer-btn">
              <Button>State</Button>
            </div>
          </div>
        </div>
      </div>
    </Frame>
  );
};

export default SubmitSuccess;
