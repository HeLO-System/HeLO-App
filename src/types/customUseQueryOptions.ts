import { UseQueryOptions } from "@tanstack/react-query";

export type CustomUseQueryOptions<T, K = T> = UseQueryOptions<
  T,
  unknown,
  K,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  any[] | any
>;
