import "./style.css";
import { reducer, initialState } from "./components/reducer";
import type { State, keys, Action } from "./components/reducer";
import { Player } from "./components/player";

/**
 * Current application state.
 */
let state: State = initialState;

/**
 * UI Elements
 */
const statusEl = document.getElementById("status");
const progressBar = document.getElementById("progress-bar");
const timerEl = document.getElementById("timer");
const recordToggle = document.getElementById("toggleRecording");
const playbackToggle = document.getElementById("togglePlayback");

/**
 * Update UI based on current state.
 */
const render = () => {
  if (statusEl) {
    statusEl.textContent = `Mode: ${state.mode} | Beats: ${state.recording.length}`;
    const colors: Record<string, string> = {
      normal: "white",
      "recording-progress": "red",
      "recording-paused": "orange",
      "playback-progress": "green",
      "playback-paused": "yellow",
    };
    statusEl.style.color = colors[state.mode];
  }
};

/**
 * Dispatch an action to update state and re-render UI.
 * @param action The action to dispatch.
 */
const dispatch = (action: Action) => {
  state = reducer(state, action);
  render();
};

/**
 * Handles audio playback for the current recording.
 */
let player: Player | null = null;

/**
 * Playback tracking variables.
 */
let playbackStartTime = 0;
let playbackDuration = 0;
let rafId: number | null = null;

/**
 * Keyboard-to-key mapping for drum triggers.
 */
const keyMap: Record<string, keys> = {
  a: "A",
  s: "S",
  d: "D",
  f: "F",
  g: "G",
  h: "H",
  j: "J",
  k: "K",
  l: "L",
};

/**
 * Key code mapping for audio elements.
 */
const keyCodeMap: Record<keys, number> = {
  A: 65,
  S: 83,
  D: 68,
  F: 70,
  G: 71,
  H: 72,
  J: 74,
  K: 75,
  L: 76,
};

/**
 * Play sound associated with a key code and animate key.
 * @param keyCode Key code of the pressed key.
 */
const playSound = (keyCode: number) => {
  const audio = document.querySelector<HTMLAudioElement>(
    `audio[data-key="${keyCode}"]`,
  );
  const key = document.querySelector<HTMLElement>(
    `.key[data-key="${keyCode}"]`,
  );
  if (!audio || !key) return;

  key.classList.add("playing");
  audio.currentTime = 0;
  audio.play();
};

/**
 * Remove key animation after transition ends.
 */
document.querySelectorAll<HTMLElement>(".key").forEach((key) => {
  key.addEventListener("transitionend", (e) => {
    if (e.propertyName !== "transform") return;
    (e.target as HTMLElement).classList.remove("playing");
  });
});

/**
 * Listen for keyboard input to trigger beats and record.
 */
window.addEventListener("keydown", (e) => {
  const key = keyMap[e.key.toLowerCase()];
  if (!key) return;

  const now = Date.now();
  playSound(keyCodeMap[key]);

  if (state.mode === "recording-progress") {
    dispatch({ type: "BEAT", data: { key, timestamp: now } });
  }
});

/**
 * Format milliseconds to `mm:ss`.
 * @param ms Time in milliseconds.
 * @returns Formatted time string.
 */
const formatTime = (ms: number) => {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

/**
 * Smoothly update playback UI using requestAnimationFrame.
 */
const startSmoothUI = () => {
  if (!progressBar || !timerEl) return;

  const update = () => {
    const now = Date.now();
    const elapsed = now - playbackStartTime;
    const progress = Math.min(elapsed / playbackDuration, 1);

    progressBar.style.width = `${progress * 100}%`;
    timerEl.textContent = `${formatTime(elapsed)} / ${formatTime(playbackDuration)}`;

    if (progress < 1) {
      rafId = requestAnimationFrame(update);
    } else {
      rafId = null;
      dispatch({ type: "STOP_PLAYBACK" });
    }
  };

  update();
};

/**
 * Extend global window object with drum controls.
 */
declare global {
  interface Window {
    startRecording: () => void;
    stopRecording: () => void;
    RecordingPauseResume: () => void;
    playRecording: () => void;
    playbackPauseResume: () => void;
    clearRecording: () => void;
  }
}

/**
 * Start a new recording session.
 */
window.startRecording = () => {
  dispatch({ type: "START_RECORDING", timestamp: Date.now() });
  if (progressBar) progressBar.style.width = "0%";
  if (timerEl) timerEl.textContent = "0:00 / 0:00";
};

/**
 * Stop the current recording session.
 */
window.stopRecording = () => {
  dispatch({ type: "STOP_RECORDING" });
};

/**
 * Pause or resume recording based on current state.
 */
window.RecordingPauseResume = () => {
  const now = Date.now();
  if (state.mode === "recording-progress") {
    dispatch({ type: "PAUSE_RECORDING", timestamp: now });
    if (recordToggle) recordToggle.innerText = "Record ▶ ";
  } else if (state.mode === "recording-paused") {
    dispatch({ type: "CONTINUE_RECORDING", timestamp: now });
    if (recordToggle) recordToggle.innerText = "Pause ||";
  }
};

/**
 * Start playback of the recorded beats.
 */
window.playRecording = () => {
  if (!state.recording.length) return;

  dispatch({ type: "START_PLAYBACK" });

  const recording = state.recording.map((b) => ({
    type: "beat" as const,
    beat: { key: b.key, timestamp: b.timeStamp },
  }));

  playbackStartTime = Date.now();
  playbackDuration =
    recording[recording.length - 1].beat.timestamp -
    recording[0].beat.timestamp;

  player = new Player(recording, (beat) => {
    playSound(keyCodeMap[beat.key as keys]);
  });

  player.play();
  startSmoothUI();
};

/**
 * Pause or resume playback based on current state.
 */
window.playbackPauseResume = () => {
  if (!player) return;

  if (state.mode === "playback-progress") {
    dispatch({ type: "PAUSE_PLAYBACK" });
    player.pause();
    if (rafId) cancelAnimationFrame(rafId);
    if (playbackToggle) playbackToggle.innerText = "Play ▶";
  } else if (state.mode === "playback-paused") {
    dispatch({ type: "CONTINUE_PLAYBACK" });
    player.play();
    const currentPercent = parseFloat(progressBar!.style.width) / 100;
    playbackStartTime = Date.now() - currentPercent * playbackDuration;
    startSmoothUI();
    if (playbackToggle) playbackToggle.innerText = "Pause ||";
  }
};

/**
 * Clear the current recording and reset UI and state.
 */
window.clearRecording = () => {
  dispatch({ type: "CLEAR_RECORDING" });

  if (player) {
    player.stop();
    player = null;
  }

  if (rafId) {
    cancelAnimationFrame(rafId);
    rafId = null;
  }

  playbackStartTime = 0;
  playbackDuration = 0;

  if (progressBar) progressBar.style.width = "0%";
  if (timerEl) timerEl.textContent = "0:00 / 0:00";
};

/**
 * Initial render of UI.
 */
render();
