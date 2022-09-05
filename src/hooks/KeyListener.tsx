import { useEventListener } from "usehooks-ts";

export const useKeyListener = (
  code: string | string[],
  callback: (event: KeyboardEvent) => void
) =>
  useEventListener("keydown", (event: KeyboardEvent) => {
    if (
      typeof code === "string" ? event.code === code : code.includes(event.code)
    ) {
      callback(event);
    }
  });
