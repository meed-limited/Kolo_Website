export const isProdEnv = process.env.REACT_APP_ENVIRONMENT === "production" ? true : false;

// Providers
export const BNB_PROVIDER = process.env.REACT_APP_NODE_BNB;
export const BNB_TEST_PROVIDER = process.env.REACT_APP_NODE_BNB_TEST;
export const POLYGON_PROVIDER = process.env.REACT_APP_NODE_POLYGON;
export const MUMBAI_PROVIDER = process.env.REACT_APP_NODE_POLYGON_MUMBAI;

// Contract Addresses in Production
export const LPR_TOKEN = "0x91191A15E778d46255FC9AcD37D028228D97e786";
export const DAO_CONTRACT = "";

// Contract Addresses in Development
export const TOKEN_TEST = "0xE413Bfbc963fdB56Fe12A2501aa58cD4913553ef";
export const DAO_CONTRACT_TEST = "";

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
