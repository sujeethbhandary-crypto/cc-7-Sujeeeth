import assert from "node:assert";
function addArrays(a: number[], b: number[]) {
    let result: number[] = [];
    let maxLength = Math.max(a.length, b.length);
    for (let i = 0; i < maxLength; i++) {
        let valueA = a[i] ?? 0;
        let valueB = b[i] ?? 0;
        result[i] = valueA + valueB;
    }
    return result;
}
assert.deepStrictEqual(addArrays([2, 3, 5], [5, 6, 4]), [7, 9, 9]);
assert.deepStrictEqual(addArrays([2, 2], [4, 5, 6]), [6, 7, 6]);
assert.deepStrictEqual(addArrays([4, 5, 5], []), [4, 5, 5]);

console.log("passed");