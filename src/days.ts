import assert from "assert";

/**
 * Converts a day name into its numeric representation.
 * 
 * It takes the first three letters of the input,
 * converts them to lowercase, and matches them
 * to a predefined day-number mapping.
 * 
 * 0 = Sunday
 * 1 = Monday
 * 2 = Tuesday
 * 3 = Wednesday
 * 4 = Thursday
 * 5 = Friday
 * 6 = Saturday
 *
 * @param dayName - The full or partial name of the day (e.g., "Monday", "Tue")
 * @returns The corresponding day number (0–6), or -1 if invalid
 */

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
        //console.log(num[day])
        return num[day];
    }
    

    return -1;
}

assert.strictEqual(getDayOfWeek("Monday"), 1);
assert.strictEqual(getDayOfWeek("Tuesday"), 2);
assert.strictEqual(getDayOfWeek("January"),-1);

