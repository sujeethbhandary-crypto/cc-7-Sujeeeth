import assert from "node:assert";

/**
 * Generates the Fibonacci number at a given index.
 *
 * @param {number} n - The index in the Fibonacci sequence.
 * @returns {number} Fibonacci value at index n.
 */
const fibonaci = (n: number): number => {
  if (n === 0) return 0;
  if (n === 1) return 1;

  let a: number = 0;
  let b: number = 1;

  for (let i: number = 2; i <= n; i++) {
    let temp: number = a + b;
    a = b;
    b = temp;
  }

  return b;
};

/**
 * List of indices for which Fibonacci numbers should be generated.
 *
 * @type {number[]}
 */
const values: number[] = [2, 1, 5, 7];

/**
 * Generates Fibonacci numbers for each index in the values array.
 *
 * @type {number[]}
 */
const generateFibonaci: number[] = values.map((index) => fibonaci(index));

// console.log(generateFibonaci);
assert.deepStrictEqual(generateFibonaci, [1, 1, 5, 13]);
