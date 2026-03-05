import assert from "assert";

/**
 * Replaces "CraftCode" with "CodeCraft"
 * in each string of the array.
 */
const strings = [
  "CraftCode is a nice company",
  "We love CraftCode",
  "We are working in CraftCode",
  "Where is CraftCode?",
];

const stringRearrange = strings.map((str) =>
  str.replace("CraftCode", "CodeCraft"),
);

assert.deepStrictEqual(stringRearrange, [
  "CodeCraft is a nice company",
  "We love CodeCraft",
  "We are working in CodeCraft",
  "Where is CodeCraft?",
]);
