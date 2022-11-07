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
export const getTokenBalance = async (
  provider: ethers.providers.Web3Provider | undefined,
  address: string
): Promise<string | undefined> => {
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
  provider: ethers.providers.Web3Provider | undefined,
  title: string,
  description: string,
  account: string
): Promise<string | undefined> => {
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  try {
    const receipt = await ballotInstance.submitProposal(title, description, account);
    return receipt;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};

/* Sign an approval from user :
 *******************************/
// export const signApproval = async (
//   provider: ethers.providers.Web3Provider | undefined,
//   address: string,
//   amount: number,
//   chainId: number
// ): Promise<string | undefined> => {
//   const tokenInstance = new ethers.Contract(token, Token_ABI, provider);
//   const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

//   const name = await tokenInstance.name();
//   const signer = provider?.getSigner(address);

//   // Create the approval request
//   const amoutToBN = ethers.utils.parseUnits(amount.toString(), 18);
//   const approve = {
//     owner: address,
//     spender: ballotInstance.address,
//     value: amoutToBN
//   };

//   const deadline = 100000000000000;
//   const nonce = await tokenInstance.nonces(address);
//   const digest = getPermitDigest(name, tokenInstance.address, chainId, approve, nonce, deadline);

//   const { v, r, s } = sign(digest, signer);

//   try {
//     const receipt = await tokenInstance.permit(approve.owner, approve.spender, approve.value, deadline, v, r, s);

//     // To make sure:
//     const allowance = await tokenInstance.allowance(address, tokenInstance.address);
//     console.log(allowance);
//     return receipt;
//   } catch (error) {
//     console.log(error);
//     return undefined;
//   }
// };

export const signApproval = async (
  provider: ethers.providers.Web3Provider | undefined,
  address: string,
  amount: number
): Promise<string | undefined> => {
  const tokenInstance = new ethers.Contract(token, Token_ABI, provider);
  const ballotInstance = new ethers.Contract(ballot, Ballot_ABI, provider);

  //const amoutToBN = ethers.utils.parseUnits(amount.toString(), 18);
  const deadline = 100000000000000;
  const nonce = await tokenInstance.nonces(address);
  const allowanceAmount = amount * 10 ** 18;

  // const name = await tokenInstance.name();
  const signer = provider?.getSigner(address);

  // Create the approval request
  // const approve = {
  //   owner: address,
  //   spender: ballotInstance.address,
  //   value: amoutToBN
  // };

  // const digest = getPermitDigest(name, tokenInstance.address, chainId, approve, nonce, deadline);

  // const { v, r, s } = sign(digest, signer);

  const result = await signERC2612Permit(
    // window.ethereum,
    signer,
    tokenInstance.address,
    address,
    ballotInstance.address,
    allowanceAmount,
    deadline,
    nonce
  );

  // const txParams = {
  //   nonce: nonce,
  //   gasLimit: 80000,
  //   to: tokenInstance.address,
  //   data: tokenInstance
  //     .permit(address, ballotInstance.address, amoutToBN, result.deadline, result.v, result.r, result.s)
  //     .encodeABI()
  // };

  try {
    // const receipt = await tokenInstance.permit(approve.owner, approve.spender, approve.value, deadline, v, r, s);
    const receipt = await tokenInstance
      .permit(address, ballotInstance.address, allowanceAmount, result.deadline, result.v, result.r, result.s)
      .send({
        from: address
      });

    // To make sure:
    const allowance = await tokenInstance.allowance(address, tokenInstance.address);
    console.log(allowance);
    return receipt;
  } catch (error) {
    console.log(error);
    return undefined;
  }
};
