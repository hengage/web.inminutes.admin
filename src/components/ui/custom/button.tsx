import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

export const buttonVariants = cva(
  "px-4 py-2 font-normal !pointer-events-auto disabled:bg-ctm-secondary-100  hover:disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        "ctm-primary":
          "bg-ctm-primary-500 text-ctm-white hover:bg-ctm-primary-400 disabled:bg-ctm-secondary-100 focus:bg-ctm-primary-600 active:bg-ctm-primary-700",
        "ctm-outline":
          "border border-ctm-primary-500 disabled:border-ctm-secondary-100 bg-background shadow-sm hover:border-ctm-primary-400 focus:bg-ctm-primary-600 active:bg-ctm-primary-700 text-ctm-primary-500 disabled:text-ctm-secondary-100",
        "ctm-ghost":
          "bg-transparent text-ctm-primary-500 disabled:text-ctm-secondary-100 hover:bg-transparent hover:text-ctm-primary-400",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8 py-6 my-6",
        icon: "h-9 w-9",
      },
    },
  }
);

const spinVariants = cva("loading loading-spinner", {
  variants: {
    variant: {
      "ctm-outline": "text-ctm-primary-400",
    },
    size: {
      default: "loading-xs",
      sm: "loading-sm",
      lg: "loading-md",
      icon: "loading-xs",
    },
  },
});

const selectSpinVariants = (variant: VariantProps<typeof buttonVariants>["variant"]) => {
  switch (variant) {
    case "ctm-outline":
      return "ctm-outline";
    default:
      return null;
  }
};

interface CustomButtonProps
  extends Omit<ButtonProps, "variant">,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
  slotAfter?: React.ReactNode;
  slotBefore?: React.ReactNode;
}

export function CustomButton({
  className,
  size,
  variant,
  children,
  loading = false,
  slotBefore,
  slotAfter,
  type = "button",
  ...props
}: CustomButtonProps) {
  const render = React.isValidElement(children) ? (
    React.cloneElement(
      children as React.ReactElement<HTMLElement>,
      {
        className: cn("relative"),
      },
      <>
        {/* Predefined Children */}
        {loading ? (
          <span
            className={cn(spinVariants({ variant: selectSpinVariants(variant), size }), "")}
          ></span>
        ) : (
          slotBefore
        )}
        {React.Children.map(children, (child) =>
          typeof child === "string"
            ? child
            : React.isValidElement(child)
              ? ((child.props as { children?: React.ReactNode }).children ?? "")
              : ""
        )?.join("") ?? ""}
        {slotAfter}
      </>
    )
  ) : (
    <>
      {loading ? (
        <span
          className={cn(spinVariants({ variant: selectSpinVariants(variant), size }), "")}
        ></span>
      ) : (
        slotBefore
      )}
      {children}
      {slotAfter}
    </>
  );
  return (
    <Button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={props.disabled || loading}
      variant={"child"}
      type={type}
    >
      {render}
    </Button>
  );
}
