import { Dropdown, DropdownButton } from "react-bootstrap";
import { useAccount, useNetwork, useSwitchNetwork } from "wagmi";

import { menuItems } from "./chains";

const ChainSelector = () => {
  const { isConnected } = useAccount();
  const { chain } = useNetwork();
  const { switchNetwork } = useSwitchNetwork();

  const getTitle = () => {
    const selected = menuItems().find((item) => item.key === chain?.id);
    if (selected) {
      return (
        <>
          <img src={`${selected.icon}`} alt={`${selected.value}_icon`} width={"24px"} height={"24px"} />{" "}
          {selected.value}
        </>
      );
    }
    return "Select Chain";
  };

  const handleMenuClick = (e: string | null) => {
    console.log("switch to: ", e);
    if (e) {
      switchNetwork?.(parseInt(e));
      window.location.reload();
    }
  };

  return (
    <>
      {isConnected && (
        <Dropdown>
          <DropdownButton id="dropdown-item-button" title={getTitle()} onSelect={(e) => handleMenuClick(e)}>
            {menuItems().map((item, index) => (
              <Dropdown.Item as="button" eventKey={item.key} key={index}>
                <img src={`${item.icon}`} alt={`${item.value}_icon`} width={"24px"} height={"24px"} /> {item.value}
              </Dropdown.Item>
            ))}
          </DropdownButton>
        </Dropdown>
      )}
    </>
  );
};

export default ChainSelector;
