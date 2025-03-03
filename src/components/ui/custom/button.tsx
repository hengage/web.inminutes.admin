import React from "react";
import { Button, ButtonProps } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps, cva } from "class-variance-authority";

const buttonVariants = cva(
  "px-4 py-2 font-normal !pointer-events-auto  hover:disabled:cursor-not-allowed",
  {
    variants: {
      variant: {
        "ctm-primary":
          "bg-ctm-primary-colour text-ctm-white hover:bg-ctm-primary-colour disabled:bg-ctm-normal-grey",
        "ctm-outline":
          "border border-input border-ctm-primary-colour bg-background shadow-sm hover:bg-ctm-primary-colour hover:text-ctm-white",
        "ctm-ghost":
          "bg-transparent text-accent-foreground hover:bg-transparent hover:text-ctm-primary-colour",
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
      "ctm-outline": "text-ctm-primary-colour",
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
  ...props
}: CustomButtonProps) {
  const render = React.isValidElement(children)
    ? React.cloneElement(
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
    : children;
  return (
    <Button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
      disabled={props.disabled || loading}
      variant={"child"}
    >
      {render}
    </Button>
  );
}
