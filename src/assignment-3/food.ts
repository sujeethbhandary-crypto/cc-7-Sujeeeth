import assert from "node:assert";

/**
 * List of foods and their ingredients.
 * Each object has one key (food name)
 * and value as an array of ingredients.
 *
 * @type {Array<Object<string, string[]>>}
 */
const foods = [
  { idli: ["rice", "urad", "oil", "cashew", "water"] },
  { chapathi: ["atta", "gluten", "water", "oil", "sugar"] },
  { pizza: ["maida", "sugar", "oil", "chiili", "flakes", "sause"] },
  { paneer_masala: ["paneer", "onion", "tomato", "garlic", "oil"] },
];

/**
 * Filters foods that do NOT contain sugar.
 * @type {string[]}
 */
const DonotContainSugar = foods
  .filter((food) => {
    return !Object.values(food)[0]?.includes("sugar");
  })
  .map((food) => Object.keys(food)[0]);

/**
 * Filters foods that contain BOTH chiili and oil.
 * @type {string[]}
 */
const ContainsChillyAndOil = foods
  .filter((food) => {
    return (
      Object.values(food)[0]?.includes("chiili") &&
      Object.values(food)[0]?.includes("oil")
    );
  })
  .map((food) => Object.keys(food)[0]);

assert.deepStrictEqual(DonotContainSugar, ["idli", "paneer_masala"]);
assert.deepStrictEqual(ContainsChillyAndOil, ["pizza"]);

/**
 * Generates safety status for each food.
 * If ingredients contain sugar -> unsafe
 * Else -> safe
 *
 * @type {Array<Object<string, string>>}
 */
const FoodSafetyStatus = foods.map((food) => {
  const ingredients = Object.values(food)[0];
  const name = Object.keys(food)[0];
  const status = ingredients?.includes("sugar") ? "unsafe" : "safe";
  if (!name) return {};
  return { [name]: status };
});

// console.log(FoodSafetyStatus);

assert.deepStrictEqual(FoodSafetyStatus, [
  { idli: "safe" },
  { chapathi: "unsafe" },
  { pizza: "unsafe" },
  { paneer_masala: "safe" },
]);
