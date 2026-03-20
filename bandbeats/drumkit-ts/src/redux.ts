type keys = "A" | "S" | "D" | "F" | "G" | "H" | "J" | "K" | "L";

type BeatAction = {
  type: "BEAT";
  data: {
    key: keys;
  };
};

type StartRecordingAction = {
  type: "START_RECORDING";
  timestamp: number;
};

type PauseRecordingAction = {
  type: "PAUSE_RECORDING";
};

type ContinueRecordingAction = {
  type: "CONTINUE_RECORDING";
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

type Mode =
  | "normal"
  | "recording-progress"
  | "recording-paused"
  | "playback-progress"
  | "playback-paused";

interface Beat {
  key: keys;
  timeStamp: number;
}

interface State {
  mode: Mode;
  currentRecordings: Beat[];
  recordings: Beat[];
  startTime: number | null;
}

const initialState: State = {
  mode: "normal",
  currentRecordings: [],
  recordings: [],
  startTime: null,
};

const reducer = (state = initialState, action: Action): State => {
  switch (action.type) {
    case "START_RECORDING":
      return {
        ...state,
        mode: "recording-progress",
        startTime: action.timestamp,
        currentRecordings: [],
      };

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

    case "PAUSE_RECORDING":
      if (state.mode !== "recording-progress") return state;
      return {
        ...state,
        mode: "recording-paused",
      };

    case "CONTINUE_RECORDING":
      if (state.mode !== "recording-paused") return state;
      return {
        ...state,
        mode: "recording-progress",
      };

    case "STOP_RECORDING":
      if (state.mode === "normal") return state;
      return {
        ...state,
        mode: "normal",
        recordings: state.currentRecordings,
        currentRecordings: [],
        startTime: null,
      };

    case "START_PLAYBACK":
      if (state.recordings.length === 0) return state;
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

    case "CLEAR_RECORDING":
      return initialState;

    default:
      return state;
  }
};
