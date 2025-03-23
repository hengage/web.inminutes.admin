import { useState } from "react";
import { FormControl, FormField, FormLabel, FormMessage, Input } from "@/components";
import { Control, FieldPath } from "react-hook-form";
import { z } from "zod";
import { Eye, EyeOff } from "lucide-react";

interface FormFieldProps<T extends z.ZodType> {
  control: Control<z.infer<T>>;
  name: FieldPath<z.infer<T>>;
  label?: string;
  placeholder?: string;
  type?: string;
  formId?: string;
  showError?: boolean;
}

const ControlledFormInput = <T extends z.ZodType>({
  control,
  name,
  label,
  placeholder,
  type = "text",
  formId,
  showError = true,
}: FormFieldProps<T>) => {
  const [showPassword, setShowPassword] = useState(false);
  const togglePasswordVisibility = showPassword ? "text" : "password";
  const inputType = type === "password" ? togglePasswordVisibility : type;

  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <div className="my-[29px] relative">
          <div className="form-item bg-ctm-foreground-muted">
            <div className="flex w-full flex-col justify-center my-auto">
              {label && (
                <FormLabel className="ctm-paragraph-1 mb-2 text-base-content">{label}</FormLabel>
              )}
              <FormControl>
                <Input
                  className="input-class border-0 ctm-paragraph-1 [&:-webkit-autofill]:!bg-transparent [&:-webkit-autofill]:!text-base-content [&:-webkit-autofill]:!shadow-[0_0_0_30px_white_inset]"
                  {...field}
                  type={inputType}
                  placeholder={placeholder}
                  id={formId ?? name}
                  autoComplete="off"
                />
              </FormControl>
            </div>

            {type === "password" && (
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="h-6 w-6" /> : <Eye className="h-6 w-6" />}
              </button>
            )}
          </div>
          {showError && <FormMessage className="form-message absolute top-full mt-1" />}
        </div>
      )}
    />
  );
};

export default ControlledFormInput;
