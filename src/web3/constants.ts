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
export const BALLOT_CONTRACT = "";

// Contract Addresses in Development
export const TOKEN_TEST = "0x629A92d7940d511F0bEb1495418d0cF6B5Cf5f4e";
export const BALLOT_CONTRACT_TEST = "0x5C9d454995570d37D5354575a4De0Cd75583f157";

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
