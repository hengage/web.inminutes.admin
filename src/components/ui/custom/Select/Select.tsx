"use client";
import { Label } from "@/components/ui/label";
import {
  Select as PrimitiveSelect,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import * as SelectPrimitive from "@radix-ui/react-select";
import { useEffect, useId, useState } from "react";

export interface SelectProps extends SelectPrimitive.SelectProps {
  options?: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  trigger?: ((value: string) => React.ReactNode) | React.ReactNode;
  content?: React.ReactNode;
  label?: string;
  id?: string;
  className?: string;
}

export function Select(props: SelectProps) {
  const [value, setValue] = useState(props.value || props.defaultValue);
  const id = useId();
  useEffect(() => {
    if (props.value !== undefined) setValue(props.value);
  }, [props.value]);
  return (
    <PrimitiveSelect
      onValueChange={(value) => {
        setValue(value);
        props.onValueChange?.(value);
      }}
      value={value}
      {...props}
    >
      {props.label && (
        <Label
          className="ctm-paragraph-1 mb-2 text-ctm-secondary-300 py-0"
          htmlFor={props.id ?? id}
        >
          {props.label}
        </Label>
      )}
      {!props.trigger ? (
        <SelectTrigger id={props.id ?? id} className={cn("w-[180px]", props.className)}>
          <SelectValue placeholder={props.placeholder ?? "Select"} />
        </SelectTrigger>
      ) : (
        <SelectPrimitive.Trigger className={cn(props.className)} asChild>
          {typeof props.trigger === "function" ? props.trigger(value ?? "") : props.trigger}
        </SelectPrimitive.Trigger>
      )}

      {props.content ? (
        props.content
      ) : (
        <SelectContent>
          <SelectGroup>
            {props?.options?.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      )}
    </PrimitiveSelect>
  );
}
