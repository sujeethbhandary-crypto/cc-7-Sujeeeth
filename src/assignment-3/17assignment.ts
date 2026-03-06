import assert from "node:assert";

/**
 * Generating all lowercase alphabets (a-z)
 */
const alphabets = Array.from({ length: 26 }, (_, i) =>
  String.fromCharCode(97 + i),
);
/**
 * Separating alphabets into vowels and consonants
 */
const result = alphabets.reduce(
  (acc, letter) => {
    const vowels = ["a", "e", "i", "o", "u"];
    if (vowels.includes(letter)) {
      acc.vowels.push(letter);
    } else {
      acc.consonants.push(letter);
    }
    return acc;
  },
  { vowels: [] as string[], consonants: [] as string[] },
);
/**assert */
assert.deepStrictEqual(result, {
  vowels: ["a", "e", "i", "o", "u"],
  consonants: [
    "b",
    "c",
    "d",
    "f",
    "g",
    "h",
    "j",
    "k",
    "l",
    "m",
    "n",
    "p",
    "q",
    "r",
    "s",
    "t",
    "v",
    "w",
    "x",
    "y",
    "z",
  ],
});
