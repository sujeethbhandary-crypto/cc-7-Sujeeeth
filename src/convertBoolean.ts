import assert from "assert";

function convertToBinary(numInDecimal: number): string {
    if (numInDecimal === 0) return "0";

    let result = "";
    let n = numInDecimal;

    while (n > 0) {
        const remainder = n % 2;
        result = remainder + result;
        n = Math.floor(n / 2);
    }

    return result;
}

assert.strictEqual(convertToBinary(10), "1010");
assert.strictEqual(convertToBinary(1000), "1111101000");
assert.strictEqual(convertToBinary(8), "1000");
assert.strictEqual(convertToBinary(16), "10000");
assert.strictEqual(convertToBinary(255), "11111111");
assert.strictEqual(convertToBinary(1024), "10000000000");


