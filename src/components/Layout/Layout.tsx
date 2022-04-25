import React, { FC } from "react";

export const Layout: FC = ({ children }) => (
  <main className="overflow-x-auto h-full">{children}</main>
);
