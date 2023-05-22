import { addZ } from "./addZeroDate";
export const daysFormat = (end_date) => {
  // The number of milliseconds in all UTC days (no DST)

  const oneDay = 1000 * 60 * 60 * 24;
  const datePart = end_date.split("/");
  const year = datePart[2].split(" ");
  const StartDate = new Date(+year[0], datePart[1] - 1, +datePart[0]);
  const EndDate = new Date();

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  const end = Date.UTC(
    EndDate.getFullYear(),
    EndDate.getMonth(),
    EndDate.getDate()
  );
  const start = Date.UTC(
    StartDate.getFullYear(),
    StartDate.getMonth(),
    StartDate.getDate()
  );
  if ((start - end) / oneDay < 0) {
    return (end_date = 0);
  }
  // so it's safe to divide by 24 hours
  return (start - end) / oneDay;
};
