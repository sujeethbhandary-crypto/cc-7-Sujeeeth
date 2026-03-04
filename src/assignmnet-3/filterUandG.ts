import assert from "node:assert";

/**
 * Filters items that:
 * - do NOT contain "u"
 *   OR
 * - contain "g"
 */
const items = ["browl", "faaast", "energy", "stand", "eat", "lunch"];

const filterUAndG = items.filter(
  (item) => !item.includes("u") || item.includes("g"),
);

assert.deepStrictEqual(filterUAndG, [
  "browl",
  "faaast",
  "energy",
  "stand",
  "eat",
]);
