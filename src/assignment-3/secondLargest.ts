import assert from "node:assert";

/**
 * Finds the second largest number using forEach.
 *
 * @param arr - Array of numbers
 * @returns Second largest number
 */
const findSecondLargestForEach = (arr: number[]): number => {
  let largest: number = -Infinity;
  let secondLargest: number = -Infinity;

  for (let num of arr) {
    if (num > largest) {
      secondLargest = largest;
      largest = num;
    } else if (num > secondLargest && num !== largest) {
      secondLargest = num;
    }
  }

  return secondLargest;
};

const numbers: number[] = [10, 16, 19, 25, 15];

const result1: number = findSecondLargestForEach(numbers);
// console.log(result1);

assert.strictEqual(result1, 19);

/**
 * Finds the second largest number using reduce.
 *
 * @param arr - Array of numbers
 * @returns Second largest number
 */
const findSecondLargestReduce = (arr: number[]): number => {
  return arr.reduce(
    (acc, num) => {
      if (num > acc.largest) {
        return {
          largest: num,
          secondLargest: acc.largest,
        };
      }

      if (num > acc.secondLargest && num !== acc.largest) {
        return {
          largest: acc.largest,
          secondLargest: num,
        };
      }

      return acc;
    },
    { largest: -Infinity, secondLargest: -Infinity },
  ).secondLargest;
};

const result2: number = findSecondLargestReduce(numbers);
//console.log(result2);

assert.strictEqual(result2, 19);
assert.strictEqual(findSecondLargestForEach([-5, -2, -10, -1]), -2);
assert.strictEqual(findSecondLargestReduce([-5, -2, -10, -1]), -2);
