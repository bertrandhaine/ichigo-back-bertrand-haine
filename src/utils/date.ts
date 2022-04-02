/**
 * Find the first and the last day of the week based on the given date. First day of the week is Sunday.
 * @param d Date object
 * @returns
 */
export function getFirstAndLastDayOfWeek(d: Date): [Date, Date] {
  // clone date object, so we don't mutate it
  const date = new Date(d);
  date.setUTCHours(0, 0, 0, 0);
  const day = date.getDay(); // get day of week

  // (day of month - day of week) returns the first day of the week...
  const firstDayDiff = date.getDate() - day;
  // ...and (day of month + day of week) -> the last day
  const lastDayDiff = date.getDate() + (6 - day);

  const firstDay = new Date(date.setDate(firstDayDiff));
  const lastDay = new Date(date.setDate(lastDayDiff));

  return [firstDay, lastDay];
}

/**
 * Compare two dates without taking into account the time. Just the date part.
 * @param date1 Date to compare
 * @param date2 Date to compare with
 * @returns
 */
export function compareDateWithoutTime(date1: Date, date2: Date): boolean {
  const date1WithoutTime = new Date(date1);
  date1WithoutTime.setUTCHours(0, 0, 0, 0);

  const date2WithoutTime = new Date(date2);
  date2WithoutTime.setUTCHours(0, 0, 0, 0);

  return date1WithoutTime.getTime() === date2WithoutTime.getTime();
}
