/**
 * Creates a Promise that resolves after a specified delay.
 *
 * @param milliseconds - Time to wait before resolving the promise
 * @returns Promise that resolves with undefined after the delay
 */
export function delay(milliseconds: number): Promise<undefined> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(undefined);
    }, milliseconds);
  });
}
