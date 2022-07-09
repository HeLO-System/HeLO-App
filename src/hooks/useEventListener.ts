import { useEffect, useRef } from "react";

export type EventListener<K extends keyof WindowEventMap> = (
  ev: WindowEventMap[K]
) => void;

// Hook
export function useEventListener<K extends keyof WindowEventMap>(
  type: K,
  listener: EventListener<K>
): void {
  // Create a ref that stores handler
  const savedListener = useRef<EventListener<K>>(() => null);

  // Update ref.current value if handler changes.
  // This allows our effect below to always get latest handler ...
  // ... without us needing to pass it in effect deps array ...
  // ... and potentially cause effect to re-run every render.
  useEffect(() => {
    savedListener.current = listener;
  }, [listener]);

  useEffect(
    () => {
      const eventListener: EventListener<K> = (event) => {
        savedListener.current(event);
      };

      // Add event listener
      window.addEventListener(type, eventListener);

      // Remove event listener on cleanup
      return () => {
        window.removeEventListener(type, eventListener);
      };

      // Create event listener that calls handler function stored in ref
    },
    [type] // Re-run if eventName or element changes
  );
}
