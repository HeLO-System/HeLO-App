export const remToPx = (rem: number): number =>
  rem * parseInt(getComputedStyle(document.documentElement).fontSize, 10);
