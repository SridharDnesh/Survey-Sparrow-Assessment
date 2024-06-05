export const generateRandomList = (size) => {
  if (!size) {
    throw new Error(
      "parameter size should be passed to generate a random list"
    );
  }

  return new Array(size)
    .fill(0)
    .map(() => Math.floor(Math.random() * (size * 10)) + 1);
};

export const calculatePercentage = (partialValue, totalValue) => {
  return (partialValue / totalValue) * 100;
};

export const isSorted = (list) => {
  // Check if the array is sorted in non-decreasing order
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] > list[i + 1]) {
      return false;
    }
  }
  return true;
};

export const shuffleArray = (list) => {
  for (let i = list.length - 1; i > 0; i--) {
    // Generate a random index from 0 to i
    const j = Math.floor(Math.random() * (i + 1));

    // Swap elements at i and j
    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};
