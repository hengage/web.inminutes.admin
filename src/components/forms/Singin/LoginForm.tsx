"use client";
import { z } from "zod";
import { loginSchema } from "@/lib/validators/login";
import Input from "../ControlledFormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { encodeData } from "@/lib/utils";
import { useLoginMutation } from "@/api/auth";
import { useToast } from "@/providers/ToastContext";

const LoginForm = () => {
  const { push } = useRouter();
  const { showError, showSuccess } = useToast();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
    mode: "onTouched",
  });
  const { loginMutation, isLoading } = useLoginMutation();
  const handleSubmit = (data: z.infer<typeof loginSchema>) => {
    loginMutation(data, {
      onSuccess: () => {
        showSuccess("A 5 digit code has been sent to your email.");
        push(`/verify/${encodeData(data.email)}`);
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-2 m-auto w-[80%] md:w-[35%] h-fit"
      >
        <Input<typeof loginSchema>
          formId={"login-form-email"}
          name="email"
          control={form.control}
          placeholder="work email"
        />
        <Button
          variant={"ctm-primary"}
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
          loading={isLoading}
        >
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
