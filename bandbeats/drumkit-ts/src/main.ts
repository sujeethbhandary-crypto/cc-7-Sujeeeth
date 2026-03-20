type Beat = {
  keyCode: number;
  time: number;
};

let recording: Beat[] = [];
let isRecording = false;
let startTime = 0;

/**
 * Play sound + record
 */
function playSound(e: KeyboardEvent) {
  const keyCode = e.keyCode;

  const audio = document.querySelector(
    `audio[data-key="${keyCode}"]`,
  ) as HTMLAudioElement | null;

  const key = document.querySelector(
    `.key[data-key="${keyCode}"]`,
  ) as HTMLElement | null;

  if (!audio || !key) return;

  key.classList.add("playing");

  audio.currentTime = 0;
  audio.play();

  // 🎯 RECORD LOGIC
  if (isRecording) {
    recording.push({
      keyCode,
      time: Date.now() - startTime,
    });
  }
}

/**
 * Remove animation
 */
function removeTransition(e: TransitionEvent) {
  if (e.propertyName !== "transform") return;
  (e.target as HTMLElement).classList.remove("playing");
}

/**
 * Recording Controls
 */
function startRecording() {
  recording = [];
  isRecording = true;
  startTime = Date.now();
}

function pauseRecording() {
  isRecording = false;
}

function resumeRecording() {
  isRecording = true;
  startTime = Date.now() - (recording.at(-1)?.time || 0);
}

/**
 * Playback
 */
function playRecording() {
  recording.forEach((beat) => {
    setTimeout(() => {
      const audio = document.querySelector(
        `audio[data-key="${beat.keyCode}"]`,
      ) as HTMLAudioElement | null;

      const key = document.querySelector(
        `.key[data-key="${beat.keyCode}"]`,
      ) as HTMLElement | null;

      if (!audio || !key) return;

      key.classList.add("playing");
      audio.currentTime = 0;
      audio.play();
    }, beat.time);
  });
}

/**
 * Storage
 */
function saveRecording() {
  localStorage.setItem("drum-recording", JSON.stringify(recording));
}

function loadRecording() {
  const data = localStorage.getItem("drum-recording");
  if (data) recording = JSON.parse(data);
}

function clearRecording() {
  recording = [];
  localStorage.removeItem("drum-recording");
}

/**
 * Init
 */
function init() {
  loadRecording();

  window.addEventListener("keydown", playSound);

  document.querySelectorAll(".key").forEach((key) => {
    key.addEventListener("transitionend", removeTransition);
  });

  // Controls
  document.getElementById("record")?.addEventListener("click", startRecording);
  document.getElementById("pause")?.addEventListener("click", pauseRecording);
  document.getElementById("resume")?.addEventListener("click", resumeRecording);
  document.getElementById("play")?.addEventListener("click", playRecording);
  document.getElementById("clear")?.addEventListener("click", clearRecording);
}

init();
