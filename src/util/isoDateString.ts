export const isoDateString = (value: string | number | Date) =>
  new Date(value).toISOString().split("T")[0];
