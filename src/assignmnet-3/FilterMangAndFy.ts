import assert from "node:assert";

/**
 * Filters out strings that:
 * - start with "mang"
 * - end with "fy"
 */
let itemsFilter = [
  "mangalore",
  "semangin",
  "2 lonely",
  "verify",
  "rectify",
  "mangala",
  "notifyy",
];

const filterMangOrFy = itemsFilter.filter(
  (item) => !/^mang/.test(item) && !/fy$/.test(item),
);

assert.deepStrictEqual(filterMangOrFy, ["semangin", "2 lonely", "notifyy"]);
