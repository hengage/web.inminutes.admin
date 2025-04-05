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
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { useToast } from "@/providers/ToastContext";
import * as FormMeta from "@/lib/validators/vendor";
import {
  useCreateVendorMutation,
  useGetCategoriesQuery,
  useGetSubCategoriesQuery,
} from "@/api/vendors";
import { useMediaUploadMutation } from "@/api/util";
import { cn } from "@/lib/utils";

const paymentOptions = [
  { label: "Paystack", value: "Paystack" },
  { label: "Bank transfer", value: "Bank transfer" },
];

const CreateVendor = () => {
  const router = useRouter();
  const categoriesResult = useGetCategoriesQuery();
  const uploadAction = useMediaUploadMutation();
  const result = useCreateVendorMutation();
  const { showError, showSuccess } = useToast();
  const form = useForm<z.infer<typeof FormMeta.vendorSchema>>({
    resolver: zodResolver(FormMeta.vendorSchema),
    defaultValues: FormMeta.initialValue,
    mode: "onTouched",
  });
  const category = form.watch("category");
  const subCategoriesResult = useGetSubCategoriesQuery(category);
  const handleSubmit = (data: z.infer<typeof FormMeta.vendorSchema>) => {
    result.mutate(data, {
      onSuccess: () => {
        showSuccess("Vendor created successfully");
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
          <div className="flex items-center">
            <Button className="w-[56px] h-[56px] bg-[#eeebff]" onClick={() => router.back()}>
              <Icon name="arrowback" />
            </Button>

            <h2 className="ctm-header-2 text-[32px] text-ctm-primary-700 ml-[32px]">
              Create New Vendor
            </h2>
          </div>

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
                  className="text-[16px] py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-primary-500 border-2 border-ctm-primary-500"
                >
                  <label htmlFor="file">Upload Image</label>
                </Button>
                <input onChange={handleFileChange} type="file" className="hidden" id="file" />
              </div>
            </div>
          </div>

          <div className="flex mb-[24px]">
            <Input<typeof FormMeta.vendorSchema>
              formId={"vendor-name"}
              name="vendorName"
              control={form.control}
              className="w-full mr-[24px] py-0 my-4 flex gap-0"
              placeholder="Vendor Name"
            />
            <Input<typeof FormMeta.vendorSchema>
              formId={"vendor-name"}
              name="businessName"
              control={form.control}
              className="w-full py-0 my-4 flex gap-0"
              placeholder="Business Name"
            />
          </div>

          <div className="flex mb-[24px]">
            <Input<typeof FormMeta.vendorSchema>
              formId={"vendor-email"}
              name="email"
              control={form.control}
              className="w-full mr-[24px] py-0 my-4 flex gap-0"
              placeholder="Email Address"
            />
            <Input<typeof FormMeta.vendorSchema>
              formId={"vendor-phone"}
              name="phoneNumber"
              control={form.control}
              className="w-full py-0 my-4 flex gap-0"
              placeholder="Phone Number"
            />
          </div>

          <div className="relative w-full mb-[24px]">
            <PopOver
              trigger={
                <Button
                  className="stroke-ctm-secondary-300 border w-full h-[56px] justify-between border-ctm-secondary-100 text-ctm-secondary-300"
                  variant={"ctm-ghost"}
                >
                  Payment option
                  <Icon name="arrow-down" height={16} width={16} />
                </Button>
              }
              className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1 w-[38.8rem] max-w-full"
            >
              <RadioItems
                onSubmit={() => {
                  // handleQueryChange(
                  //   "category",
                  //   params.map((item) => item.value)
                  // );
                }}
                selectedItem={""}
                // showSearchBox
                // searchPlaceholder="Categories"
                items={paymentOptions}
                className="w-full"
              />
            </PopOver>
          </div>

          <div className="relative w-full mb-[24px]">
            <FormField
              name="category"
              render={({ field }) => (
                <PopOver
                  trigger={
                    <Button
                      className="stroke-ctm-secondary-300 border w-full h-[56px] justify-between border-ctm-secondary-100 text-ctm-secondary-300 capitalize"
                      variant={"ctm-ghost"}
                    >
                      {field.value
                        ? categoriesResult.item.find((e) => e.value === field.value)?.label
                        : "Categories"}
                      <Icon name="arrow-down" height={16} width={16} />
                    </Button>
                  }
                  className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1 w-[38.8rem] max-w-full"
                >
                  <RadioItems
                    onSubmit={(value) => {
                      field.onChange(value);
                      form.setValue("subCategory", "");
                    }}
                    selectedItem={field.value}
                    // showSearchBox
                    // searchPlaceholder="Categories"
                    items={categoriesResult.item}
                    className="w-full"
                  />
                </PopOver>
              )}
            />
          </div>

          <div className="relative w-full mb-[24px]">
            <FormField
              name="subCategory"
              render={({ field }) => (
                <PopOver
                  trigger={
                    <Button
                      className="stroke-ctm-secondary-300 border w-full h-[56px] justify-between border-ctm-secondary-100 text-ctm-secondary-300 capitalize"
                      variant={"ctm-ghost"}
                    >
                      {field.value
                        ? subCategoriesResult.item.find((e) => e.value === field.value)?.label
                        : "Sub-categories"}
                      <Icon name="arrow-down" height={16} width={16} />
                    </Button>
                  }
                  triggerProps={{ disabled: !category }}
                  className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1 w-[38.8rem] max-w-full"
                >
                  <RadioItems
                    onSubmit={(value) => {
                      field.onChange(value);
                    }}
                    selectedItem={field.value}
                    // showSearchBox
                    // searchPlaceholder="Categories"
                    items={subCategoriesResult.item}
                    className="w-full"
                  />
                </PopOver>
              )}
            />
          </div>

          <div className="mb-[24px]">
            <FormField
              name="address"
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
          </div>
        </main>
      </form>
    </Form>
  );
};

export default CreateVendor;
