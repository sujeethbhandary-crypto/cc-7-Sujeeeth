import "./style.css";
import { reducer, initialState } from "./components/reducer";
import type { State, Keys, Action } from "./components/reducer";
import { Player } from "./components/player";

/**
 * Global application state.
 */
let state: State = initialState;
let totalPausedTime = 0;
let pauseStart = 0;
/**
 * Cached DOM elements used across the UI.
 */
const statusEl = document.getElementById("status");
const progressBar = document.getElementById("progress-bar");
const timerEl = document.getElementById("timer");
const RecordingPausePlay = document.getElementById(
  "RecordingPausePlay",
) as HTMLButtonElement | null;
const playbackToggle = document.getElementById(
  "togglePlayback",
) as HTMLButtonElement | null;
const startStopBtn = document.getElementById(
  "startStopBtn",
) as HTMLButtonElement | null;
const startPlayback = document.getElementById(
  "startPlayback",
) as HTMLButtonElement | null;
const clearBtn = document.getElementById(
  "clearBtn",
) as HTMLButtonElement | null;

/**
 * Maps application modes to UI colors.
 */
const colors: Record<string, string> = {
  normal: "green",
  "recording-progress": "red",
  "recording-paused": "orange",
  "playback-progress": "green",
  "playback-paused": "yellow",
};

/**
 * Renders the current application state into the UI.
 */
const render = () => {
  if (!statusEl) return;

  statusEl.textContent = `Mode: ${state.mode} | Beats: ${state.recording.length}`;
  statusEl.style.color = colors[state.mode];
};

/**
 * Updates button states and styles based on the current mode.
 */
const updateButtons = () => {
  const allButtons = [
    startStopBtn,
    RecordingPausePlay,
    startPlayback,
    playbackToggle,
    clearBtn,
  ];

  allButtons.forEach((btn) => {
    if (!btn) return;
    btn.disabled = true;
    btn.style.pointerEvents = "none";
    btn.style.opacity = "0.5";
  });

  switch (state.mode) {
    case "normal":
      if (startStopBtn) {
        const shouldDisable = state.recording.length > 0;

        startStopBtn.disabled = shouldDisable;
        startStopBtn.style.pointerEvents = shouldDisable ? "none" : "auto";
        startStopBtn.style.opacity = shouldDisable ? "0.5" : "1";
        startStopBtn.style.backgroundColor = colors.normal;
      }

      if (startPlayback && state.recording.length > 0) {
        startPlayback.disabled = false;
        startPlayback.style.pointerEvents = "auto";
        startPlayback.style.opacity = "1";
        startPlayback.style.backgroundColor = "green";
      }

      if (clearBtn && state.recording.length > 0) {
        clearBtn.disabled = false;
        clearBtn.style.pointerEvents = "auto";
        clearBtn.style.opacity = "1";
        clearBtn.style.backgroundColor = "red";
      }

      break;

    case "recording-progress":
    case "recording-paused":
      if (RecordingPausePlay) {
        RecordingPausePlay.disabled = false;
        RecordingPausePlay.style.pointerEvents = "auto";
        RecordingPausePlay.style.opacity = "1";
        RecordingPausePlay.style.backgroundColor = "orange";
      }

      if (startStopBtn) {
        startStopBtn.disabled = false;
        startStopBtn.style.pointerEvents = "auto";
        startStopBtn.style.opacity = "1";
      }
      break;

    case "playback-progress":
    case "playback-paused":
      if (playbackToggle) {
        playbackToggle.disabled = false;
        playbackToggle.style.pointerEvents = "auto";
        playbackToggle.style.opacity = "1";
        playbackToggle.style.backgroundColor = "orange";
      }

      if (clearBtn) {
        clearBtn.disabled = false;
        clearBtn.style.pointerEvents = "auto";
        clearBtn.style.opacity = "1";
      }
      break;
  }
};

/**
 * Dispatches an action to update state and refresh UI.
 * @param action - Action describing the state transition
 */
const dispatch = (action: Action) => {
  state = reducer(state, action);
  render();
  updateButtons();
};

/**
 * Active audio player instance.
 */
let player: Player | null = null;

/**
 * Playback timing state.
 */
let playbackStartTime = 0;
let playbackDuration = 0;
let rafId: number | null = null;

/**
 * Keyboard key to drum key mapping.
 */
