import { ethers } from "ethers";

import Token_ABI from "./abis/Token_ABI.json";
import { getTokenAddress } from "./constants";

// import { getTokenAddress } from "../data/constants";

const token = getTokenAddress();

/* Get the name of a specific NFT :
 ************************************/
export const getTokenName = async (
  provider: ethers.providers.Web3Provider | undefined
): Promise<string | undefined> => {
  const tokenInstance = new ethers.Contract(token, Token_ABI, provider);

  try {
    const symbol = await tokenInstance.symbol();
    return symbol;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
