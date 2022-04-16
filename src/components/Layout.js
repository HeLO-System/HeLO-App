import React from "react";
import Search from "./Search";

function Layout({ children }) {
  return (
    <div>
      <Search />
      <main>{children}</main>
    </div>
  );
}

export default Layout;
