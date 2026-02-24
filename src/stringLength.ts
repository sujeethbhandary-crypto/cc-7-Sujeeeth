import assert from "node:assert";

/**
 * Calculates the length of a string without using the built-in `.length` property.
 * 
 * Iterates through each character (Unicode-aware using for...of)
 * and counts them manually.
 *
 * @param str - The input string whose length needs to be calculated.
 * @returns The total number of characters in the string.
 */
function lengthOfString(str: string): number {
    let count = 0;
    for (let char of str) {
        count++;
    }
    console.log([...str].length);
    console.log(count);
    return count;
}
assert.strictEqual(lengthOfString('one world'), 9);
assert.strictEqual(lengthOfString('one world😂'), 10);
