import fs from "fs";
import path from "path";

/**
 * Returns the type of a file system entry.
 * @param filePath Path to file or directory
 * @returns Promise resolving to "FILE", "DIRECTORY", or "OTHER"
 */
function getFileType(
  filePath: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return new Promise((resolve, reject) => {
    fs.stat(filePath, (err, stats) => {
      if (err) {
        reject(new Error("file system error"));
        return;
      }

      if (stats.isFile()) resolve("FILE");
      else if (stats.isDirectory()) resolve("DIRECTORY");
      else resolve("OTHER");
    });
  });
}

/**
 * Returns contents of a file or directory.
 * - File → returns file path
 * - Directory → returns array of file names
 * @param filePath Path to file or directory
 */
function getContents(filePath: string): Promise<string | string[]> {
  return new Promise((resolve, reject) => {
    getFileType(filePath)
      .then((type) => {
        if (type === "FILE") {
          resolve(filePath);
        } else if (type === "DIRECTORY") {
          fs.readdir(filePath, (err, files) => {
            if (err) {
              reject(new Error("file system error"));
            } else {
              resolve(files);
            }
          });
        } else {
          resolve("");
        }
      })
      .catch(() => {
        reject(new Error("file system error"));
      });
  });
}
/**
 * Recursively calculates size of a file or directory.
 * @param filePath Path to file or directory
 * @returns Total size in bytes
 */
function getSize(filePath: string): Promise<number> {
  return getFileType(filePath).then((type) => {
    if (type === "FILE") {
      return new Promise<number>((resolve, reject) => {
        fs.stat(filePath, (err, stats) => {
          if (err) {
            reject(new Error("file system error"));
            return;
          }
          resolve(stats.size);
        });
      });
    }

    if (type === "DIRECTORY") {
      return getContents(filePath).then((files) => {
        const promises = (files as string[]).map((file) => {
          const fullPath = path.join(filePath, file);
          return getSize(fullPath);
        });

        return Promise.all(promises).then((sizes) =>
          sizes.reduce((a, b) => a + b, 0),
        );
      });
    }

    return Promise.resolve(0);
  });
}

// Test using console approach
const filePath =
  "C:/Users/Sujeeth/Desktop/Assignment-assert/src/Promise/1st_Assignment.ts";

getFileType(filePath)
  .then((type) => console.log("File Type:", type))
  .catch((err) => console.log("Error:", err.message));

getContents(filePath)
  .then((content) => console.log("Contents:", content))
  .catch((err) => console.log("Error:", err.message));

getSize(filePath)
  .then((size) => console.log("Size:", size))
  .catch((err) => console.log("Error:", err.message));

const dirPath = "C:/Users/Sujeeth/Desktop/Assignment-assert/src/Promise";

getFileType(dirPath)
  .then((type) => console.log("File Type:", type))
  .catch((err) => console.log("Error:", err.message));

getContents(dirPath)
  .then((content) => console.log("Contents:", content))
  .catch((err) => console.log("Error:", err.message));

getSize(dirPath)
  .then((size) => console.log("Size:", size))
  .catch((err) => console.log("Error:", err.message));
