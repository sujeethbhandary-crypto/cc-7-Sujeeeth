import assert from "node:assert";

/**
 * Adds 10 to each number,
 * then keeps numbers divisible by 4.
 */
const numbers = [34, 45, 2, 53, 84, 542, 31, 23];

const filterNumber = numbers
  .map((number) => number + 10)
  .filter((number) => number % 4 === 0);

assert.deepStrictEqual(filterNumber, [44, 12, 552]);
