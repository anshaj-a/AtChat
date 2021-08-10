export const timestampToDate = (time: string): string => {
  const dateObj: Date = new Date(time);
  let date: string = dateObj.toUTCString();
  let dateTime: string[] = date.split(' ');
  let Day: string = dateTime[0];
  let Time = dateTime[4].slice(0, 5);

  const formattedTime: string = Day + ' ' + Time;
  return formattedTime;
};
