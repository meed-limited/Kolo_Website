import { useEffect, useState } from "react";

import { OverlayTrigger, Placeholder, Tooltip } from "react-bootstrap";

import { AddressProps } from "../../../types";
import { getEllipsisTxt } from "../../utils/formatters";

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

  if (address === undefined) return <Placeholder paragraph={{ rows: 1, width: "100%" }} title={false} active />;

  const Copy = () => (
    <OverlayTrigger key="top" placement="top" overlay={<Tooltip>Copy Address!</Tooltip>}>
      <img
        src="assets/images/copy.png"
        alt="copy_button"
        style={{ cursor: "pointer" }}
        onClick={() => {
          navigator.clipboard.writeText(address);
          setIsClicked(true);
        }}
      />
    </OverlayTrigger>
  );

  return (
    <div className="disconnect-wallet-card-address" style={{ ...props.style }}>
      <p style={{ paddingTop: "17px", paddingRight: "10px" }}>
        {props.size ? getEllipsisTxt(address, props.size) : address}
      </p>

      {props.copyable && (isClicked ? <Check /> : <Copy />)}
    </div>
  );
};

export default Address;
const Check = () => (
  <OverlayTrigger key="top" placement="top" overlay={<Tooltip>Copied!</Tooltip>}>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="green" viewBox="0 0 16 16">
      <path d="M13.854 3.646a.5.5 0 0 1 0 .708l-7 7a.5.5 0 0 1-.708 0l-3.5-3.5a.5.5 0 1 1 .708-.708L6.5 10.293l6.646-6.647a.5.5 0 0 1 .708 0z" />
    </svg>
  </OverlayTrigger>
);
