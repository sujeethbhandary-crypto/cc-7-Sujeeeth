import assert from "assert";

type Employee = {
  firstName: string;
  lastName: string;
  age: number;
  email: string;
  salary: number;
};

const employees: Employee[] = [
  {
    firstName: "Molly",
    lastName: "Rojas",
    age: 38,
    email: "mollyrojas@plasmox.com",
    salary: 3065,
  },
  {
    firstName: "Marguerite",
    lastName: "Santiago",
    age: 27,
    email: "margueritesantiago@plasmox.com",
    salary: 2796,
  },
  {
    firstName: "Evelyn",
    lastName: "Oneil",
    age: 26,
    email: "evelynoneil@plasmox.com",
    salary: 3947,
  },
  {
    firstName: "Consuelo",
    lastName: "Case",
    age: 23,
    email: "consuelocase@plasmox.com",
    salary: 2819,
  },
  {
    firstName: "Earline",
    lastName: "Bush",
    age: 29,
    email: "earlinebush@plasmox.com",
    salary: 3494,
  },
  {
    firstName: "Sanford",
    lastName: "Hurley",
    age: 26,
    email: "sanfordhurley@plasmox.com",
    salary: 3068,
  },
  {
    firstName: "Todd",
    lastName: "Gomez",
    age: 33,
    email: "toddgomez@plasmox.com",
    salary: 3906,
  },
];

/** Total salary of employees younger than 30 */
const totalSalary = employees
  .filter((emp) => emp.age < 30)
  .reduce((sum, emp) => sum + emp.salary, 0);

assert.strictEqual(totalSalary, 16124);

/** Array of employee full names */
const fullNames = employees.map((emp) => `${emp.firstName} ${emp.lastName}`);

assert.deepStrictEqual(fullNames, [
  "Molly Rojas",
  "Marguerite Santiago",
  "Evelyn Oneil",
  "Consuelo Case",
  "Earline Bush",
  "Sanford Hurley",
  "Todd Gomez",
]);

/** Comma separated email string */
const emails = employees.map((emp) => emp.email).join(", ");

assert.strictEqual(
  emails,
  "mollyrojas@plasmox.com, margueritesantiago@plasmox.com, evelynoneil@plasmox.com, consuelocase@plasmox.com, earlinebush@plasmox.com, sanfordhurley@plasmox.com, toddgomez@plasmox.com",
);
