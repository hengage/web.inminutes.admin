import { cn } from "@/lib/utils";
import { tag, tagTypes } from "@/types";
import { cva } from "class-variance-authority";

interface ITagProps {
  tag: tag;
}

const Variants: Record<tagTypes, tag[]> = {
  primary: ["ready", "active", "in-transit", "nearby", "arrived", "approved"],
  error: ["cancelled", "abandoned", "inactive", "rejected"],
  success: ["delivered", "successful", "picked-up"],
  warning: ["pending"],
};

const tagVariants = cva(
  "rounded-[100px] flex items-center gap-2 py-[6px] px-[10px] w-fit capitalize text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-ctm-secondary-50 text-ctm-secondary-100",
        warning: "bg-ctm-warning-light text-ctm-warning-default",
        error: "bg-ctm-error-light text-ctm-error-default",
        success: "bg-ctm-success-light text-ctm-success-default",
        primary: "bg-ctm-primary-50 text-ctm-primary-500",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

const indicatorVariants = cva("w-[8px] h-[8px] rounded-full", {
  variants: {
    variant: {
      default: "bg-ctm-secondary-100",
      warning: "bg-ctm-warning-default",
      error: "bg-ctm-error-default",
      success: "bg-ctm-success-default",
      primary: "bg-ctm-primary-500",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

const checkTag = (tag: tag): tagTypes | "default" => {
  let key: tagTypes | "default" = "default";
  Object.entries(Variants).forEach(([Key, value]) => {
    if (value.includes(tag)) key = Key as tagTypes | "default";
  });
  return key;
};

const Tag = ({ tag }: ITagProps) => {
  const variant = checkTag(tag);
  return (
    <div className={cn(tagVariants({ variant }))}>
      <span className={cn(indicatorVariants({ variant }))}></span>
      <p>{tag}</p>
    </div>
  );
};

export default Tag;
