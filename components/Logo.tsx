import { PiggyBank } from "lucide-react";
import React from "react";

type Props = {
  className?: string
}

function Logo({className}:Props) {
  return (
    <div className={`${className}`}>
      <a href="/" className="flex items-center gap-1">
        <PiggyBank className="stroke h-11 w-11 stroke-purple-500 stroke-[1.5]" />
        <p className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
          BobdgetTracker
        </p>
      </a>
    </div>
  );
}

export function LogoMobile({ className }: Props) {
  return (
    <div className={`${className}`}>
      <a href="/" className="flex items-center gap-1">
        <p className="bg-gradient-to-r from-purple-400 to-orange-500 bg-clip-text text-3xl font-bold leading-tight tracking-tighter text-transparent">
          BobdgetTracker
        </p>
      </a>
    </div>
  );
}

export default Logo;
