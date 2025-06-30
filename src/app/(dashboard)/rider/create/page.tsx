"use client";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { Icon } from "@/components";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextAreaInput, TextArea, TextAreaCount } from "@/components/ui/custom/TextArea";
import PopOver from "@/components/ui/custom/PopOver";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { DatePicker } from "@/components/ui/custom/date/DatePicker";

const VehicleType = [
  { label: "Bicycle", value: "Bicycle" },
  { label: "Motorcycle", value: "Motorcycle" },
];

const CreateRider = () => {
  const router = useRouter();

  return (
    <>
      <section className="flex items-center justify-between px-[24px] mt-[40px] mb-[48px]">
        <div className="flex items-center">
          <Button className="w-[56px] h-[56px] bg-[#eeebff]" onClick={() => router.back()}>
            <Icon name="arrowback" />
          </Button>

          <h2 className="ctm-header-2 text-[32px] text-ctm-primary-700 ml-[32px]">
            Create New Rider
          </h2>
        </div>

        <div>
          <Button
            variant="ctm-primary"
            className="text-[16px] py-[12px] px-[24px] rounded-[8px] mr-[16px] text-white"
          >
            <Link href={"#"}>Save</Link>
          </Button>

          <Button className="text-[16px] border-2 border-ctm-primary-500 py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-primary-700">
            <Link href={"#"}>Cancel</Link>
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
                Upload Image
              </Button>
            </div>
          </div>
        </div>

        <div className="flex mb-[24px]">
          <Input
            className="w-[306px] h-[56px] mr-[24px]
        outline-none "
            placeholder="Rider Name"
          />
          <Input className="w-[306px] h-[56px]" placeholder="Display Name" />
        </div>

        <div className="flex mb-[24px]">
          <Input className="w-[306px] h-[56px] mr-[24px]" placeholder="Email Address" />
          <Input className="w-[306px] h-[56px]" placeholder="Phone Number" />
        </div>

        <div className="relative w-full mb-[24px] flex items-stretch gap-6">
          <PopOver
            trigger={
              <Button
                className="stroke-ctm-secondary-300 border w-full h-[50px] justify-between border-ctm-secondary-100 text-ctm-secondary-300"
                variant={"ctm-ghost"}
              >
                Vehicle type
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1 max-w-full"
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
              items={VehicleType}
            />
          </PopOver>
          <DatePicker placeholder="Date of birth" triggerclassName="w-full py-6" />
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

export default CreateRider;
