import assert from "assert";

function padZerosBeforeNumber(n: number, size: number): string {
    let str = n.toString();

    if (str.length >= size) {
        return str;
    }

    while (str.length < size) {
        str = "0" + str;
    }

    return str;
}

assert.strictEqual(padZerosBeforeNumber(233, 6), "000233");
assert.strictEqual(padZerosBeforeNumber(333333445, 4), "333333445");

console.log("All tests passed!");
