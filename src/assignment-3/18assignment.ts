import assert from "node:assert";

/**
 * Movies dataset containing title, release year, and cast members
 */
const movies = [
  {
    title: "The Book of Love",
    year: 2017,
    cast: [
      "Jason Sudeikis",
      "Jessica Biel",
      "Maisie Williams",
      "Mary Steenburgen",
      "Orlando Jones",
      "Paul Reiser",
    ],
    genres: ["Drama", "Comedy"],
  },
  {
    title: "Split",
    year: 2017,
    cast: [
      "James McAvoy",
      "Anya Taylor-Joy",
      "Betty Buckley",
      "Jessica Sula",
      "Haley Lu Richardson",
      "Kim Director",
      "Lyne Renée",
      "Brad William Henke",
      "Neal Huff",
      "Sebastian Arcelus",
    ],
    genres: ["Horror", "Thriller", "Drama"],
  },
  {
    title: "xXx: Return of Xander Cage",
    year: 2017,
    cast: [
      "Vin Diesel",
      "Samuel L. Jackson",
      "Donnie Yen",
      "Deepika Padukone",
      "Kris Wu",
      "Nina Dobrev",
      "Tony Jaa",
      "Ruby Rose",
      "Toni Collette",
      "Nicky Jam",
      "Rory McCann",
      "Al Sapienza",
      "Michael Bisping",
      "Ariadna Gutiérrez",
      "Hermione Corfield",
    ],
    genres: ["Action", "Adventure"],
  },
  {
    title: "The Resurrection of Gavin Stone",
    year: 2017,
    cast: [
      "Brett Dalton",
      "Anjelah Johnson",
      "Neil Flynn",
      "Shawn Michaels",
      "D. B. Sweeney",
    ],
    genres: ["Comedy", "Drama"],
  },
  {
    title: "Trespass Against Us",
    year: 2017,
    cast: [
      "Michael Fassbender",
      "Brendan Gleeson",
      "Lyndsey Marshal",
      "Killian Scott",
    ],
    genres: ["Crime", "Drama", "Thriller"],
  },
  {
    title: "Sophie and the Rising Sun",
    year: 2017,
    cast: [
      "Julianne Nicholson",
      "Margo Martindale",
      "Lorraine Toussaint",
      "Takashi Yamaguchi",
      "Diane Ladd",
    ],
    genres: ["Drama", "Romance"],
  },
  {
    title: "A Dog's Purpose",
    year: 2017,
    cast: [
      "Britt Robertson",
      "Dennis Quaid",
      "Josh Gad",
      "Peggy Lipton",
      "Juliet Rylance",
    ],
    genres: ["Family"],
  },
  {
    title: "Resident Evil: The Final Chapter",
    year: 2017,
    cast: [
      "Milla Jovovich",
      "Shawn Roberts",
      "Ruby Rose",
      "William Levy",
      "Iain Glen",
      "Eoin Macken",
      "Lee Joon-gi",
      "Ali Larter",
    ],
    genres: ["Action", "Adventure", "Horror", "Science Fiction"],
  },
  {
    title: "Lost in Florence",
    year: 2017,
    cast: [
      "Brett Dalton",
      "Stana Katic",
      "Alessandra Mastronardi",
      "Alessandro Preziosi",
      "Emily Atack",
      "Rob Aramayo",
      "Marco Bonini",
    ],
    genres: ["Romance", "Drama"],
  },
];

/**
 * Get all actor names from movies
 */
const actorNames = movies
  .map((movie) => movie.cast)
  .reduce((acc, cast) => acc.concat(cast), []);

/**assert */
assert.deepStrictEqual(actorNames, [
  "Jason Sudeikis",
  "Jessica Biel",
  "Maisie Williams",
  "Mary Steenburgen",
  "Orlando Jones",
  "Paul Reiser",
  "James McAvoy",
  "Anya Taylor-Joy",
  "Betty Buckley",
  "Jessica Sula",
  "Haley Lu Richardson",
  "Kim Director",
  "Lyne Renée",
  "Brad William Henke",
  "Neal Huff",
  "Sebastian Arcelus",
  "Vin Diesel",
  "Samuel L. Jackson",
  "Donnie Yen",
  "Deepika Padukone",
  "Kris Wu",
  "Nina Dobrev",
  "Tony Jaa",
  "Ruby Rose",
  "Toni Collette",
  "Nicky Jam",
  "Rory McCann",
  "Al Sapienza",
  "Michael Bisping",
  "Ariadna Gutiérrez",
  "Hermione Corfield",
  "Brett Dalton",
  "Anjelah Johnson",
  "Neil Flynn",
  "Shawn Michaels",
  "D. B. Sweeney",
  "Michael Fassbender",
  "Brendan Gleeson",
  "Lyndsey Marshal",
  "Killian Scott",
  "Julianne Nicholson",
  "Margo Martindale",
  "Lorraine Toussaint",
  "Takashi Yamaguchi",
  "Diane Ladd",
  "Britt Robertson",
  "Dennis Quaid",
  "Josh Gad",
  "Peggy Lipton",
  "Juliet Rylance",
  "Milla Jovovich",
  "Shawn Roberts",
  "Ruby Rose",
  "William Levy",
  "Iain Glen",
  "Eoin Macken",
  "Lee Joon-gi",
  "Ali Larter",
  "Brett Dalton",
  "Stana Katic",
  "Alessandra Mastronardi",
  "Alessandro Preziosi",
  "Emily Atack",
  "Rob Aramayo",
  "Marco Bonini",
]);

/**
 * Group movies by year (maximum 3 movie titles per year)
 */
const moviesByYear = movies.reduce(
  (acc: { [key: number]: string[] }, movie) => {
    const year = movie.year;
    if (!acc[year]) {
      acc[year] = [];
    }
    if (acc[year].length < 3) {
      acc[year].push(movie.title);
    }
    return acc;
  },
  {},
);

/**assert*/
assert.deepStrictEqual(moviesByYear, {
  2017: ["The Book of Love", "Split", "xXx: Return of Xander Cage"],
});
