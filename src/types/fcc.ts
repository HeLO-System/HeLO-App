import { FC, ReactNode } from "react";

/**
 * React function component with children
 */
export type FCC<P = object> = FC<P & { children: ReactNode }>;
