import React from "react";

interface PrevListBoxProps {
  imagePath: string;
  title: string;
  objective: string;
  backer: string;
}

const PrevListBox: React.FC<PrevListBoxProps> = ({ imagePath, title, objective, backer }: PrevListBoxProps) => {
  return (
    <div className="prev-list-box">
      <div className="image-container">
        <img src={imagePath} alt={title} />
      </div>
      <div className="prev-content">
        <div className="prev-title">{title}</div>
        <div className="obj-backer">
          <div className="container">
            <div className="key">Objective:</div>
            <div className="value">
              <img src="assets/images/USDC.svg" /> <span>{objective}</span>
            </div>
          </div>
          <div className="container">
            <div className="key">Number of Backers: : </div>
            <div className="value">
              <img src="assets/images/users.svg" /> <span>{backer}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="expiry-container">
        <div className="time">
          <span className="iconify" data-icon="fluent:timer-32-regular"></span> Ended on 01/11/22
        </div>
        <div className="update">
          <span>more Update</span> <br />
          {">>>"}
        </div>
      </div>
    </div>
  );
};

export default PrevListBox;
