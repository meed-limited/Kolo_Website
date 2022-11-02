export const isProdEnv = process.env.REACT_APP_ENVIRONMENT === "production" ? true : false;

// Providers
export const POLYGON_PROVIDER = process.env.REACT_APP_NODE_POLYGON;
export const MUMBAI_PROVIDER = process.env.REACT_APP_NODE_POLYGON_MUMBAI;
export const FANTOM_PROVIDER = process.env.REACT_APP_NODE_FANTOM;
export const FANTOM_TEST_PROVIDER = process.env.REACT_APP_NODE_FANTOM_TEST;
export const BNB_PROVIDER = process.env.REACT_APP_NODE_BNB;
export const BNB_TEST_PROVIDER = process.env.REACT_APP_NODE_BNB_TEST;

// Contract Addresses in Production
export const LPR_TOKEN = "0x91191A15E778d46255FC9AcD37D028228D97e786";
export const DAO_CONTRACT = "";
export const BALLOT_CONTRACT = "";

// Contract Addresses in Development
export const TOKEN_TEST = "0xE413Bfbc963fdB56Fe12A2501aa58cD4913553ef";
export const DAO_CONTRACT_TEST = "";
export const BALLOT_CONTRACT_TEST = "0xf87bf9c061CdD62554b64cd766d9dB9fbd883F88";

/* Getter functions:
 *********************/

export const getProvider = () => {
  if (isProdEnv) {
    return BNB_PROVIDER;
  } else return BNB_TEST_PROVIDER;
};

export const getTokenAddress = () => {
  if (isProdEnv) {
    return LPR_TOKEN;
  } else return TOKEN_TEST;
};
