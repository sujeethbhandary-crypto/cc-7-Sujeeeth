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

const extractedEmails = emails
  .filter((line) => line.includes("@") && line.includes("."))
  .map((line) => {
    const words = line.split(" ");
    return words.find((word) => word.includes("@"));
  })
  .map((email) => email!.toLowerCase());

assert.deepStrictEqual(extractedEmails, ["bs@sft.com", "michel@sun.it"]);
