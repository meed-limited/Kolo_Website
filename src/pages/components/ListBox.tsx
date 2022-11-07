import React from "react";

interface ListBoxProps {
  imagePath: string;
  title: string;
  detail: string;
  objective: string;
  backer: string;
  rank: number;
}

const ListBox: React.FC<ListBoxProps> = ({ imagePath, title, detail, objective, backer, rank }: ListBoxProps) => {
  return (
    <div className="list-box">
      <div className="image-container">
        <img src={imagePath} alt={title} />
      </div>
      <div className="content">
        <div className="title">{title}</div>
        <div className="details">{detail}</div>
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
      <div className="rank-container">
        <div className="rank">#{rank}</div>
        <div className="rank-icon">{">>>"}</div>
      </div>
    </div>
  );
};

export default ListBox;
