import { PiggyBank } from "lucide-react";
import React from "react";

function Logo() {
  return (
    <a href="/" className="flex items-center gap-1">
      <PiggyBank className="stroke h-11 w-11 stroke-purple-500 stroke-[1.5]" />
      <p className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BobdgetTracker
      </p>
    </a>
  );
}

export function LogoMobile() {
  return (
    <a href="/" className="flex items-center gap-1">
      <p className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
        BobdgetTracker
      </p>
    </a>
  );
}

export default Logo;
