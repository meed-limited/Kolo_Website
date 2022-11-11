import React from "react";

interface LandingDetailProps {
  title: string;
  description: string;
  imagePath: string;
  isReversed: boolean;
}

const LandingDetail: React.FC<LandingDetailProps> = ({ title, description, imagePath, isReversed }) => {
  return (
    <div className={isReversed ? "landing-detail-wrapper reverse" : "landing-detail-wrapper"}>
      <div className="detail">
        <div className="key">{title}</div>
        <div className="value">{description}</div>
      </div>
      <img src={`assets/images/${imagePath}`} />
    </div>
  );
};

export default LandingDetail;
