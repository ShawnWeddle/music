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