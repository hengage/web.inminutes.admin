import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { DatePicker } from "@/components/ui/custom/date/DatePicker";
import { format } from "date-fns";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import PopOver from "@/components/ui/custom/PopOver";

interface DateRangePickerProps {
  fromDate?: Date;
  toDate?: Date;
  onApply: (fromDate: Date | null, toDate: Date | null) => void;
  className?: string;
}

const DateRangePicker: React.FC<DateRangePickerProps> = ({
  fromDate: initialFromDate,
  toDate: initialToDate,
  onApply,
  className,
}) => {
  const [fromDate, setFromDate] = useState<Date | undefined>(initialFromDate);
  const [toDate, setToDate] = useState<Date | undefined>(initialToDate);

  useEffect(() => {
    setFromDate(initialFromDate);
    setToDate(initialToDate);
  }, [initialFromDate, initialToDate]);

  const handleApply = () => {
    onApply(fromDate || null, toDate || null);
  };

  const handleClear = () => {
    setFromDate(undefined);
    setToDate(undefined);
    onApply(null, null);
  };

  const getButtonText = () => {
    if (fromDate && toDate) {
      return `${format(fromDate, "dd MMM yyyy")} - ${format(toDate, "dd MMM yyyy")}`;
    } else if (fromDate) {
      return `From: ${format(fromDate, "dd MMM yyyy")}`;
    } else if (toDate) {
      return `To: ${format(toDate, "dd MMM yyyy")}`;
    }
    return "Date";
  };

  return (
    <PopOver
      trigger={
        <Button variant="secondary" className={`gap-2 ${className}`}>
          <span className="truncate">{getButtonText()}</span>
          <ChevronDown className="w-4 h-4 shrink-0" />
        </Button>
      }
      className="bg-white border border-gray-200 rounded-2xl p-4 w-full max-w-md"
    >
      <div className="flex flex-col gap-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">From Date</span>
            <DatePicker
              value={fromDate}
              onSelect={(date) => setFromDate(date || undefined)}
              trigger={
                <Button variant="outline" className="w-full justify-between">
                  {fromDate ? format(fromDate, "dd MMM yyyy") : "Select start date"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              }
            />
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-medium text-gray-700">To Date</span>
            <DatePicker
              value={toDate}
              onSelect={(date) => setToDate(date || undefined)}
              trigger={
                <Button variant="outline" className="w-full justify-between">
                  {toDate ? format(toDate, "dd MMM yyyy") : "Select end date"}
                  <ChevronDown className="h-4 w-4" />
                </Button>
              }
            />
          </div>
        </div>

        <div className="flex justify-end gap-2 border-t pt-4 border-gray-100">
          <PopoverClose asChild>
            <Button onClick={handleClear} variant="outline">
              Clear
            </Button>
          </PopoverClose>
          <PopoverClose asChild>
            <Button onClick={handleApply} variant="default">
              Apply
            </Button>
          </PopoverClose>
        </div>
      </div>
    </PopOver>
  );
};

export default DateRangePicker;
