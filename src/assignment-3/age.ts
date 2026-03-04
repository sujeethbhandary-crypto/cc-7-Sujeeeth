import assert from "node:assert";

/**
 * List of people with their name and age.
 *
 */
const people = [
  { name: "John", age: 13 },
  { name: "Mark", age: 56 },
  { name: "Rachel", age: 45 },
  { name: "Nate", age: 67 },
  { name: "Jeniffer", age: 65 },
];

/**
 * Extracts the ages from the people array.
 *
 */
const age = people.map((obj) => obj.age);

assert.deepStrictEqual(age, [13, 56, 45, 67, 65]);
