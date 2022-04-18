/**
 * Returns an array of size 'size' filled with ascending numbers from starting with 'startAt'
 *
 * @param size the size of the generated array
 * @param startAt the starting index
 * @returns array filled with ascending numbers
 */
export function range(size: number, startAt = 0): number[] {
  const r = [...Array(size).keys()];
  if (startAt) {
    return r.map((i: number) => i + startAt);
  }
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return r;
}
