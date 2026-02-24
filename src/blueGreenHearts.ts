import assert from "assert";

/**
 * Generates a pattern of hearts where:
 * - Odd lines contain 💚 repeated i times
 * - Even lines contain 💙 repeated i times
 *
 * @param lines - Number of lines in the pattern
 * @returns A multi-line string representing the heart pattern
 *
 * @example
 * blueGreenHeartPattern(3);
 * // 💚
 * // 💙 💙
 * // 💚 💚 💚
 */
function blueGreenHeartPattern(lines: number): string {
    let result = "";

    for (let i = 1; i <= lines; i++) {
        const heart = (i % 2 === 1) ? "💚" : "💙";
        result += (heart + " ").repeat(i).trim() + "\n";
    }

    return result.trim();
}

//  Pattern for 5 lines
const pattern5 =
`💚
💙 💙
💚 💚 💚
💙 💙 💙 💙
💚 💚 💚 💚 💚`;

assert.strictEqual(
    blueGreenHeartPattern(5),
    pattern5,
    "Generates correct pattern for 5 lines"
);

//  Additional Pattern 1: 3 lines
const pattern3 =
`💚
💙 💙
💚 💚 💚`;

assert.strictEqual(
    blueGreenHeartPattern(3),
    pattern3,
    "Generates correct pattern for 3 lines"
);

//  Additional Pattern 2: 1 line
assert.strictEqual(
    blueGreenHeartPattern(1),
    "💚",
    "Generates correct pattern for single line"
);

//  Edge case: 0 lines
assert.strictEqual(
    blueGreenHeartPattern(0),
    "",
    "Returns empty string for 0 lines"
);

