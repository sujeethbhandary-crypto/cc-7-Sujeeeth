import assert from "assert";

type Quote = {
  text: string;
  author: string;
};

const quotes: Quote[] = [
  {
    text: "Genius is one percent inspiration and ninety-nine percent perspiration.",
    author: "Thomas Edison",
  },
  {
    text: "You can observe a lot just by watching.",
    author: "Yogi Berra",
  },
  {
    text: "To invent, you need a good imagination and a pile of junk",
    author: "Thomas Edison",
  },
  {
    text: "Difficulties increase the nearer we get to the goal.",
    author: "Yogi Berra",
  },
  {
    text: "Fate is in your hands and no one elses",
    author: "Byron Pulsifer",
  },
  {
    text: "Be the chief but never the lord.",
    author: "Lao Tzu",
  },
  {
    text: "Nothing happens unless first we dream.",
    author: "Byron Pulsifer",
  },
  {
    text: "Well begun is half done.",
    author: "Aristotle",
  },
  {
    text: "Life is a learning experience, only if you learn.",
    author: "Yogi Berra",
  },
  {
    text: "Self-complacency is fatal to progress.",
    author: "Margaret Sangster",
  },
  {
    text: "Peace comes from within. Do not seek it without.",
    author: "Buddha",
  },
  {
    text: "What you give is what you get.",
    author: "Byron Pulsifer",
  },
  {
    text: "We can only learn to love by loving.",
    author: "Lao Tzu",
  },
  {
    text: "Life is change. Growth is optional. Choose wisely.",
    author: "Karen Clark",
  },
  {
    text: "You'll see it when you believe it.",
    author: "Buddha",
  },
];

/**
 * Groups quotes by author.
 */
const quotesByAuthorName = quotes.reduce<Record<string, string[]>>(
  (acc, quote) => {
    const { author, text } = quote;

    if (!acc[author]) {
      acc[author] = [];
    }

    acc[author].push(text);
    return acc;
  },
  {},
);

assert.deepStrictEqual(quotesByAuthorName["Buddha"], [
  "Peace comes from within. Do not seek it without.",
  "You'll see it when you believe it.",
]);

/**
 * Returns quotes that contain a given word.
 */
const getQuotesContainingWord = (word: string): string[] => {
  return quotes
    .filter((quote) => quote.text.toLowerCase().includes(word.toLowerCase()))
    .map((filteredQuote) => filteredQuote.text);
};

assert.deepStrictEqual(getQuotesContainingWord("life"), [
  "Life is a learning experience, only if you learn.",
  "Life is change. Growth is optional. Choose wisely.",
]);

/**
 * Extracts quote text strings from quote objects.
 */
const getQuotesString = (quotes: Quote[]): string[] => {
  return quotes.map((quote) => quote.text);
};

assert.strictEqual(getQuotesString(quotes).length, 15);

/**
 * Returns unique authors.
 */
const arrayAuthor = quotes.reduce((acc: string[], quote) => {
  if (!acc.includes(quote.author)) {
    acc.push(quote.author);
  }
  return acc;
}, []);

assert.deepStrictEqual(arrayAuthor, [
  "Thomas Edison",
  "Yogi Berra",
  "Byron Pulsifer",
  "Lao Tzu",
  "Aristotle",
  "Margaret Sangster",
  "Buddha",
  "Karen Clark",
]);
