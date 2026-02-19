import assert from "node:assert";
function generateSquares(n: number) {
    let result: number[] = [];
    for (let i = 0; i < n; i++) {
        result[i] = (i + 1) * (i + 1);
    }
    return result;
}
assert.deepStrictEqual(generateSquares(4), [1, 4, 9, 16]);

console.log("passed");