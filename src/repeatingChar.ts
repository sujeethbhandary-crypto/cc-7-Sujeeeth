import assert from "assert";

/**
 * Returns a substring from the beginning of the input string
 * until a character repeats for the first time.
 *
 * @param str - The input string to process.
 * @returns A substring containing unique characters until a repeat is found.
 */
function getStringSpecial(str: string): string {
  let result = "";
  for (let i = 0; i < str.length; i++) {
    const currentChar = str.charAt(i);
    if (result.includes(currentChar)) {
      break;
    }
    result += currentChar;
  }
  return result;
}

// Correct Assertions
assert.strictEqual(getStringSpecial("a dream that is"), "a dre");
assert.strictEqual(getStringSpecial("unparliamentary"), "unparli");

//  Wrong Assertion
assert.strictEqual(
  getStringSpecial("hello"),
  "hell",
  "Failed: Incorrect expected substring for input 'hello'",
);
