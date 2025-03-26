"use client";
import React, { useEffect } from "react";
import { Select, SelectProps } from "./Select";
import { Button } from "../../button";
import { Icon } from "../../Icon";

export interface BaseMultiSelectProps
  extends Omit<SelectProps, "value" | "onValueChange" | "trigger"> {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  placeholder?: string;
  trigger?: React.ReactNode;
}

export interface OptionsMultiSelectProps extends BaseMultiSelectProps {
  options: { value: string; label: string }[];
  content?: undefined;
}

export interface CustomContentMultiSelectProps extends BaseMultiSelectProps {
  options?: undefined;
  content: React.ReactNode;
}

const MultiSelect = (props: OptionsMultiSelectProps | CustomContentMultiSelectProps) => {
  const [value, setValue] = React.useState<string[]>(props.value ?? []);
  useEffect(() => {
    props.onValueChange?.(value);
  }, [value]);
  return (
    <Select
      trigger={
        props.trigger ?? (
          <div className="border border-default-400 cursor-pointer p-2 flex gap-2 rounded-md min-h-10">
            {value.map((value, i) => (
              <span
                key={i}
                className="rounded-md bg-default-border px-2 text-sm flex items-center justify-between gap-2"
              >
                {value}
                <Button
                  onClick={() => setValue((prev) => [...prev.filter((v) => v !== value)])}
                  variant="ghost"
                  size="icon"
                >
                  <Icon width={8} height={8} name="close" />
                </Button>
              </span>
            ))}
          </div>
        )
      }
      options={
        props.options ? [...props?.options.filter((v) => !value.includes(v.value))] : undefined
      }
      content={props.content}
      onValueChange={(value) =>
        setValue((prev) => {
          props.onValueChange?.([...prev, value]);
          return [...prev, value];
        })
      }
    />
  );
};

export default MultiSelect;
