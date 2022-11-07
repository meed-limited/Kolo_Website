import { isProdEnv } from "../../web3/constants";
import { chains } from "../../web3/network";

export const menu = isProdEnv ? chains.filter((chain) => !chain.testnet) : chains.filter((chain) => chain.testnet);

export const menuItems = () => {
  const items = menu.map((item) => {
    return {
      key: item.id,
      value: item.name,
      icon: item.logo,
      label: item.name
    };
  });

  return items;
};
