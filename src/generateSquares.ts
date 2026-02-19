import assert from "node:assert";

/**
 * Generates an array containing the first `n` perfect square numbers.
 *
 * @param n - The number of square values to generate.
 * @returns An array of square numbers starting from 1² up to n².
 */
function generateSquares(n: number): number[] {
    let result: number[] = [];
    for (let i = 0; i < n; i++) {
        result[i] = (i + 1) * (i + 1);
    }
    return result;
}

// Correct Assertion
assert.deepStrictEqual(generateSquares(4), [1, 4, 9, 16]);

//  Wrong Assertion 
assert.deepStrictEqual(
    generateSquares(3),
    [1, 4, 8], 
    "Failed: Squares for n=3 do not match expected output"
);