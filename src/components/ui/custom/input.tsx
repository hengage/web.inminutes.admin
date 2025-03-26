import * as React from "react";

import { Input } from "../input";
import { cn } from "@/lib/utils";

interface CustomInputProps extends React.ComponentProps<"input"> {
  slotBefore?: React.ReactNode;
  slotAfter?: React.ReactNode;
}

export function CustomInput({ slotBefore, slotAfter, ...props }: CustomInputProps) {
  return (
    <div className="relative">
      {slotBefore && (
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">{slotBefore}</div>
      )}
      <Input {...props} className={cn(props.className, { "px-10": slotBefore })} />
      {slotAfter && (
        <div className="absolute inset-y-0 right-[2%] flex items-center pl-3">{slotAfter}</div>
      )}
    </div>
  );
}
