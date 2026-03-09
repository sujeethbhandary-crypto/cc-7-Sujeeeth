import assert from "assert";

type Item = {
  name: string;
  type: "fruit" | "nut";
  treats: string[];
  nutritions: Record<string, number>;
};

const items: Item[] = [
  {
    name: "Banana",
    type: "fruit",
    treats: [
      "constipation",
      "vitamin deficiency",
      "skin issues",
      "sleep problems",
    ],
    nutritions: { protein: 8, carbs: 40, sugar: 30, vitamins: 45 },
  },
  {
    name: "Badam",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "sugar"],
    nutritions: { protein: 18, carbs: 20, sugar: 20, vitamins: 65 },
  },
  {
    name: "Cashew",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
  },
  {
    name: "Wallnut",
    type: "nut",
    treats: ["bp", "protein deficiency", "skin issues", "bone issues"],
    nutritions: { protein: 33, carbs: 26, vitamins: 64 },
  },
  {
    name: "Apple",
    type: "fruit",
    treats: ["heart problems", "skin issues", "bone issues", "migraine"],
    nutritions: { protein: 22, carbs: 22, vitamins: 60 },
  },
];

/** Highest nutrition holder */
const highestNutrition = items.reduce<
  Record<string, { name: string; value: number }>
>((acc, item) => {
  Object.entries(item.nutritions).forEach(([nutrient, value]) => {
    if (!acc[nutrient] || value > acc[nutrient].value) {
      acc[nutrient] = { name: item.name, value };
    }
  });
  return acc;
}, {});

assert.deepStrictEqual(highestNutrition, {
  protein: { name: "Wallnut", value: 33 },
  carbs: { name: "Banana", value: 40 },
  sugar: { name: "Banana", value: 30 },
  vitamins: { name: "Badam", value: 65 },
});

/** Unique nutritions */
const uniqueNutritions = [
  ...new Set(items.flatMap((item) => Object.keys(item.nutritions))),
];

assert.deepStrictEqual(
  uniqueNutritions.sort(),
  ["protein", "carbs", "sugar", "vitamins"].sort(),
);

/** Unique health conditions */
const uniqueHealth = [...new Set(items.flatMap((item) => item.treats))];

assert.deepStrictEqual(uniqueHealth.includes("migraine"), true);
assert.deepStrictEqual(uniqueHealth.includes("bp"), true);
assert.deepStrictEqual(uniqueHealth.includes("skin issues"), true);

/** Common health conditions among nuts */
const nuts = items
  .filter((e) => e.type === "nut")
  .map((n) => n.treats)
  .reduce((acc, treats) => acc.filter((t) => treats.includes(t)));

assert.deepStrictEqual(nuts, ["bp", "protein deficiency", "skin issues"]);

/** Add totalNutritions */
const itemsWithTotal = items.map((item) => ({
  ...item,
  totalNutritions: Object.values(item.nutritions).reduce((a, b) => a + b, 0),
}));

assert.deepStrictEqual(itemsWithTotal[0]!.totalNutritions, 123); // Banana
assert.deepStrictEqual(itemsWithTotal[1]!.totalNutritions, 123); // Badam
assert.deepStrictEqual(itemsWithTotal[2]!.totalNutritions, 104); // Cashew
assert.deepStrictEqual(itemsWithTotal[3]!.totalNutritions, 123); // Wallnut
assert.deepStrictEqual(itemsWithTotal[4]!.totalNutritions, 104); // Apple

/** Total nutrition value */
const totalNutritionValue = items.reduce((sum, item) => {
  return sum + Object.values(item.nutritions).reduce((a, b) => a + b, 0);
}, 0);

assert.deepStrictEqual(totalNutritionValue, 577);

/** Bone issue items */
const boneIssueItems = items
  .filter((item) => item.treats.includes("bone issues"))
  .map((item) => item.name);

assert.deepStrictEqual(boneIssueItems, ["Cashew", "Wallnut", "Apple"]);

/** Item with max nutrition types */
const maxNutritionItem = items.reduce((max, item) =>
  Object.keys(item.nutritions).length > Object.keys(max.nutritions).length
    ? item
    : max,
);

assert.deepStrictEqual(maxNutritionItem.name, "Banana");

/** Migraine + high vitamins */
const migraineHighVitamin = items
  .filter(
    (item) =>
      item.treats.includes("migraine") && (item.nutritions.vitamins ?? 0) >= 60,
  )
  .map((item) => item.name);

assert.deepStrictEqual(migraineHighVitamin, ["Apple"]);

/** Lowest carbs */
const lowestCarbs = items
  .filter((i) => i.nutritions.carbs !== undefined)
  .reduce((min, item) =>
    item.nutritions.carbs! < min.nutritions.carbs! ? item : min,
  );

assert.deepStrictEqual(lowestCarbs.name, "Badam");

/** Protein intake (nuts treating sugar) */
const totalProtein = items
  .filter((i) => i.type === "nut" && i.treats.includes("sugar"))
  .reduce((sum, nut) => sum + (nut.nutritions.protein ?? 0), 0);

assert.deepStrictEqual(totalProtein, 18);

/** Vitamin intake (fruit without sugar + all nuts) */
const fruitVitamin = items
  .filter((i) => i.type === "fruit" && !("sugar" in i.nutritions))
  .reduce((sum, f) => sum + (f.nutritions.vitamins ?? 0), 0);

const nutVitamin = items
  .filter((i) => i.type === "nut")
  .reduce((sum, n) => sum + (n.nutritions.vitamins ?? 0), 0);

const totalVitamins = fruitVitamin + nutVitamin;

assert.deepStrictEqual(totalVitamins, 249);
