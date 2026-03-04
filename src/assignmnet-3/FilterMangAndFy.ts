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
  (item) =>
    item.substring(0, 4) !== "mang" && item.substring(item.length - 2) !== "fy",
);

assert.deepStrictEqual(filterMangOrFy, ["semangin", "2 lonely", "notifyy"]);
