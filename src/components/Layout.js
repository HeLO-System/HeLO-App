import React from "react";

function Layout({ children }) {
  return (
    <div>
      <main className="overflow-x-auto">{children}</main>
    </div>
  );
}

export default Layout;
