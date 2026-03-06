import assert from "node:assert";

const n = 10;

/**
 * creating first n natural numbers
 */
const numbers = [...Array(n)].map((_, i) => i + 1);

/**
 * grouping odd and even numbers
 */
const grouped = numbers.reduce(
  (acc: { odd: number[]; even: number[] }, num: number) => {
    if (num % 2 === 0) {
      acc.even.push(num);
    } else {
      acc.odd.push(num);
    }
    return acc;
  },
  { odd: [], even: [] },
);

/**
 * converting arrays to sums
 */
const summed = {
  odd: grouped.odd.reduce((sum, num) => sum + num, 0),
  even: grouped.even.reduce((sum, num) => sum + num, 0),
};

assert.deepStrictEqual(summed, { odd: 25, even: 30 });
