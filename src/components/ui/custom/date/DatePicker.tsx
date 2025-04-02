"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import PopOver, { PopOverProps } from "../PopOver";

interface DatePickerProps extends Omit<PopOverProps, "children"> {
  header?: boolean;
  triggerclassName?: string;
  placeholder?: string;
}

export function DatePicker({
  header = false,
  triggerclassName,
  placeholder,
  ...props
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  return (
    <PopOver
      trigger={
        props.trigger ?? (
          <Button
            variant={"outline"}
            className={cn(
              "w-[280px] justify-start text-left font-normal",
              !date && "text-muted-foreground",
              triggerclassName
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {date ? format(date, "PPP") : <span>{placeholder ?? "Pick a date"}</span>}
          </Button>
        )
      }
      className="w-auto p-0 max-w-full"
    >
      <Calendar
        header={
          header ? (
            <div className="flex justify-center items-center gap-1">
              <span className="border border-ctm-secondary-100 px-2 py-1 rounded-sm h-[2rem] min-w-[5rem] block">
                {date ? format(date, "PPP") : null}
              </span>{" "}
              <Button variant={"secondary"}>Today</Button>
            </div>
          ) : null
        }
        mode="single"
        selected={date}
        onSelect={setDate}
        {...props}
        initialFocus
      />
    </PopOver>
  );
}
