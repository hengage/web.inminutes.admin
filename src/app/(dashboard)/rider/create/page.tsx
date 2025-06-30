"use client";
import { z } from "zod";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { Form, FormField, Icon } from "@/components";
import Input from "@/components/forms/ControlledFormInput";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { TextAreaInput, TextArea, TextAreaCount } from "@/components/ui/custom/TextArea";
import PopOver from "@/components/ui/custom/PopOver";
import { useToast } from "@/providers/ToastContext";

import { useMediaUploadRiderMutation } from "@/api/util";
import { cn } from "@/lib/utils";
import { initialValue, riderScheme } from "@/lib/validators/rider";
import { useCreateRiderMutation } from "@/api/rider";
import { DatePicker } from "@/components/ui/custom/date/DatePicker";
import PageHeader from "@/components/general/PageHeader";
import { RadioGroup } from "@/components/ui/radio-group";
import Radio from "@/components/ui/custom/radio/Radio";

const VehicleType = [
  { label: "Bicycle", value: "Bicycle" },
  { label: "Motorcycle", value: "Motorcycle" },
];

const CreateVendor = () => {
  const router = useRouter();
  const uploadAction = useMediaUploadRiderMutation();
  const result = useCreateRiderMutation();
  const { showError, showSuccess } = useToast();
  const form = useForm<z.infer<typeof riderScheme>>({
    resolver: zodResolver(riderScheme),
    defaultValues: initialValue,
    mode: "onChange",
  });
  const handleSubmit = (data: z.infer<typeof riderScheme>) => {
    result.mutate(data, {
      onSuccess: () => {
        showSuccess("Rider created successfully");
        form.reset();
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  };
  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0]; // Get the first file
    if (!selectedFile) return;
    const formdata = new FormData();
    formdata.append("file", selectedFile);
    uploadAction.mutate(formdata, {
      onSuccess: (data) => {
        form.setValue("businessLogo", data);
        showSuccess("File uploaded successfully");
        form.setValue("businessLogo", data as string);
      },
      onError: (error) => {
        showError(error.message);
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <section className="flex items-center justify-between px-[24px] mt-[40px] mb-[48px]">
          <PageHeader onBack={() => router.back()} title=" Create New Rider" />

          <div>
            <Button
              variant="ctm-primary"
              className="text-[16px] py-[12px] px-[24px] rounded-[8px] mr-[16px] text-white"
              type="submit"
              disabled={result.isPending || !form.formState.isValid}
              loading={result.isPending}
            >
              Save
            </Button>

            <Button
              onClick={() => router.back()}
              className="text-[16px] border-2 border-ctm-primary-500 py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-primary-700"
            >
              Cancel
            </Button>
          </div>
        </section>

        <main className="w-[750px] h-[1022px] rounded-xl mx-auto pt-[40px] bg-white px-[65px] mb-[56px]">
          <div className="flex justify-center">
            <div>
              <div className="relative flex justify-center items-center w-[150px] h-[150px] mb-4">
                <div
                  className={cn(
                    "absolute inset-0 rounded-full border-[2px] border-dotted border-ctm-primary-500",
                    { "spin-dotted": uploadAction.isPending }
                  )}
                />
                <div
                  style={{
                    backgroundImage: uploadAction.data ? `url(${uploadAction.data})` : undefined,
                    backgroundColor: uploadAction.data ? undefined : "#eeebff",
                  }}
                  className="rounded-full w-full h-full flex justify-center items-center bg-no-repeat bg-center bg-cover"
                >
                  {!uploadAction.data && (
                    <Icon name="add" width={30} height={30} className="text-ctm-primary-500" />
                  )}
                </div>
              </div>

              <div className="mb-[32px]">
                <Button
                  asChild
                  className="text-[16px] cursor-pointer py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-primary-500 border-2 border-ctm-primary-500"
                >
                  <label className="cursor-pointer" htmlFor="file">
                    Upload Image
                  </label>
                </Button>
                <input
                  onChange={handleFileChange}
                  type="file"
                  className="hidden cursor-pointer"
                  id="file"
                />
              </div>
            </div>
          </div>

          <div className="flex -mt-4 gap-6">
            <Input<typeof riderScheme>
              formId={"rider-name"}
              name="name"
              control={form.control}
              className="w-full "
              placeholder="Name"
            />

            <Input<typeof riderScheme>
              formId={"display-name"}
              name="displayName"
              control={form.control}
              className="w-full "
              placeholder="Display Name"
            />
          </div>

          <div className="flex -mt-8 gap-6">
            <Input<typeof riderScheme>
              formId={"rider-email"}
              name="email"
              control={form.control}
              className="w-full "
              placeholder="Email Address"
            />

            <Input<typeof riderScheme>
              formId={"rider-phone"}
              name="phoneNumber"
              control={form.control}
              className="w-full "
              placeholder="Phone Number"
            />
          </div>

          <div className="relative w-full mb-6">
            <PopOver
              trigger={
                <Button
                  className="stroke-ctm-secondary-300 border w-full h-[56px] justify-between border-ctm-secondary-100 text-ctm-secondary-300"
                  variant={"ctm-ghost"}
                >
                  {form.watch("vehicleType") || "Vehicle Type"}
                  <Icon name="arrow-down" height={16} width={16} />
                </Button>
              }
              className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1 w-[38.8rem] max-w-full"
            >
              <RadioGroup
                value={form.watch("vehicleType") || ""}
                onValueChange={(value) =>
                  form.setValue("vehicleType", value, { shouldValidate: true })
                }
                className="flex flex-col gap-2 max-h-60 overflow-y-auto"
              >
                {VehicleType.map((type) => (
                  <Radio key={type.value} value={type.value} label={type.label} />
                ))}
              </RadioGroup>
            </PopOver>
            {form.formState.errors.vehicleType && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.vehicleType.message}
              </span>
            )}
          </div>
          <div className="mb-6">
            <DatePicker
              value={
                form.getValues("dateOfBirth")
                  ? new Date(form.getValues("dateOfBirth") as string)
                  : null
              }
              onSelect={(date: Date | null | undefined) =>
                form.setValue("dateOfBirth", date?.toISOString() || "", { shouldValidate: true })
              }
              placeholder="Date of birth"
              triggerclassName="w-full py-6"
            />
            {form.formState.errors.dateOfBirth && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.dateOfBirth.message}
              </span>
            )}
          </div>

          <div className="mb-[24px]">
            <FormField
              name="businessAddress"
              render={({ field }) => (
                <TextArea>
                  <TextAreaInput
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={100}
                    className="h-[116px]"
                    placeholder="Business Address"
                  />
                  <TextAreaCount className="flex justify-end" />
                </TextArea>
              )}
            />
            {form.formState.errors.businessAddress && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.businessAddress.message}
              </span>
            )}
          </div>

          <div>
            <FormField
              name="residentialAddress"
              render={({ field }) => (
                <TextArea>
                  <TextAreaInput
                    value={field.value}
                    onChange={field.onChange}
                    maxLength={100}
                    className="h-[116px]"
                    placeholder="Residential Address"
                  />
                  <TextAreaCount className="flex justify-end" />
                </TextArea>
              )}
            />
            {form.formState.errors.residentialAddress && (
              <span className="text-red-500 text-sm">
                {form.formState.errors.residentialAddress.message}
              </span>
            )}
          </div>
        </main>
      </form>
    </Form>
  );
};

export default CreateVendor;
