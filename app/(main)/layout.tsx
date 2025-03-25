import React from "react";
import Provider from "./provider";

function WorkspaceLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="overflow-hidden">
      <div className="animated-bg fixed -z-10 inset-0 opacity-100" />
      <Provider>{children}</Provider>
    </div>
  );
}

export default WorkspaceLayout;
