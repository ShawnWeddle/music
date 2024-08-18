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