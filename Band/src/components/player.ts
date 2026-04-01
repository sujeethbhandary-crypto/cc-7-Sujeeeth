/**
 * Represents a single beat event
 */
export type Beat = {
  key: string;
  timestamp: number;
};

/**
 * Represents a pause event (only start is stored)
 */
export type Pause = {
  start: number;
};

/**
 * Recording event type (either beat or pause)
 */
export type Recording =
  | { type: "beat"; beat: Beat }
  | { type: "pause"; pause: Pause };

/**
 * Listener callback for playback updates
 * @param beatIndex - current beat index
 * @param totalBeats - total number of beats
 */
type Listener = (beatIndex: number, totalBeats: number) => void;

/**
 * Timeout type for scheduled playback timers
 */
type Timeout = ReturnType<typeof setTimeout>;

/**
 * Player class handles playback of recorded beats
 * with pause handling, normalization, and scheduling
 */
export class Player {
  /** Current beat index */
  private beatIndex: number = 0;

  /** Recorded events (beats + pauses) */
  private recording: Recording[];

  /** Callback to execute when a beat plays */
  private playback: (beat: Beat) => void;

  /** Registered listeners for playback updates */
  private listeners: Listener[] = [];

  /** Active playback timers */
  private scheduledPlaybackTimers: Timeout[] = [];

  /**
   * Total number of beats in recording
   * @param recording - list of recorded events (beats + pauses)
   * @param playback - callback to execute when a beat plays
   */
  constructor(recording: Recording[], playback: (beat: Beat) => void) {
    this.recording = recording;
    this.playback = playback;
  }

  /**
   * Subscribe to playback updates
   */
  onBeat(listener: Listener) {
    this.listeners.push(listener);
  }

  /**
   * Start playback of recording
   */
  play() {
    this.stop(); // reset any previous playback
    const totalBeats = this.recording.filter((r) => r.type === "beat").length;
    const startTime =
      this.recording[0]?.type === "beat" ? this.recording[0].beat.timestamp : 0;

    this.recording.forEach((item) => {
      if (item.type === "beat") {
        const delay = item.beat.timestamp - startTime;
        const timer = setTimeout(() => {
          this.playback(item.beat);
          this.listeners.forEach((fn) => fn(this.beatIndex, totalBeats));
          this.beatIndex++;
        }, delay);
        this.scheduledPlaybackTimers.push(timer);
      }
    });
  }

  /**
   * Pause playback
   */
  pause() {
    this.scheduledPlaybackTimers.forEach((timer) => clearTimeout(timer));
    this.scheduledPlaybackTimers = [];
  }

  /**
   * Stop playback completely
   */
  stop() {
    this.pause();
    this.beatIndex = 0;
    this.listeners = [];
  }
}
