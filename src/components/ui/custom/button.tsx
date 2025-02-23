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
          "border border-input bg-background shadow-sm hover:bg-accent hover:text-accent-foreground",
        "ctm-ghost": "bg-transparent hover:bg-accent hover:text-accent-foreground",
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

const filterSpinVariants = (variant: VariantProps<typeof buttonVariants>["variant"]) => {
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
}

export function CustomButton({
  className,
  size,
  variant,
  children,
  loading = false,
  ...props
}: CustomButtonProps) {
  const render = loading ? (
    <span className={cn(spinVariants({ variant: filterSpinVariants(variant), size }))}></span>
  ) : (
    children
  );
  return (
    <Button className={cn(buttonVariants({ variant, size, className }))} {...props}>
      {render}
    </Button>
  );
}