const keyMap: Record<string, Keys> = {
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
 * Drum key to audio keyCode mapping.
 */
const keyCodeMap: Record<Keys, number> = {
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
 * Plays a sound and triggers visual animation for a given key.
 * @param keyCode - Keyboard keyCode
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
 * Removes animation class after key transition ends.
 */
document.querySelectorAll<HTMLElement>(".key").forEach((key) => {
  key.addEventListener("transitionend", (e) => {
    if (e.propertyName === "transform") {
      (e.target as HTMLElement).classList.remove("playing");
    }
  });
});

/**
 * Handles keyboard input for triggering sounds and recording beats.
 */
window.addEventListener("keydown", (e) => {
  const key = keyMap[e.key.toLowerCase()];
  if (!key) return;

  const now = Date.now();
  playSound(keyCodeMap[key]);

  if (state.mode === "recording-progress") {
    const adjustedTime = now - totalPausedTime;

    dispatch({
      type: "BEAT",
      data: { key, timeStamp: adjustedTime },
    });
  }
});

/**
 * Formats milliseconds into mm:ss format.
 * @param ms - Time in milliseconds
 * @returns Formatted string
 */
const formatTime = (ms: number) => {
  const totalSec = Math.floor(ms / 1000);
  const min = Math.floor(totalSec / 60);
  const sec = totalSec % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
};

/**
 * Updates playback progress UI using requestAnimationFrame.
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
 * Global control methods exposed to window.
 */
declare global {
  interface Window {
    toggleRecording: () => void;
    RecordingPauseResume: () => void;
    playRecording: () => void;
    playbackPauseResume: () => void;
    clearRecording: () => void;
  }
}

/**
 * Toggles recording state between start and stop.
 */
let isRecording = false;

window.toggleRecording = () => {
  const now = Date.now();
  if (!isRecording) {
    totalPausedTime = 0;
    pauseStart = 0;
    dispatch({ type: "START_RECORDING", timestamp: now });
    if (startStopBtn) {
      startStopBtn.innerText = "Stop Recording";
      startStopBtn.style.backgroundColor = colors[state.mode];
    }
    if (progressBar) progressBar.style.width = "0%";
    if (timerEl) timerEl.textContent = "0:00 / 0:00";
    isRecording = true;
  } else {
    dispatch({ type: "STOP_RECORDING" });
    if (startStopBtn) {
      startStopBtn.innerText = "Start Recording";
      startStopBtn.style.backgroundColor = colors[state.mode];
    }
    isRecording = false;
  }
};

/**
 * Toggles recording pause/resume.
 */
window.RecordingPauseResume = () => {
  const now = Date.now();

  if (state.mode === "recording-progress") {
    pauseStart = now;

    dispatch({ type: "PAUSE_RECORDING", timestamp: now });

    if (RecordingPausePlay) {
      RecordingPausePlay.innerText = "Record ▶";
    }
  } else if (state.mode === "recording-paused") {
    totalPausedTime += now - pauseStart;

    dispatch({ type: "CONTINUE_RECORDING", timestamp: now });

    if (RecordingPausePlay) {
      RecordingPausePlay.innerText = "Pause ||";
    }
  }
};

/**
 * Starts playback of recorded beats.
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
  if (playbackDuration < 500) playbackDuration = 500;

  player = new Player(recording, (beat) => {
    playSound(keyCodeMap[beat.key as Keys]);
  });

  player.play();
  startSmoothUI();
  updateButtons();
};

/**
 * Toggles playback pause/resume.
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

    const currentPercent = parseFloat(progressBar!.style.width) / 100;
    const resumeTime = currentPercent * playbackDuration;

    const recording = state.recording.map((b) => ({
      type: "beat" as const,
      beat: { key: b.key, timestamp: b.timeStamp },
    }));

    const firstBeatTime = recording[0].beat.timestamp;

    const normalized = recording.map((item) => ({
      ...item,
      beat: {
        ...item.beat,
        timestamp: item.beat.timestamp - firstBeatTime,
      },
    }));

    const remaining = normalized
      .filter((item) => item.beat.timestamp >= resumeTime)
      .map((item) => ({
        ...item,
        beat: {
          ...item.beat,
          timestamp: item.beat.timestamp - resumeTime,
        },
      }));

    player = new Player(remaining, (beat) => {
      playSound(keyCodeMap[beat.key as Keys]);
    });

    player.play();

    playbackStartTime = Date.now() - resumeTime;
    startSmoothUI();

    if (playbackToggle) playbackToggle.innerText = "Pause ||";
  }
};

/**
 * Clears the current recording and resets playback state.
 */
window.clearRecording = () => {
  if (!confirm("Are you sure you want to clear the current recording?")) return;

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
  totalPausedTime = 0;
  pauseStart = 0;

  alert("Recording cleared successfully!");
  updateButtons();
};

render();
updateButtons();
