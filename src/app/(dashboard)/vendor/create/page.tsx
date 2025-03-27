"use client";
import { CustomButton as Button } from "@/components/ui/custom/button";
import { Icon } from "@/components";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { TextAreaInput, TextArea, TextAreaCount } from "@/components/ui/custom/TextArea";

const CreateVendor = () => {
  const router = useRouter();

  return (
    <>
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
          >
            <Link href={"#"}>Save</Link>
          </Button>

          <Button className="text-[16px] border-2 border-ctm-primary-500 py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-primary-700">
            <Link href={"#"}>Cancel</Link>
          </Button>
        </div>
      </section>

      <main className="w-[750px] h-[1022px] rounded-xl mx-auto pt-[40px] bg-white px-[65px]">
        <div className="flex justify-center items-center border-[2px] border-ctm-primary-500 mx-auto border-dotted rounded-[50%] w-[150px] h-[150px] mb-[16px] bg-[#eeebff]">
          <Icon name="add" width={30} className="text-ctm-primary-500" height={30} />
        </div>

        <div className="text-center mb-[32px]">
          <Button className="text-[16px] py-[12px] px-[24px] rounded-[8px] mr-[16px] text-ctm-primary-500 border-2 border-ctm-primary-500">
            Upload Image
          </Button>
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

        <div>
          <TextArea maxLength={100}>
            <TextAreaInput placeholder="Business Address" />
            <TextAreaCount />
          </TextArea>
        </div>
      </main>
    </>
  );
};

export default CreateVendor;
