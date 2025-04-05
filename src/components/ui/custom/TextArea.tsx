import * as React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface TextAreaContextType {
  id?: string;
  value?: string;
  maxLength?: number;
  updateValue?: (value: string) => void;
  updateLength?: (value?: number) => void;
}

const TextAreaContext = React.createContext<TextAreaContextType | undefined>(undefined);

function useTextAreaContext() {
  const context = React.useContext(TextAreaContext);
  if (!context) {
    throw new Error("TextArea compound components must be used within a TextArea component");
  }
  return context;
}

const TextAreaCount = (props: React.ComponentProps<"p">) => {
  const context = useTextAreaContext();
  if (!context.maxLength) return null;

  return (
    <p {...props} className={cn("text-xs font-normal text-ctm-secondary-100", props.className)}>
      {context.value?.length || 0}/{context.maxLength}
    </p>
  );
};

const TextAreaLabel = ({ children }: { children: React.ReactNode }) => {
  const context = useTextAreaContext();

  return <Label htmlFor={context.id}>{children}</Label>;
};

const TextAreaInput = React.forwardRef<
  HTMLTextAreaElement,
  React.ComponentProps<"textarea"> & Omit<React.ComponentPropsWithRef<"textarea">, "id">
>(({ className, ...props }, ref) => {
  const context = useTextAreaContext();
  React.useEffect(() => {
    context.updateLength?.(props.maxLength);
  }, [props.maxLength]);
  return (
    <>
      <textarea
        className={cn(
          "flex min-h-[60px] w-full rounded-md border border-ctm-secondary-100 bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ctm-primary-500 focus:border-ctm-primary-700 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className
        )}
        ref={ref}
        {...props}
        onChange={(e) => {
          context.updateValue?.(e.target.value);
          props.onChange?.(e);
        }}
      />
    </>
  );
});
TextAreaInput.displayName = "TextareaInput";

const TextArea = ({ children }: { children: React.ReactNode }) => {
  const [value, setValue] = React.useState("");
  const [maxLength, setMaxLength] = React.useState<number | undefined>();
  return (
    <TextAreaContext.Provider
      value={{
        value,
        maxLength: maxLength,
        updateValue: (value: string) => {
          setValue(value);
        },
        updateLength: (value?: number) => {
          setMaxLength(value);
        },
      }}
    >
      {children}
    </TextAreaContext.Provider>
  );
};

export { TextArea, TextAreaLabel, TextAreaInput, TextAreaCount };
