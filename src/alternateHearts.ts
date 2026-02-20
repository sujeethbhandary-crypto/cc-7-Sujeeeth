import assert from "assert";

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

const pattern =
    `💚
💚 💙
💚 💙 💚
💚 💙 💚 💙
💚 💙 💚 💙 💚
💚 💙 💚 💙 💚 💙`;

assert.strictEqual(alternateHearts(6), pattern);

console.log("Assertion tests passed!");