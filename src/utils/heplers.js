export const generateRandomList = (size) => {
  if (!size) {
    throw new Error(
      "parameter size should be passed to generate a random list"
    );
  }

  return new Array(size).fill(0).map(() => Math.floor(Math.random() * 50) + 1);
};
