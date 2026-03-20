/**
 * Allowed keyboard keys for drum beats
 */
type keys = "A" | "S" | "D" | "F" | "G" | "H" | "J" | "K" | "L";

/**
 * Action to record a beat press
 */
type BeatAction = {
  type: "BEAT";
  data: {
    key: keys;
  };
};

/**
 * Action to start recording beats
 */
type StartRecordingAction = {
  type: "START_RECORDING";
  timestamp: number;
};

/**
 * Action to pause recording
 */
type PauseRecordingAction = {
  type: "PAUSE_RECORDING";
};

/**
 * Action to resume recording
 */
type ContinueRecordingAction = {
  type: "CONTINUE_RECORDING";
};

/**
 * Action to stop recording and save it
 */
type StopRecordingAction = {
  type: "STOP_RECORDING";
};

/**
 * Action to start playback of recorded beats
 */
type StartPlaybackAction = {
  type: "START_PLAYBACK";
};

/**
 * Action to pause playback
 */
type PausePlaybackAction = {
  type: "PAUSE_PLAYBACK";
};

/**
 * Action to resume playback
 */
type ContinuePlaybackAction = {
  type: "CONTINUE_PLAYBACK";
};

/**
 * Action to stop playback
 */
type StopPlaybackAction = {
  type: "STOP_PLAYBACK";
};

/**
 * Action to clear all recordings
 */
type ClearRecordingAction = {
  type: "CLEAR_RECORDING";
};

/**
 * Union type of all possible actions
 */
type Action =
  | StartRecordingAction
  | BeatAction
  | PauseRecordingAction
  | ContinueRecordingAction
  | StopRecordingAction
  | StartPlaybackAction
  | PausePlaybackAction
  | ContinuePlaybackAction
  | StopPlaybackAction
  | ClearRecordingAction;

/**
 * Represents the current mode of the application
 */
type Mode =
  | "normal"
  | "recording-progress"
  | "recording-paused"
  | "playback-progress"
  | "playback-paused";

/**
 * Represents a single recorded beat
 */
interface Beat {
  key: keys;
  timeStamp: number; // time relative to recording start
}

/**
 * Shape of the Redux state
 */
interface State {
  mode: Mode;
  currentRecordings: Beat[]; // beats being recorded currently
  recordings: Beat[]; // saved recording
  startTime: number | null; // recording start timestamp
}

/**
 * Initial state of the application
 */
const initialState: State = {
  mode: "normal",
  currentRecordings: [],
  recordings: [],
  startTime: null,
};

/**
 * Reducer function to handle drumkit state transitions
 *
 * @param state - Current application state
 * @param action - Dispatched action
 * @returns Updated state
 */
const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    /**
     * Start a new recording session
     */
    case "START_RECORDING":
      return {
        ...state,
        mode: "recording-progress",
        startTime: action.timestamp,
        currentRecordings: [],
      };

    /**
     * Record a beat with timestamp relative to start
     */
    case "BEAT":
      if (state.mode !== "recording-progress" || state.startTime == null) {
        return state;
      }
      return {
        ...state,
        currentRecordings: [
          ...state.currentRecordings,
          {
            key: action.data.key,
            timeStamp: Date.now() - state.startTime,
          },
        ],
      };

    /**
     * Pause recording
     */
    case "PAUSE_RECORDING":
      if (state.mode !== "recording-progress") return state;
      return {
        ...state,
        mode: "recording-paused",
      };

    /**
     * Resume recording
     */
    case "CONTINUE_RECORDING":
      if (state.mode !== "recording-paused") return state;
      return {
        ...state,
        mode: "recording-progress",
      };

    /**
     * Stop recording and save beats
     */
    case "STOP_RECORDING":
      if (state.mode === "normal") return state;
      return {
        ...state,
        mode: "normal",
        recordings: state.currentRecordings,
        currentRecordings: [],
        startTime: null,
      };

    /**
     * Start playback of saved recording
     */
    case "START_PLAYBACK":
      if (state.recordings.length === 0) return state;
      return {
        ...state,
        mode: "playback-progress",
      };

    /**
     * Pause playback
     */
    case "PAUSE_PLAYBACK":
      if (state.mode !== "playback-progress") return state;
      return {
        ...state,
        mode: "playback-paused",
      };

    /**
     * Resume playback
     */
    case "CONTINUE_PLAYBACK":
      if (state.mode !== "playback-paused") return state;
      return {
        ...state,
        mode: "playback-progress",
      };

    /**
     * Stop playback and return to normal
     */
    case "STOP_PLAYBACK":
      return {
        ...state,
        mode: "normal",
      };

    /**
     * Clear all recordings and reset state
     */
    case "CLEAR_RECORDING":
      return initialState;

    /**
     * Default case ensures reducer always returns state
     */
  }
};
