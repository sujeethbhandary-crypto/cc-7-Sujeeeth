import assert from "assert";

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
    //console.log(result)
    return result.join(", ");
}

assert.strictEqual(printNumbers(4, "odd"), "1, 3, 5, 7");
assert.strictEqual(printNumbers(5, "even"), "2, 4, 6, 8, 10");

console.log("All tests passed!");
