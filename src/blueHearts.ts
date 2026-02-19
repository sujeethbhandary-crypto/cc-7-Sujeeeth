import assert from "assert";

function blueHeart(lines: number): string {
    let result = "";

    for (let i = 1; i <= lines; i++) {
        result += "💙 ".repeat(i).trim() + "\n";
    }
    //git console.log(result)
    return result.trim();
}

const pattern =
    `💙
💙 💙
💙 💙 💙
💙 💙 💙 💙
💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙
💙 💙 💙 💙 💙 💙 💙 💙`;

assert.strictEqual(blueHeart(8), pattern);
console.log("Tests passed");