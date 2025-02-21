"use client";
import { z } from "zod";
import { loginSchema } from "@/lib/validators/login";
import Input from "../ControlledFormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { CustomButton as Button } from "@/components/ui/custom/button";

const LoginForm = () => {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
    },
  });
  return (
    <Form {...form}>
      <form className="flex flex-col gap-2 m-auto w-[80%] md:w-[35%] h-fit">
        <Input<typeof loginSchema>
          formId={"login-form"}
          name="email"
          control={form.control}
          placeholder="work email"
        />
        <Button
          variant={"ctm-primary"}
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
        >
          Log In
        </Button>
      </form>
    </Form>
  );
};

export default LoginForm;
