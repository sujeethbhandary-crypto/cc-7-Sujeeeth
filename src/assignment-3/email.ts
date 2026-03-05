import assert from "node:assert";

/**
 * Extracts valid email-like strings from text lines.
 * - Keeps lines containing both "@" and "."
 * - Extracts the word containing "@"
 * - Converts the email to lowercase
 */
const emails = [
  "34, brighten street, email: BS@sft.com",
  "Behind hotel paragon, rode street, micHel@sun.it",
  "ulef court, cown street, email:cown@street",
  "CodeCraft",
];

const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}\b/;

// Using flatMap to extract and flatten in one step
const extractedEmails: string[] = emails.flatMap((line) => {
  const matches = line.match(emailRegex);
  return matches ? matches.map((email) => email.toLowerCase()) : [];
});

assert.deepStrictEqual(extractedEmails, ["bs@sft.com", "michel@sun.it"]);
// console.log(extractedEmails);
