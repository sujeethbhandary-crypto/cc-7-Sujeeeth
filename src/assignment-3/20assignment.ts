import assert from "node:assert";

/**
 * Implementing map using reduce
 */
const map = <T, U>(array: T[], transform: (item: T) => U): U[] => {
  return array.reduce((acc: U[], item) => {
    acc.push(transform(item));
    return acc;
  }, []);
};

/**
 * Implementing filter using reduce
 */
const filter = <T>(array: T[], predicate: (item: T) => boolean): T[] => {
  return array.reduce((acc: T[], item) => {
    if (predicate(item)) {
      acc.push(item);
    }
    return acc;
  }, []);
};

const nums = [1, 2, 3, 4, 5];

const doubled = map(nums, (n) => n * n);
const evens = filter(nums, (n) => n % 2 === 0);

assert.deepStrictEqual(doubled, [1, 4, 9, 16, 25]);
assert.deepStrictEqual(evens, [2, 4]);
