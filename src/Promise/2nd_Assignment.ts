import { promises as fs } from "fs";
import path from "path";

/**
 * Returns the type of a file system entry.
 * @param filePath Path to a file or directory
 * @returns Promise resolving to "FILE", "DIRECTORY", or "OTHER"
 */
function getFileType(
  filePath: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  return fs
    .stat(filePath)
    .then((stats) => {
      if (stats.isFile()) return "FILE";
      if (stats.isDirectory()) return "DIRECTORY";
      return "OTHER";
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * Returns contents of a file or directory.
 * - File → returns file path
 * - Directory → returns list of file names
 * @param filePath Path to file or directory
 * @returns Promise resolving to file path or array of file names
 */
function getContents(filePath: string): Promise<string | string[]> {
  return getFileType(filePath)
    .then<string | string[]>((type) => {
      if (type === "FILE") {
        return filePath;
      } else if (type === "DIRECTORY") {
        return fs.readdir(filePath);
      } else {
        return "";
      }
    })
    .catch(() => {
      throw new Error("file system error");
    });
}

/**
 * Recursively calculates size of a file or directory.
 * @param filePath Path to file or directory
 * @returns Promise resolving to total size in bytes
 */
function getSize(filePath: string): Promise<number> {
  return getFileType(filePath).then((type) => {
    if (type === "FILE") {
      return fs.stat(filePath).then((stats) => stats.size);
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

    return 0;
  });
}

const filePath = "C:/Users/Sujeeth/Desktop/Assignment-assert/src/Promise";

getFileType(filePath)
  .then((type) => console.log("File Type:", type))
  .catch((err) => console.log(err.message));

getContents(filePath)
  .then((content) => console.log("Contents:", content))
  .catch((err) => console.log(err.message));

getSize(filePath)
  .then((size) => console.log("Total Size:", size))
  .catch((err) => console.log(err.message));
