/**
 * Represents a single beat event
 */
type Beat = { key: string; timestamp: number };

/**
 * Represents a pause event (only start is stored)
 */
type Pause = {
  start: number;
};

/**
 * Recording event type (either beat or pause)
 */
type Recording = { type: "beat"; beat: Beat } | { type: "pause"; pause: Pause };

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
  /** Registered listeners for playback updates */
  listeners: Listener[] = [];

  /** Active playback timers */
  sheduledPlaybackTimers: Timeout[] = [];

  /** Current beat index */
  beatIndex: number = 0;

  /**
   * Total number of beats in recording
   */
  get totalBeats() {
    return this.recording.filter((e) => e.type === "beat").length;
  }

  /**
   * @param recording - list of recorded events (beats + pauses)
   * @param playback - callback to execute when a beat plays
   */
  constructor(
    private recording: Recording[],
    private playback: (beat: Beat) => void,
  ) {}

  /**
   * Subscribe to playback updates
   * @param listener - callback triggered on each beat
   */
  subscribe(listener: Listener) {
    this.listeners.push(listener);
  }

  /**
   * Remove a previously subscribed listener
   * @param listener - listener to remove
   */
  unsubscribe(listener: Listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  /**
   * Notify all listeners about playback progress
   */
  notify() {
    this.listeners.forEach((l) => l(this.beatIndex, this.totalBeats));
  }

  /**
   * Normalize beats by:
   * 1. Removing paused durations
   * 2. Rebasing timestamps so first beat starts at 0
   *
   * @param recordings - list of recording events
   * @returns normalized list of beats
   */
  private normaliseBeats(recordings: Recording[]): Beat[] {
    let pausedSoFar = 0;
    let result: Beat[] = [];

    for (let i = 0; i < recordings.length; i++) {
      const event = recordings[i];

      if (event.type === "pause") {
        let nextBeat = recordings.slice(i + 1).find((e) => e.type === "beat");

        if (nextBeat && nextBeat.type === "beat") {
          pausedSoFar += nextBeat.beat.timestamp - event.pause.start;
        }
      } else {
        result.push({
          key: event.beat.key,
          timestamp: event.beat.timestamp - pausedSoFar,
        });
      }
    }

    if (result.length === 0) {
      return result;
    }

    const firstTimeStamp = result[0].timestamp;

    return result.map((beat) => ({
      ...beat,
      timestamp: beat.timestamp - firstTimeStamp,
    }));
  }

  /**
   * Start playback of recorded beats
   *
   * Steps:
   * 1. Normalize beats
   * 2. Schedule timers for each beat
   * 3. Trigger playback callback
   * 4. Notify listeners
   */
  play() {
    if (this.totalBeats === 0) {
      return;
    }

    this.pause();

    const beats = this.normaliseBeats(this.recording);

    if (this.beatIndex >= beats.length) {
      this.beatIndex = 0;
    }

    const base = beats[this.beatIndex]?.timestamp || 0;

    for (let i = this.beatIndex; i < beats.length; i++) {
      const beat = beats[i];

      const delay = beat.timestamp - base;

      const timer = setTimeout(() => {
        this.playback(beat);
        this.beatIndex = i + 1;
        this.notify();
      }, delay);

      this.sheduledPlaybackTimers.push(timer);
    }
  }

  /**
   * Pause playback by clearing all scheduled timers
   */
  pause() {
    this.sheduledPlaybackTimers.forEach((timer) => clearTimeout(timer));
    this.sheduledPlaybackTimers = [];
  }
}
