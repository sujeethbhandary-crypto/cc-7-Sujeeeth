import { delay } from "./5th_Assignment.js";

/**
 * Represents a user returned from the API.
 */
export interface User {
  id: number;
  name: string;
  username: string;
  email: string;
}

/**
 * Fetches users from the JSONPlaceholder API and returns them
 * after an optional delay.
 *
 * @param delayTime - Time in milliseconds to delay before returning the users (default: 2000ms)
 * @returns Promise resolving to an array of User objects
 * @throws Error if fetching users fails
 */
export async function getUsers(delayTime = 2000): Promise<User[]> {
  try {
    const response = await fetch("https://jsonplaceholder.typicode.com/users");

    const users: User[] = await response.json();

    // Introduce additional delay before returning the result
    await delay(delayTime);

    return users;
  } catch {
    throw new Error("Failed to fetch user");
  }
}

/**
 * Example function to test getUsers.
 * Fetches users with a 5-second delay and prints them.
 */
async function test() {
  const users = await getUsers(5000);
  console.log(users);
}

test();
