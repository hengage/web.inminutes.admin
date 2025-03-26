import React from "react";
import { RadioGroupItem } from "../../radio-group";
import { Label } from "@/components/ui/label";

interface IProps extends React.ComponentPropsWithRef<typeof RadioGroupItem> {
  label?: string;
}

const Radio = ({ label, ...props }: IProps) => {
  const id = React.useId();
  return (
    <div className="flex items-center space-x-2">
      <RadioGroupItem id={id} {...props} />
      {label && (
        <Label className="cursor-pointer" htmlFor={id}>
          {label}
        </Label>
      )}
    </div>
  );
};

export default Radio;
