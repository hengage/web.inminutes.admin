"use client";
import * as Tabs from "@radix-ui/react-tabs";
import { cn } from "@/lib/utils";
import React from "react";

interface TabProps {
  items: TabItem[];
  direction?: "horizontal" | "vertical";
  className?: string;
  extranode?: React.ReactNode;
  value?: string | undefined;
  onValueChange?: (value: string) => void;
}

export interface TabItem {
  trigger: React.ReactNode;
  key: string;
  content: React.ReactNode;
  controlled?: boolean;
}

const Tab = React.forwardRef<HTMLDivElement, TabProps>(
  ({ items, direction = "horizontal", className, value, extranode, onValueChange }, ref) => {
    return (
      <Tabs.Root
        className="flex flex-col"
        orientation={direction}
        defaultValue={items[0]?.key}
        value={value}
        ref={ref}
        onValueChange={(value) => onValueChange?.(value)}
      >
        <Tabs.List
          className={cn(
            "flex shrink-0 w-full bg-transparent border-b border-default-border z-10 overflow-x-auto",
            className
          )}
          aria-label="Tab Items"
        >
          {items.map((item) => (
            <Tabs.Trigger className="ctm-tab-trigger" key={item.key} value={item.key} asChild>
              {item.trigger}
            </Tabs.Trigger>
          ))}
          {extranode}
        </Tabs.List>
        {items.map((item) => (
          <Tabs.Content key={item.key} value={item.key} asChild>
            {item.content}
          </Tabs.Content>
        ))}
      </Tabs.Root>
    );
  }
);

Tab.displayName = "Tab";

export default Tab;
