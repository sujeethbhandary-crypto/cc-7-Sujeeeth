import assert from "assert";

function getDayOfWeek(dayName: string): number | undefined {
    let day = dayName.slice(0, 3).toLowerCase();

    const num: { [key: string]: number } = {
        sun: 0,
        mon: 1,
        tue: 2,
        wed: 3,
        thu: 4,
        fri: 5,
        sat: 6
    };


    if (day in num) {
        return num[day];
    }

    return -1;
}

assert.strictEqual(getDayOfWeek("Monday"), 1);
assert.strictEqual(getDayOfWeek("Mon"), 1);

console.log("Passed asserts");