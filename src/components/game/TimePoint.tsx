"use client";
import { useState, useEffect } from "react";
import { useTimeContext } from "@/reducer/TimeContext";
import { GameModeType } from ".";
import { secondsTo } from "@/lib/timing";

interface TimeBarProps {
  mode: GameModeType;
}

const TimeBar: React.FC<TimeBarProps> = (props: TimeBarProps) => {
  const { timeDispatch, timeState } = useTimeContext();
  const [gameMode, setGameMode] = useState(props.mode);

  const intervalCatch = () => {
    setInterval(() => {
      timeDispatch("NEW_SECOND");
    }, 1000);
  };

  useEffect(() => {
    timeDispatch("INIT");

    if (gameMode === "Mid") {
      timeDispatch("START_CLOCK");
      intervalCatch();
    }
  }, []);

  return (
    <div className="w-full text-right">
      {gameMode === "Mid" ? secondsTo(timeState.seconds) : "0:59"}
    </div>
  );
};

export default TimeBar;
