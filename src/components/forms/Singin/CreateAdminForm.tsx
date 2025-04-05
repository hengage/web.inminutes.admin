"use client";
import { z } from "zod";
import { adminSchema } from "@/lib/validators/login";
import Input from "../ControlledFormInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { Form, FormField } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { useCreateAdminMutation, useGetRolesQuery } from "@/api/auth";
import { useToast } from "@/providers/ToastContext";
import { Select } from "@/components/ui/custom/Select/Select";
import { Icon } from "@/components/ui/Icon";

const CreateAdminForm = () => {
  const router = useRouter();
  const { showError, showSuccess } = useToast();
  const form = useForm<z.infer<typeof adminSchema>>({
    resolver: zodResolver(adminSchema),
    defaultValues: {
      email: "",
      firstName: "",
      lastName: "",
      role: "",
    },
    mode: "onTouched",
  });
  const { createAdminMutation, isLoading } = useCreateAdminMutation();
  const { data, isLoading: isPending } = useGetRolesQuery();
  const handleSubmit = (data: z.infer<typeof adminSchema>) => {
    createAdminMutation(data, {
      onSuccess: () => {
        showSuccess("Invite sent successfully");
        form.reset();
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  };
  return (
    <Form {...form}>
      <Button
        className="w-[56px] h-[56px] bg-[#eeebff] absolute top-[8%] left-[4%]"
        onClick={() => router.back()}
      >
        <Icon name="arrowback" />
      </Button>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex flex-col gap-4 m-auto w-[80%] md:w-[35%] h-fit"
      >
        <div className="flex flex-col md:flex-row justify-between items-center gap-2 h-fit">
          <Input<typeof adminSchema>
            formId={"admin-form-email"}
            name="firstName"
            control={form.control}
            placeholder="first name"
            className="w-full my-2 bg-ctm-foreground-muted"
          />
          <Input<typeof adminSchema>
            formId={"admin-form-email"}
            name="lastName"
            control={form.control}
            placeholder="last name"
            className="w-full my-2 bg-ctm-foreground-muted"
          />
        </div>
        <Input<typeof adminSchema>
          formId={"admin-form-email"}
          name="email"
          control={form.control}
          placeholder="work email"
          className="my-2 bg-ctm-foreground-muted"
        />
        <FormField
          control={form.control}
          name={"role"}
          render={({ field }) => (
            <div>
              <Select
                label="Role"
                options={data}
                disabled={isPending}
                onValueChange={(value) => field.onChange(value)}
                className="w-full"
                placeholder="Select Role"
              />
            </div>
          )}
        />
        <Button
          variant={"ctm-primary"}
          type="submit"
          className="w-full"
          disabled={!form.formState.isValid}
          loading={isLoading}
        >
          Create
        </Button>
      </form>
    </Form>
  );
};

export default CreateAdminForm;
