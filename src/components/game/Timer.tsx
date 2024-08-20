import { useState, useEffect } from "react";
import { secondsTo } from "@/lib/timing";
import { CardDescription } from "../ui/card";

interface TimerProps {
  origin: number;
}

const Timer: React.FC<TimerProps> = (props: TimerProps) => {
  const { origin } = props;
  const [time, setTime] = useState({
    start: origin,
    seconds: Math.round((Date.now() - origin) / 1000),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      const newTime = { ...time, seconds: time.seconds + 1 };
      setTime(newTime);
    }, 1000);

    return () => clearInterval(interval);
  }, [time]);

  return (
    <CardDescription className="text-right font-bold">
      {secondsTo(time.seconds)}
    </CardDescription>
  );
};

export default Timer;
