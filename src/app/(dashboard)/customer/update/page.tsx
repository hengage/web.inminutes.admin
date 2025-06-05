"use client";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { Icon } from "@/components";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextAreaInput, TextArea, TextAreaCount } from "@/components/ui/custom/TextArea";
import PopOver from "@/components/ui/custom/PopOver";
import RadioItems from "@/components/ui/custom/radio/RadioItems";

const categories = [
  { label: "Food & Beverage", value: "food" },
  { label: "Fashion", value: "fashion" },
];

const paymentOptions = [
  { label: "Paystack", value: "Paystack" },
  { label: "Bank transfer", value: "Bank transfer" },
];

const subCategories = [
  { label: "Genesis Foods", value: "Genesis Foods" },
  { label: "Exodus Foods", value: "Exodus Foods" },
];

const UpdateVendor = () => {
  const router = useRouter();

  return (
    <>
      <section className="flex items-center justify-between px-[24px] mt-[40px] mb-[48px]">
        <div className="flex items-center">
          <Button className="w-[56px] h-[56px] bg-[#eeebff]" onClick={() => router.back()}>
            <Icon name="arrowback" />
          </Button>

          <h2 className="ctm-header-2 text-[32px] text-ctm-primary-700 ml-[32px]">Edit Vendor</h2>
        </div>

        <div>
          <Button
            variant="ctm-primary"
            className="text-[16px] py-[12px] px-[24px] rounded-[8px] mr-[16px] text-white"
          >
            <Link href={"#"}>Save changes</Link>
          </Button>

          <Button className="text-[16px] border-2 border-ctm-error-default py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-error-default">
            <Link href={"#"}>Delete vendor </Link>
            <Icon name="trash" width={16} height={16} />
          </Button>
        </div>
      </section>

      <main className="w-[750px] h-[1022px] rounded-xl mx-auto pt-[40px] bg-white px-[65px] mb-[56px]">
        <div className="flex justify-center">
          <div>
            <div className="flex justify-center items-center border-[2px] border-ctm-primary-500 border-dotted rounded-[50%] w-[150px] h-[150px] mb-[16px] bg-[#eeebff]">
              <Icon name="add" width={30} className="text-ctm-primary-500" height={30} />
            </div>

            <div className="mb-[32px]">
              <Button className="text-[16px] py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-primary-500 border-2 border-ctm-primary-500">
                Change Image
              </Button>
            </div>
          </div>
        </div>

        <div className="flex mb-[24px]">
          <Input
            className="w-[306px] h-[56px] mr-[24px]
      outline-none "
            placeholder="Vendor Name"
          />
          <Input className="w-[306px] h-[56px]" placeholder="Business Name" />
        </div>

        <div className="flex mb-[24px]">
          <Input className="w-[306px] h-[56px] mr-[24px]" placeholder="Email Address" />
          <Input className="w-[306px] h-[56px]" placeholder="Phone Number" />
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
          <PopOver
            trigger={
              <Button
                className="stroke-ctm-secondary-300 border w-full h-[56px] justify-between border-ctm-secondary-100 text-ctm-secondary-300"
                variant={"ctm-ghost"}
              >
                Categories
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
              items={categories}
              className="w-full"
            />
          </PopOver>
        </div>

        <div className="relative w-full mb-[24px]">
          <PopOver
            trigger={
              <Button
                className="stroke-ctm-secondary-300 border w-full h-[56px] justify-between border-ctm-secondary-100 text-ctm-secondary-300"
                variant={"ctm-ghost"}
              >
                Sub-categories
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
              items={subCategories}
              className="w-full"
            />
          </PopOver>
        </div>

        <div className="mb-[24px]">
          <TextArea>
            <TextAreaInput maxLength={100} className="h-[116px]" placeholder="Business Address" />
            <TextAreaCount className="flex justify-end" />
          </TextArea>
        </div>

        <div>
          <TextArea>
            <TextAreaInput
              maxLength={100}
              className="h-[116px]"
              placeholder="Residential Address"
            />
            <TextAreaCount className="flex justify-end" />
          </TextArea>
        </div>
      </main>
    </>
  );
};

export default UpdateVendor;
