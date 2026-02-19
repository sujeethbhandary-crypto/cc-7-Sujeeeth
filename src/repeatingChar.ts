import assert from "assert";
function getStringSpecial(str: string): string {
    let result = "";
    for (let i = 0; i < str.length; i++) {
        let currentChar = str.charAt(i);  
        if (result.includes(currentChar)) {
            break;
        }
        result += currentChar;
    }
    return result;
}
assert.strictEqual(getStringSpecial('a dream that is'), 'a dre');
assert.strictEqual(getStringSpecial('unparliamentary'), 'unparli');

console.log("passed the assert test");