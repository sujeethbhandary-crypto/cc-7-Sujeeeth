import assert from "assert";

/**
 * Checks if at least one item in the array satisfies the predicate.
 */
function some<T>(items: T[], predicate: (item: T) => boolean): boolean {
  for (const item of items) {
    if (predicate(item)) {
      return true;
    }
  }
  return false;
}

const numbers = [1, 5, 8, 12];

const result = some(numbers, (n) => n % 2 === 0);

assert.strictEqual(result, true);

/**
 * Implementation of `some` using Array.reduce.
 */
function someReduce<T>(items: T[], predicate: (item: T) => boolean): boolean {
  return items.reduce((acc, item) => {
    return acc || predicate(item);
  }, false);
}

const numbers2 = [1, 3, 5, 8];

const resultOfReduce = someReduce(numbers2, (num) => num % 2 === 0);

assert.strictEqual(resultOfReduce, true);
