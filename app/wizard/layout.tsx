import React, { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

function layout({ children }: Props) {
  return (
    <div className="relative flex h-screen w-full items-center justify-center px-10">
      {children}
    </div>
  );
}

export default layout;
