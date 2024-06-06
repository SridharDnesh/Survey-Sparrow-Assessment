/**
 * Generates a list of random numbers.
 *
 * @param {number} size - The size of the list to generate.
 * @param {number} maxValue - The maxValue of the list to generate.
 * @returns {number[]} A list of random numbers between 1 and size * 10.
 * @throws {Error} Will throw an error if the size parameter is not provided.
 */
export const generateRandomList = (size, maxValue) => {
  if (!size) {
    throw new Error(
      "parameter size should be passed to generate a random list"
    );
  }

  return new Array(size)
    .fill(0)
    .map(() => Math.floor(Math.random() * maxValue) + 1);
};

/**
 * Calculates the percentage of a partial value relative to a total value.
 *
 * @param {number} partialValue - The partial value.
 * @param {number} totalValue - The total value.
 * @returns {number} The percentage of the partial value relative to the total value.
 */
export const calculatePercentage = (partialValue, totalValue) => {
  return (partialValue / totalValue) * 100;
};

/**
 * Checks if a list is sorted in non-decreasing order.
 *
 * @param {number[]} list - The list to check.
 * @returns {boolean} True if the list is sorted, false otherwise.
 */
export const isSorted = (list) => {
  for (let i = 0; i < list.length - 1; i++) {
    if (list[i] > list[i + 1]) {
      return false;
    }
  }
  return true;
};

/**
 * Shuffles an array in place.
 *
 * @param {number[]} list - The list to shuffle.
 * @returns {number[]} The shuffled list.
 */
export const shuffleArray = (list) => {
  for (let i = list.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [list[i], list[j]] = [list[j], list[i]];
  }
  return list;
};
