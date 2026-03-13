import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

/**
 * Determines the type of a file system object at the given path.
 *
 * @param filePath - Absolute or relative path of the file system object.
 *
 * @returns A Promise that resolves to:
 * - "FILE" if the path refers to a file
 * - "DIRECTORY" if the path refers to a directory
 * - "OTHER" for other file system types (symbolic link, socket, etc.)
 *
 * @throws {Error} Throws "file system error" if the file system operation fails.
 */
export async function getFileType(
  filePath: string,
): Promise<"FILE" | "DIRECTORY" | "OTHER"> {
  try {
    const stats = await fs.stat(filePath);

    if (stats.isFile()) {
      return "FILE";
    }

    if (stats.isDirectory()) {
      return "DIRECTORY";
    }

    return "OTHER";
  } catch {
    throw new Error("file system error");
  }
}

/**
 * Retrieves the contents of a file or directory.
 * @param filePath - Absolute or relative path of the file or directory.
 *
 * @returns A Promise that resolves to:
 * - the file path (string) if the path refers to a file
 * - an array of strings representing directory contents if the path refers to a directory
 *
 * @throws {Error} Throws "file system error" if the file system operation fails.
 */

export async function getContents(
  filePath: string,
): Promise<string | string[]> {
  try {
    const type = await getFileType(filePath);

    if (type === "FILE") {
      return filePath;
    }

    if (type === "DIRECTORY") {
      const files = await fs.readdir(filePath);
      return files;
    }

    return filePath;
  } catch {
    throw new Error("file system error");
  }
}

/**
 * Calculates the size of a file or directory.
 *
 * @param filePath - Absolute or relative path whose size should be calculated.
 *
 * @returns A Promise that resolves to the total size in bytes.
 *
 * @throws {Error} Throws "file system error" if any file system operation fails.
 */

export async function getSize(filePath: string): Promise<number> {
  try {
    const type = await getFileType(filePath);

    // If file → return size
    if (type === "FILE") {
      const stats = await fs.stat(filePath);
      return stats.size;
    }

    // If directory
    if (type === "DIRECTORY") {
      const files = await fs.readdir(filePath);

      let totalSize = 0;

      for (const file of files) {
        const fullPath = path.join(filePath, file);

        const size = await getSize(fullPath);

        totalSize += size;
      }

      return totalSize;
    }

    return 0;
  } catch {
    throw new Error("file system error");
  }
}

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function test() {
  try {
    const type1 = await getFileType(__dirname);
    console.log("File Type:", type1);

    const type2 = await getFileType(__filename);
    console.log("File Type:", type2);

    const contents1 = await getContents(__dirname);
    console.log("Contents:", contents1);

    const contents2 = await getContents(__filename);
    console.log("Contents:", contents2);

    const size1 = await getSize(__dirname);
    console.log("Size:", size1);

    const size2 = await getSize(__filename);
    console.log("Size:", size2);
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}
test();
