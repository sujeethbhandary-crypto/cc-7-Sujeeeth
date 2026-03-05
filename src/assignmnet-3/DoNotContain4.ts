import assert from "node:assert";

const purchases = `items qty
apple 24
mango 50
guava 42
onion 31
water 10`;

const lines = purchases.split("\n");

const result = lines
  .filter((line) => !line.includes("4"))
  .map((obj, index) => {
    if (index == 0) {
      return obj;
    }
    const [item, qty] = obj.split(" ");
    const added10 = Number(qty) + 10;
    return `${item} ${added10}`;
  })
  .join("\n");

assert.strictEqual(
  result,
  `items qty
mango 60
onion 41
water 20`,
);
