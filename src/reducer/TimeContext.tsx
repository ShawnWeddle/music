"use client";
import { createContext, useReducer, useContext } from "react";

export const TimeContext = createContext<ContextType | null>(null);

type ContextType = {
  timeState: TimeReducerState;
  timeDispatch: React.Dispatch<TimeReducerAction>;
};

type TimeContextProviderProps = {
  children: React.ReactNode;
};

type TimeReducerState = {
  start: number;
  end: number;
  seconds: number;
  penalties: number;
};
type TimeReducerAction = "INIT" | "START_CLOCK" | "NEW_SECOND" | "WRONG_ANSWER";

export const timeReducer = (
  state: TimeReducerState,
  action: TimeReducerAction
): TimeReducerState => {
  switch (action) {
    case "INIT":
      return {
        start: 0,
        end: 0,
        seconds: 0,
        penalties: 0,
      };
    case "START_CLOCK":
      return {
        ...state,
        start: Date.now(),
      };
    case "NEW_SECOND":
      return {
        ...state,
        seconds:
          Math.round((Date.now() - state.start) / 1000) + 5 * state.penalties,
      };
    case "WRONG_ANSWER":
      return {
        ...state,
        penalties: state.penalties + 1,
        seconds: state.seconds + 5,
      };
    default:
      return state;
  }
};

export const TimeContextProvider = ({ children }: TimeContextProviderProps) => {
  const [timeState, timeDispatch] = useReducer(timeReducer, {
    start: 0,
    end: 0,
    seconds: 0,
    penalties: 0,
  });

  return (
    <TimeContext.Provider value={{ timeState, timeDispatch }}>
      {children}
    </TimeContext.Provider>
  );
};

export const useTimeContext = () => {
  const context = useContext(TimeContext);

  if (!context) {
    throw Error("useTimeContext must be used inside an TimeContextProvider");
  }

  return context;
};
