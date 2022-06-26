import { FC } from "react";
import { NavBar } from "./Navbar";

export const Layout: FC = ({ children }) => (
  <>
    <NavBar />
    <main className="overflow-x-auto h-full">{children}</main>
  </>
);
