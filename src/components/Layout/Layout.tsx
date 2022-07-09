import { FCC } from "@types";
import { NavBar } from "./Navbar";

export const Layout: FCC = ({ children }) => (
  <>
    <NavBar />
    <main className="overflow-x-auto h-full">{children}</main>
  </>
);
