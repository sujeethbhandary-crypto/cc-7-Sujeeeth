import assert from "node:assert";
function lengthOfString(str: string) {
    let count = 0;
    for (let char of str) {
        count++;
    }
    return count;
}
assert.strictEqual(lengthOfString('one world'), 9);

console.log("passed asset");