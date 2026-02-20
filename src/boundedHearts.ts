import assert from "assert";

function heartFrame(rows: number): string {
    let result = "";

    for (let i = 1; i <= rows; i++) {
        let line = "";

        for (let j = 1; j <= i; j++) {
            if (i === 1 || i === 2 || i === rows) {
                line += "💚 ";
            }
            else if (j === 1 || j === i) {
                line += "💚 ";
            }
            else {
                line += "💙 ";
            }
        }

        result += line.trim();
        if (i !== rows) result += "\n";
    }
    console.log(result);
    return result;
}

const pattern =
    `💚
💚 💚
💚 💙 💚
💚 💙 💙 💚
💚 💙 💙 💙 💚
💚 💙 💙 💙 💙 💚
💚 💚 💚 💚 💚 💚 💚`;

assert.strictEqual(heartFrame(7), pattern);

console.log("Assertion passed!");