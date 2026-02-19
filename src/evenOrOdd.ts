import assert from "assert";

/**
 * Generates a comma-separated string of the first `n` even or odd numbers.
 *
 * @param n - The count of numbers to generate.
 * @param evenOrOdd - Determines whether to generate "even" or "odd" numbers.
 * @returns A string containing the generated numbers separated by commas.
 */
function printNumbers(n: number, evenOrOdd: "even" | "odd"): string {
    let result: number[] = [];
    let num: number;

    if (evenOrOdd === "even") {
        num = 2;
    } else {
        num = 1;
    }

    for (let i = 0; i < n; i++) {
        result.push(num);
        num = num + 2;
    }

    return result.join(", ");
}

assert.strictEqual(printNumbers(4, "odd"), "1, 3, 5, 7");
assert.strictEqual(printNumbers(5, "even"), "2, 4, 6, 8, 10");
assert.strictEqual(
    printNumbers(3, "odd"),
    "1, 3, 5, 7",
    "Failed: Incorrect expected output for 3 odd numbers"
);