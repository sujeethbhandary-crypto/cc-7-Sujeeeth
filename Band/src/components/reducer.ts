/**
 * Allowed keyboard keys for drum beats
 */
export type Keys = "A" | "S" | "D" | "F" | "G" | "H" | "J" | "K" | "L";

/**
 * A single beat event
 */
export type Beat = {
  key: Keys;
  timeStamp: number;
};

/**
 * Application modes
 */
export type Mode =
  | "normal"
  | "recording-progress"
  | "recording-paused"
  | "playback-progress"
  | "playback-paused";

/**
 * Actions
 */
type StartRecordingAction = {
  type: "START_RECORDING";
  timestamp: number;
};

type BeatAction = {
  type: "BEAT";
  data: Beat;
};

type PauseRecordingAction = {
  type: "PAUSE_RECORDING";
  timestamp: number;
};

type ContinueRecordingAction = {
  type: "CONTINUE_RECORDING";
  timestamp: number;
};

type StopRecordingAction = {
  type: "STOP_RECORDING";
};

type StartPlaybackAction = {
  type: "START_PLAYBACK";
};

type PausePlaybackAction = {
  type: "PAUSE_PLAYBACK";
};

type ContinuePlaybackAction = {
  type: "CONTINUE_PLAYBACK";
};

type StopPlaybackAction = {
  type: "STOP_PLAYBACK";
};

type ClearRecordingAction = {
  type: "CLEAR_RECORDING";
};

/**
 * Union type of all possible actions
 */
export type Action =
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
 * State interface
 */
export interface State {
  mode: Mode;
  recording: Beat[];
  startTime: number | null; // recording start timestamp
  pauseTime: number | null;
}

/**
 * Initial state
 */
export const initialState: State = {
  mode: "normal",
  recording: [],
  startTime: null,
  pauseTime: null,
};

/**
 * Reducer function
 */
export const reducer = (state: State = initialState, action: Action): State => {
  switch (action.type) {
    case "START_RECORDING":
      return {
        ...state,
        mode: "recording-progress",
        startTime: action.timestamp,
        pauseTime: null,
        recording: [],
      };

    case "BEAT":
      if (state.mode !== "recording-progress") return state;
      return {
        ...state,
        recording: [...state.recording, action.data],
      };

    case "PAUSE_RECORDING":
      if (state.mode !== "recording-progress") return state;
      return {
        ...state,
        mode: "recording-paused",
        pauseTime: action.timestamp,
      };

    case "CONTINUE_RECORDING":
      if (state.mode !== "recording-paused" || state.pauseTime == null)
        return state;
      const pauseDuration = action.timestamp - state.pauseTime;
      return {
        ...state,
        mode: "recording-progress",
        startTime: (state.startTime ?? 0) + pauseDuration,
        pauseTime: null,
      };

    case "STOP_RECORDING":
      return {
        ...state,
        mode: "normal",
        startTime: null,
        pauseTime: null,
      };

    case "CLEAR_RECORDING":
      return {
        ...state,
        mode: "normal",
        recording: [],
        startTime: null,
        pauseTime: null,
      };

    // Playback cases (simplified for now)
    case "START_PLAYBACK":
      return {
        ...state,
        mode: "playback-progress",
      };

    case "PAUSE_PLAYBACK":
      if (state.mode !== "playback-progress") return state;
      return {
        ...state,
        mode: "playback-paused",
      };

    case "CONTINUE_PLAYBACK":
      if (state.mode !== "playback-paused") return state;
      return {
        ...state,
        mode: "playback-progress",
      };

    case "STOP_PLAYBACK":
      return {
        ...state,
        mode: "normal",
      };

    default:
      return state;
  }
};
