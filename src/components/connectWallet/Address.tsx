import { useEffect, useState } from "react";

import { Skeleton, Tooltip } from "antd";

import { AddressProps } from "../../../types";
import { getEllipsisTxt } from "../../utils/formatters";

const styles = {
  address: {
    height: "36px",
    display: "flex",
    gap: "5px",
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: "9px",
    alignItems: "center"
  }
};

const Address: React.FC<AddressProps> = (props) => {
  const [address, setAddress] = useState<string>();
  const [isClicked, setIsClicked] = useState<boolean>(false);

  useEffect(() => {
    if (props.account !== undefined) setAddress(props.account);
  }, [props.account]);

  useEffect(() => {
    if (isClicked === true)
      setTimeout(() => {
        setIsClicked(false);
      }, 10000);
  }, [isClicked]);

  if (address === undefined) return <Skeleton paragraph={{ rows: 1, width: "100%" }} title={false} active />;

  const Copy = () => (
    <Tooltip title="Copy Address">
      <img
        src="/images/LogoAndIcons/copy.png"
        alt="copy_button"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigator.clipboard.writeText(address);
          setIsClicked(true);
        }}
      />
    </Tooltip>
  );

  return (
    <div style={{ ...styles.address, ...props.style }}>
      <p style={{ paddingTop: "17px", paddingRight: "10px" }}>
        {props.size ? getEllipsisTxt(address, props.size) : address}
      </p>

      {props.copyable && (isClicked ? <Check /> : <Copy />)}
    </div>
  );
};

export default Address;

const Check = () => (
  <Tooltip title="Copied!">
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      strokeWidth="3"
      stroke="#21BF96"
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path stroke="none" d="M0 0h24v24H0z" fill="none" />
      <path d="M5 12l5 5l10 -10" />
      <title id="copied-address">Copied!</title>
    </svg>
  </Tooltip>
);
