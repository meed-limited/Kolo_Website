export const isProdEnv = process.env.REACT_APP_ENVIRONMENT === "production" ? true : false;

// Providers
export const POLYGON_PROVIDER = process.env.REACT_APP_NODE_POLYGON;
export const MUMBAI_PROVIDER = process.env.REACT_APP_NODE_POLYGON_MUMBAI;
export const FANTOM_PROVIDER = process.env.REACT_APP_NODE_FANTOM;
export const FANTOM_TEST_PROVIDER = process.env.REACT_APP_NODE_FANTOM_TEST;
export const BNB_PROVIDER = process.env.REACT_APP_NODE_BNB;
export const BNB_TEST_PROVIDER = process.env.REACT_APP_NODE_BNB_TEST;

// Contract Addresses in Production
export const TOKEN = "";
export const DAO_CONTRACT = "";
export const BALLOT_CONTRACT = "";

// Contract Addresses in Development
// export const TOKEN_TEST = "0x53FAd67D1A9Be05D2D72d9F2b84D86Ff2CECEd98"; //KOL
export const TOKEN_TEST = "0xB77Cdf9B2E1547c3b9b47744b490Fa4C1Dee7b63";
export const DAO_CONTRACT_TEST = "";
export const BALLOT_CONTRACT_TEST = "0x9fC060dAc748D2B3D44ED3D1354A0d68F9040120";

/* Getter functions:
 *********************/

export const getProvider = () => {
  if (isProdEnv) {
    return BNB_PROVIDER;
  } else return BNB_TEST_PROVIDER;
};

export const getTokenAddress = () => {
  if (isProdEnv) {
    return TOKEN;
  } else return TOKEN_TEST;
};

export const getBallotAddress = () => {
  if (isProdEnv) {
    return BALLOT_CONTRACT;
  } else return BALLOT_CONTRACT_TEST;
};

export const getChainId = () => {
  if (isProdEnv) {
    return 56;
  } else return 97;
};
