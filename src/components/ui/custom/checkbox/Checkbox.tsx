import React from "react";
import { Checkbox as CheckboxPrimitive } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface IProps extends React.ComponentPropsWithRef<typeof CheckboxPrimitive> {
  label?: string;
}

const Checkbox = ({ label, ...props }: IProps) => {
  const id = React.useId();
  return (
    <div className="flex items-center space-x-2">
      <CheckboxPrimitive id={id} {...props} />
      {label && (
        <Label className="cursor-pointer" htmlFor={id}>
          {label}
        </Label>
      )}
    </div>
  );
};

export default Checkbox;
