/**
 * Tests for the delay function.
 * Ensures the promise resolves after the specified time.
 */

import { describe, it, expect, vi } from "vitest";
import { delay } from "./5th_Assignment.js";

describe("delay function", () => {
  /**
   * Test that delay resolves after the given time.
   * Uses fake timers to simulate the delay.
   */
  it("Should resolevs after a second", async () => {
    // Use fake timers to control setTimeout
    vi.useFakeTimers();

    /** Call delay with 2000ms */
    const promise = delay(2000);

    // Fast-forward time by 2000ms
    await vi.advanceTimersByTimeAsync(2000);

    /** Expect the promise to resolve with undefined */
    await expect(promise).resolves.toBeUndefined();

    // Restore real timers
    vi.useRealTimers();
  });
});
