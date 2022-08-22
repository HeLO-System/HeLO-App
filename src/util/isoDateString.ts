import { DateTime } from "luxon";

export const isoDateString = (value: string | number | Date) =>
  DateTime.fromJSDate(new Date(value)).toISODate();
