import React from "react";

interface WalletBoxProps {
  name: string;
  imagePath: string;
}

const WalletBox: React.FC<WalletBoxProps> = ({ name, imagePath }: WalletBoxProps) => {
  return (
    <div className="box-wrapper">
      <div className="name">{name}</div>
      <img src={imagePath} alt={name} />
    </div>
  );
};

export default WalletBox;
