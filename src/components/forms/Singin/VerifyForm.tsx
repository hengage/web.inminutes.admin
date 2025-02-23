"use client";
import { z } from "zod";
import { otpSchema } from "@/lib/validators/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";

const VerifyForm = ({ email }: { email: string }) => {
  const { push } = useRouter();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onTouched",
  });
  const handleSubmit = (data: z.infer<typeof otpSchema>) => {
    console.log(data);
    push(`/`);
  };
  return (
    <div className="flex flex-col justify-center gap-2 m-auto w-[80%] md:w-[35%] h-fit">
      <span className="ctm-header-4 text-ctm-darker-grey text-center">
        <p>
          A 5 digit code has been sent to <em className="text-ctm-primary-colour">{email}</em>.
        </p>{" "}
        <p>Enter code below to continue your registration process.</p>
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-center items-center gap-2 m-auto h-fit"
        >
          <FormField
            control={form.control}
            name="otp"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <InputOTP
                    className="justify-center border-ctm-primary-colour border"
                    maxLength={5}
                    {...field}
                  >
                    <InputOTPGroup className="gap-4">
                      <InputOTPSlot
                        className="ring-ctm-primary-colour border-ctm-primary-colour border rounded-md"
                        index={0}
                      />
                      <InputOTPSlot
                        className="ring-ctm-primary-colour border-ctm-primary-colour border rounded-md"
                        index={1}
                      />
                      <InputOTPSlot
                        className="ring-ctm-primary-colour border-ctm-primary-colour border rounded-md"
                        index={2}
                      />
                      <InputOTPSlot
                        className="ring-ctm-primary-colour border-ctm-primary-colour border rounded-md"
                        index={3}
                      />
                      <InputOTPSlot
                        className="ring-ctm-primary-colour border-ctm-primary-colour border rounded-md"
                        index={4}
                      />
                    </InputOTPGroup>
                  </InputOTP>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            variant={"ctm-primary"}
            type="submit"
            className="w-full"
            disabled={!form.formState.isValid}
          >
            Continue to dashboard
          </Button>
        </form>
      </Form>
      <span>
        If you don’t receive a message within 5 mins.
        <Button variant={"ctm-ghost"}>Click to resend mail</Button>
      </span>
    </div>
  );
};

export default VerifyForm;
