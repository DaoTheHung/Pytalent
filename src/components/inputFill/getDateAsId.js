import { addZ } from "./addZeroDate";
export const datesFormat = (startDate) => {
  // The number of milliseconds in all UTC days (no DST)
  const datePart = startDate.split("/");
  const year = datePart[2].split(" ");
  const StartDate = new Date(+year[0], datePart[1] - 1, +datePart[0]);

  // A day in UTC always lasts 24 hours (unlike in other time formats)
  return (
    addZ(StartDate.getDate()) +
    " " +
    StartDate.toLocaleString("en-us", { month: "short" }) +
    " " +
    StartDate.getFullYear()
  );
};
