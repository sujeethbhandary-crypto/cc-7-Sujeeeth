import assert from "node:assert";

/**
 * Adds two number arrays element by element.
 * 
 * If one array is longer than the other,
 * the missing values are treated as 0.
 *
 * Example:
 * addArrays([2, 3], [4]) → [6, 3]
 *
 * @param a - First array of numbers
 * @param b - Second array of numbers
 * @returns A new array containing the sum of corresponding elements
 */
function addArrays(a: number[], b: number[]): number[] {
    const result: number[] = [];
    const maxLength = Math.max(a.length, b.length);

    for (let i = 0; i < maxLength; i++) {
        // If index does not exist, use 0 as default
        const valueA = a[i] ?? 0;
        const valueB = b[i] ?? 0;

        result[i] = valueA + valueB;
    }

    return result;
}

assert.deepStrictEqual(addArrays([2, 3, 5], [5, 6, 4]), [7, 9, 9]);
assert.deepStrictEqual(addArrays([2, 2], [4, 5, 6]), [6, 7, 6]);
assert.deepStrictEqual(addArrays([4, 5, 5], []), [4, 5, 5]);
assert.deepStrictEqual(addArrays([1, 2], [3, 4]),[4, 6]);