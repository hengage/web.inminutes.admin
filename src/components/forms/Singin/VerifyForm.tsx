"use client";
import { z } from "zod";
import { otpSchema } from "@/lib/validators/login";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useToast } from "@/providers/ToastContext";
import { useRouter } from "next/navigation";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useLoginMutation, useVerifyOtpMutation } from "@/api/auth";
import { useState } from "react";
import CountdownTimer from "@/components/ui/custom/CountdownTimer";

const VerifyForm = ({ email }: { email: string }) => {
  const { push } = useRouter();
  const [canResend, setCanResend] = useState(false);
  const { showError, showSuccess } = useToast();
  const form = useForm<z.infer<typeof otpSchema>>({
    resolver: zodResolver(otpSchema),
    defaultValues: {
      otp: "",
    },
    mode: "onTouched",
  });
  const { verifyOtpMutation, isLoading } = useVerifyOtpMutation();
  const { loginMutation, isLoading: loginLoading } = useLoginMutation();
  const handleSubmit = (data: z.infer<typeof otpSchema>) => {
    verifyOtpMutation(
      { ...data, email },
      {
        onSuccess: () => {
          showSuccess("success");
          push("/dashboard");
        },
        onError: (error) => {
          showError(error.message);
        },
      }
    );
  };

  const resendOtp = () => {
    loginMutation(
      { email },
      {
        onSuccess: () => {
          showSuccess("A 5 digit code has been sent to your email.");
          setCanResend(false);
        },
        onError: (error) => {
          showError(error.message);
        },
      }
    );
  };
  return (
    <div className="flex flex-col justify-center gap-4 m-auto w-[80%] md:w-[35%] h-fit">
      <span className="ctm-header-4 text-ctm-darker-grey text-center">
        <p>
          A 5 digit code has been sent to <em className="text-ctm-primary-colour">{email}</em>.
        </p>{" "}
        <p>Enter code below to continue your registration process.</p>
      </span>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="flex flex-col justify-center items-center gap-4 m-auto h-fit w-full"
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
            loading={isLoading}
          >
            Continue to dashboard
          </Button>
        </form>
      </Form>
      <span className="text-center">
        <span>
          resend otp If you don&apos;t receive a message{" "}
          {canResend ? (
            <Button
              className="text-[16px] font-[600] text-ctm-primary-colour px-1"
              size={"sm"}
              variant={"ctm-ghost"}
              type="button"
              onClick={resendOtp}
              loading={loginLoading}
            >
              Click to resend mail
            </Button>
          ) : (
            <>
              in{" "}
              <CountdownTimer
                initialSeconds={60}
                onComplete={() => {
                  setCanResend(true);
                }}
              />
            </>
          )}
          .
        </span>
      </span>
    </div>
  );
};

export default VerifyForm;
