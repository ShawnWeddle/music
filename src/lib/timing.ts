export function ordinate(num:number): String {
  const numToString = num.toString();
  switch(num){
    case 1:
    case 21:
      return numToString + "st";
    case 2:
    case 22:
      return numToString + "nd";
    case 3:
    case 23:
      return numToString + "rd";
    default:
      return numToString + "th";
  } 
}

export function secondsTo(num:number): String {
  const minutes = Math.floor((num/60)).toString();
  const leftoverSeconds = num % 60;
  const lst = leftoverSeconds < 10 ? "0"+leftoverSeconds.toString() : leftoverSeconds.toString()
  return minutes + ":" + lst;
}

export function millisecondsTo(num:number): String {
  const minutes = Math.floor((num/60000)).toString();
  const leftoverMilliseconds = num % 60000;
  const leftoverSeconds = leftoverMilliseconds / 1000;
  const lst = leftoverSeconds < 10 ? "0"+leftoverSeconds.toFixed(3) : leftoverSeconds.toFixed(3)
  return minutes + ":" + lst;
}

export function finalTime(startTime: number, endTime: number, penalties: number) {
  const subTime = endTime - startTime; // In milliseconds
  const penaltyTime = penalties * 5000;
  const totalTime = subTime + penaltyTime;
  return {
    subTime,
    penaltyTime,
    totalTime,
  }
}