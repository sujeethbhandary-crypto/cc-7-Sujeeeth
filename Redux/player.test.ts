import { describe, it, expect, vi } from "vitest";
import { Player } from "./player";

/**
 * Represents a recording event used for testing
 */
type Recording =
  | { type: "beat"; beat: { key: string; timestamp: number } }
  | { type: "pause"; pause: { start: number } };

/**
 * Test suite for Player playback behavior
 */
describe("Player", () => {
  /**
   * Verifies that beats are normalized:
   * - First beat starts at 0
   * - Pause durations are removed
   * - Subsequent beats have adjusted timestamps
   */
  it("should play beats with normalized timing", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording[] = [
      { type: "beat", beat: { key: "A", timestamp: 10 } },
      { type: "pause", pause: { start: 20 } },
      { type: "beat", beat: { key: "B", timestamp: 50 } },
      { type: "pause", pause: { start: 70 } },
      { type: "beat", beat: { key: "C", timestamp: 100 } },
    ];

    const player = new Player(recording, playback);

    player.play();

    // First beat should execute immediately (rebased to 0)
    vi.advanceTimersByTime(0);
    expect(playback).toHaveBeenCalledWith({ key: "A", timestamp: 0 });

    // Second beat should execute after 10ms
    vi.advanceTimersByTime(10);
    expect(playback).toHaveBeenCalledWith({ key: "B", timestamp: 10 });

    // Third beat should execute after total 30ms
    vi.advanceTimersByTime(20);
    expect(playback).toHaveBeenCalledWith({ key: "C", timestamp: 30 });

    vi.useRealTimers();
  });

  /**
   * Ensures playback does not start when there are no beats
   */
  it("should not start playback if no beats exist", () => {
    const playback = vi.fn();
    const player = new Player([], playback);

    player.play();

    expect(playback).not.toHaveBeenCalled();
  });

  /**
   * Verifies that beats are played in correct order
   * with properly normalized timestamps
   */
  it("should play all beats in correct order", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording[] = [
      { type: "beat", beat: { key: "A", timestamp: 10 } },
      { type: "beat", beat: { key: "B", timestamp: 20 } },
      { type: "beat", beat: { key: "C", timestamp: 30 } },
    ];

    const player = new Player(recording, playback);

    player.play();

    vi.runAllTimers();

    expect(playback.mock.calls).toEqual([
      [{ key: "A", timestamp: 0 }],
      [{ key: "B", timestamp: 10 }],
      [{ key: "C", timestamp: 20 }],
    ]);

    vi.useRealTimers();
  });

  /**
   * Ensures that calling pause stops any further scheduled playback
   */
  it("should stop playback when paused", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording[] = [
      { type: "beat", beat: { key: "A", timestamp: 10 } },
      { type: "beat", beat: { key: "B", timestamp: 50 } },
    ];

    const player = new Player(recording, playback);

    player.play();

    // First beat executes
    vi.advanceTimersByTime(0);

    // Pause playback
    player.pause();

    // Remaining timers should not execute
    vi.runAllTimers();

    expect(playback).toHaveBeenCalledTimes(1);

    vi.useRealTimers();
  });

  /**
   * Verifies that playback resumes from the last played beat
   * instead of restarting from the beginning
   */
  it("should resume playback from last beat index", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording[] = [
      { type: "beat", beat: { key: "A", timestamp: 10 } },
      { type: "beat", beat: { key: "B", timestamp: 50 } },
      { type: "beat", beat: { key: "C", timestamp: 100 } },
    ];

    const player = new Player(recording, playback);

    player.play();

    // Play first beat
    vi.advanceTimersByTime(0);

    // Pause and resume
    player.pause();
    player.play();

    vi.runAllTimers();

    expect(playback.mock.calls).toEqual([
      [{ key: "A", timestamp: 0 }],
      [{ key: "B", timestamp: 40 }],
      [{ key: "C", timestamp: 90 }],
    ]);

    vi.useRealTimers();
  });

  /**
   * Ensures playback restarts from beginning after finishing
   */
  it("should restart from beginning after finishing playback", () => {
    vi.useFakeTimers();

    const playback = vi.fn();

    const recording: Recording[] = [
      { type: "beat", beat: { key: "A", timestamp: 10 } },
      { type: "beat", beat: { key: "B", timestamp: 20 } },
    ];

    const player = new Player(recording, playback);

    // First run
    player.play();
    vi.runAllTimers();

    // Second run → should restart
    player.play();
    vi.runAllTimers();

    expect(playback).toHaveBeenCalledTimes(4);

    vi.useRealTimers();
  });

  /**
   * Ensures all subscribed listeners are notified
   * after each beat is played
   */
  it("should notify listeners on each beat", () => {
    vi.useFakeTimers();

    const playback = vi.fn();
    const listener = vi.fn();

    const recording: Recording[] = [
      { type: "beat", beat: { key: "A", timestamp: 10 } },
      { type: "beat", beat: { key: "B", timestamp: 20 } },
    ];

    const player = new Player(recording, playback);

    player.subscribe(listener);

    player.play();

    vi.runAllTimers();

    expect(listener).toHaveBeenCalledTimes(2);

    vi.useRealTimers();
  });
});
