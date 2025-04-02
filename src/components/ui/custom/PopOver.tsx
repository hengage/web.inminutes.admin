import { Icon } from "../Icon";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Button } from "../button";
import { cn } from "@/lib/utils";

export interface PopOverProps {
  children: React.ReactNode;
  trigger?: React.ReactNode;
  className?: string;
}

const PopOver = ({ children, trigger, className }: PopOverProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        {trigger ? (
          trigger
        ) : (
          <Button
            aria-label="question actions"
            className="rounded-full"
            variant={"ghost"}
            size={"icon"}
          >
            <Icon width={32} height={32} name="see-more" />
          </Button>
        )}
      </PopoverTrigger>
      <PopoverContent align="start" sideOffset={1} side="bottom" asChild>
        <div
          className={cn("max-w-[200px] rounded-md p-2 bg-white flex flex-col gap-2.5", className)}
        >
          {children}
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
