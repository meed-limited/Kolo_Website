const random = () => {
  return Math.random().toString(36).substr(2);
};

export const getObjectId = () => {
  return random() + random();
};
