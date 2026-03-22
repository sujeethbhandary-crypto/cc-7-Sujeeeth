import { describe, it, expect } from "vitest";
import { reducer } from "./reducer";
import type { State } from "./reducer";

/**
 * Utility to generate current timestamp
 */
const now = () => Date.now();

/**
 * Test suite for Drumkit reducer
 * Covers recording flow, playback flow, and edge cases
 */
describe("Drumkit Reducer", () => {
  /**
   * Initial State
   * Ensures reducer returns default state
   */
  it("should return initial state", () => {
    const state = reducer(undefined, { type: "CLEAR_RECORDING" });

    expect(state).toEqual({
      mode: "normal",
      recording: [],
      startTime: null,
    });
  });

  /**
   * Start recording
   * Should initialize recording mode and timestamp
   */
  it("should start recording", () => {
    const state = reducer(undefined, {
      type: "START_RECORDING",
      timestamp: 1000,
    });

    expect(state.mode).toBe("recording-progress");
    expect(state.startTime).toBe(1000);
    expect(state.recording).toEqual([]);
  });

  /**
   * Record beat during recording mode
   */
  it("should record a beat", () => {
    const startState = reducer(undefined, {
      type: "START_RECORDING",
      timestamp: 1000,
    });

    const state = reducer(startState, {
      type: "BEAT",
      data: { key: "A", timestamp: 1200 },
    });

    expect(state.recording.length).toBe(1);
    expect(state.recording[0].key).toBe("A");
    expect(state.recording[0].timeStamp).toBe(200);
  });

  /**
   * Ignore beat when not recording
   */
  it("should not record beat if not recording", () => {
    const state = reducer(undefined, {
      type: "BEAT",
      data: { key: "A", timestamp: 1200 },
    });

    expect(state.recording.length).toBe(0);
  });

  /**
   * Pause recording
   */
  it("should pause recording", () => {
    const startState = reducer(undefined, {
      type: "START_RECORDING",
      timestamp: now(),
    });

    const state = reducer(startState, {
      type: "PAUSE_RECORDING",
    });

    expect(state.mode).toBe("recording-paused");
  });

  /**
   * Resume recording after pause
   */
  it("should continue recording", () => {
    // start recording
    let state = reducer(undefined, {
      type: "START_RECORDING",
      timestamp: now(),
    });

    // pause recording
    state = reducer(state, {
      type: "PAUSE_RECORDING",
    });

    // continue recording
    state = reducer(state, {
      type: "CONTINUE_RECORDING",
    });

    expect(state.mode).toBe("recording-progress");
  });

  /**
   * Stop recording and persist beats
   */
  it("should stop recording and save beats", () => {
    const startState = reducer(undefined, {
      type: "START_RECORDING",
      timestamp: 1000,
    });

    const beatState = reducer(startState, {
      type: "BEAT",
      data: { key: "A", timestamp: 1200 },
    });

    const state = reducer(beatState, {
      type: "STOP_RECORDING",
    });

    expect(state.mode).toBe("normal");
    expect(state.recording.length).toBe(1);
  });

  // ---------------- PLAYBACK ----------------

  /**
   * Start playback when recordings exist
   */
  it("should start playback if recording exists", () => {
    let state = reducer(undefined, {
      type: "START_RECORDING",
      timestamp: 1000,
    });

    state = reducer(state, {
      type: "BEAT",
      data: { key: "A", timestamp: 1200 },
    });

    state = reducer(state, { type: "STOP_RECORDING" });

    state = reducer(state, { type: "START_PLAYBACK" });

    expect(state.mode).toBe("playback-progress");
  });

  /**
   * Prevent playback when no recordings exist
   */
  it("should not start playback if no recording", () => {
    const state = reducer(undefined, {
      type: "START_PLAYBACK",
    });

    expect(state.mode).toBe("normal");
  });

  /**
   * Pause playback
   */
  it("should pause playback", () => {
    const playingState: State = {
      mode: "playback-progress",
      recording: [{ key: "A", timeStamp: 10 }],
      startTime: null,
    };

    const state = reducer(playingState, {
      type: "PAUSE_PLAYBACK",
    });

    expect(state.mode).toBe("playback-paused");
  });

  /**
   * Resume playback
   */
  it("should continue playback", () => {
    const pausedState: State = {
      mode: "playback-paused",
      recording: [{ key: "A", timeStamp: 10 }],
      startTime: null,
    };

    const state = reducer(pausedState, {
      type: "CONTINUE_PLAYBACK",
    });

    expect(state.mode).toBe("playback-progress");
  });

  /**
   * Stop playback
   */
  it("should stop playback", () => {
    const playingState: State = {
      mode: "playback-progress",
      recording: [{ key: "A", timeStamp: 10 }],
      startTime: null,
    };

    const state = reducer(playingState, {
      type: "STOP_PLAYBACK",
    });

    expect(state.mode).toBe("normal");
  });

  // ---------------- EDGE CASES ----------------

  /**
   * Ignore STOP_RECORDING when not recording
   */
  it("should ignore invalid STOP_RECORDING", () => {
    const state = reducer(undefined, {
      type: "STOP_RECORDING",
    });

    expect(state.mode).toBe("normal");
  });

  /**
   * Clear all recordings and reset state
   */
  it("should clear recording", () => {
    const modifiedState: State = {
      mode: "recording-progress",
      recording: [{ key: "A", timeStamp: 10 }],
      startTime: 123,
    };

    const state = reducer(modifiedState, {
      type: "CLEAR_RECORDING",
    });

    expect(state).toEqual({
      mode: "normal",
      recording: [],
      startTime: null,
    });
  });
});
