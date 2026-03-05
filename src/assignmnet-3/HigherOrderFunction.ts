import assert from "assert";

/**
 * Creates a cutoff checker function.
 *
 * @param cutOffValue - The maximum allowed number (inclusive).
 * @returns A function that takes a number and returns true
 *          if the number is less than or equal to the cutoff value,
 *          otherwise false.
 */
const createCutOff =
  (cutOffValue: number) =>
  (num: number): boolean =>
    num <= cutOffValue;

// Tests
const cutOff100 = createCutOff(100);
assert.equal(cutOff100(89), true);
assert.equal(cutOff100(189), false);
assert.equal(cutOff100(100), true);
assert.equal(cutOff100(0), true);
assert.equal(cutOff100(-10), true);
