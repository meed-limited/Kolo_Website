import { Provider, Signer } from "@wagmi/core";
import { signERC2612Permit } from "eth-permit";
import { ethers } from "ethers";

import Ballot_ABI from "./abis/Ballot_ABI.json";
import Token_ABI from "./abis/Token_ABI.json";
import { getBallotAddress, getTokenAddress } from "./constants";

const token = getTokenAddress();
const ballot = getBallotAddress();

/* Get the name of a specific Token/NFT :
 ****************************************/
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

/* Get the balance of a specific user address :
 ***********************************************/
export const getTokenBalance = async (provider: any, address: string): Promise<string | undefined> => {
  const tokenInstance = new ethers.Contract(token, Token_ABI, provider);

  try {
    const balance = await tokenInstance.balanceOf(address);
    return balance;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Get a user vote's weight :
 *****************************/
export const getVoteWeight = async (
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): Promise<string | undefined> => {
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  try {
    const balance = await ballotInstance.voteWeight(address);
    return balance;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Get the current poll id :
 *****************************/
export const getCurrentPollId = async (
  provider: ethers.providers.Web3Provider | undefined
): Promise<string | undefined> => {
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  try {
    const pollId = await ballotInstance.currentPollId();
    return pollId;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Check if the contract is currently accepting proposals :
 ***********************************************************/
export const isAcceptingProposals = async (
  provider: ethers.providers.Web3Provider | undefined
): Promise<string | undefined> => {
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  try {
    const accepting = await ballotInstance.isAcceptingProposals();
    return accepting;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Check if the poll is currently opened :
 *******************************************/
export const isPollOpened = async (
  provider: ethers.providers.Web3Provider | undefined
): Promise<string | undefined> => {
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  try {
    const opened = await ballotInstance.isPollOpened();
    return opened;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Check if the poll is currently opened :
 *******************************************/
export const submitProposal = async (
  provider: Signer | Provider | undefined,
  title: string
): Promise<string | undefined> => {
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  try {
    const tx = await ballotInstance.submitProject(title);
    const receipt = await tx.wait();
    return receipt;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Sign an approval from user :
 *******************************/

export const signApproval = async (
  provider: Signer | Provider | undefined,
  address: string,
  amount: number
): Promise<{
  success: boolean;
  data: unknown;
}> => {
  const tokenInstance = new ethers.Contract(token, Token_ABI, provider);
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  const amoutToBN = ethers.utils.parseUnits(amount.toString(), 18);
  const deadline = 100000000000000;
  const nonce = await tokenInstance.nonces(address);

  try {
    const result = await signERC2612Permit(
      provider,
      tokenInstance.address,
      address,
      ballotInstance.address,
      amoutToBN.toString(),
      deadline,
      parseInt(nonce)
    );
    console.log("Result: ", result);
    return { success: true, data: result };
  } catch (error) {
    console.log("Error: ", error);
    return { success: false, data: error };
  }
};

// try {
//   const tx = await tokenInstance.permit(
//     address,
//     ballotInstance.address,
//     amoutToBN,
//     result.deadline,
//     result.v,
//     result.r,
//     result.s
//   );

//   const receipt = await tx.wait();
//   console.log("Receipt: ", receipt);

//   // Check allowance:
//   const allowance = await tokenInstance.allowance(address, ballotInstance.address);
//   console.log("Allowance:", parseInt(allowance));

//   return receipt;
// } catch (error) {
//   console.log(error);
//   return undefined;
// }
