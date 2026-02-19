import assert from "assert";

/**
 * Generates a heart pattern with alternating green and blue hearts.
 *
 * Each line increases the number of hearts by one.
 * Hearts alternate starting with 💚 on every line.
 *
 * @param lines - The number of lines to generate in the pattern.
 * @returns A string containing the alternating heart pattern separated by new lines.
 */
function alternateHearts(lines: number): string {
    let result = "";

    for (let i = 1; i <= lines; i++) {
        let line = "";

        for (let j = 1; j <= i; j++) {
            if (j % 2 === 1) {
                line += "💚 ";
            } else {
                line += "💙 ";
            }
        }

        result += line.trim();

        if (i !== lines) {
            result += "\n";
        }
    }

    return result;
}

// Pattern for 6 lines
const pattern6 =
`💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙`;

assert.strictEqual(
    alternateHearts(6),
    pattern6,
    "Generates correct pattern for 6 lines"
);

//  Additional Pattern 1: 3 lines
const pattern3 =
`💚
💚 💙
💚 💙 💚`;

assert.strictEqual(
    alternateHearts(3),
    pattern3,
    "Generates correct pattern for 3 lines"
);

//  Additional Pattern 2: 1 line
const pattern1 = `💚`;

assert.strictEqual(
    alternateHearts(1),
    pattern1,
    "Generates correct pattern for 1 line"
);

