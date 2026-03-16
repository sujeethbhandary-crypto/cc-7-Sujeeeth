import { describe, test, expect } from "vitest";
import { getFileType, getContents, getSize } from "./3rd_Assignment.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

describe("File System Utility Functions", () => {
  //test filetype
  test("getFileType should detect a file", async () => {
    const result = await getFileType(__filename);
    expect(result).toBe("FILE");
  });

  test("getFileType should detect a directory", async () => {
    const result = await getFileType(__dirname);
    expect(result).toBe("DIRECTORY");
  });

  //test content type
  test("getContents should return file path for files", async () => {
    const result = await getContents(__filename);
    expect(result).toBe(__filename);
  });

  test("getContents should return array for directories", async () => {
    const result = await getContents(__dirname);
    expect(Array.isArray(result)).toBe(true);
  });

  //test getSize
  test("getSize should return file size", async () => {
    const size = await getSize(__filename);
    expect(size).toBeGreaterThan(0);
  });

  test("getSize should return directory size", async () => {
    const size = await getSize(__dirname);
    expect(size).toBeGreaterThan(0);
  });
});
