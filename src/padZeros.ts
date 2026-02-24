import assert from "assert";

/**
 * Pads a number with leading zeros until it reaches the specified size.
 *
 * If the number's length is already greater than or equal to the given size,
 * the original number (as a string) is returned unchanged.
 *
 * @param n - The number to pad with leading zeros.
 * @param size - The desired total length of the resulting string.
 * @returns A string representation of the number padded with leading zeros.
 *
 * @example
 * padZerosBeforeNumber(233, 6); // "000233"
 * padZerosBeforeNumber(1234, 4); // "1234"
 */
function padZerosBeforeNumber(n: number, size: number): string {
    let str = n.toString();

    if (str.length >= size) {
        return str;
    }

    while (str.length < size) {
        str = "0" + str;
    }

    return str;
}

// Test 1: Should add leading zeros when number length is smaller than size
assert.strictEqual(
    padZerosBeforeNumber(233, 6),
    "000233",
    "Adds leading zeros to make total length equal to size"
);

// Test 2: Should return original number if length is already greater than size
assert.strictEqual(
    padZerosBeforeNumber(333333445, 4),
    "333333445",
    "Does not trim number if length exceeds size"
);

// Test 3: Edge case – size equal to number length
assert.strictEqual(
    padZerosBeforeNumber(1234, 4),
    "1234",
    "Returns same string when size equals number length"
);