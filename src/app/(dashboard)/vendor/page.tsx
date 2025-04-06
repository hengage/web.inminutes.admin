import Link from "next/link";
import { Icon } from "@/components";
import { CustomButton as Button } from "@/components/ui/custom/button";
import Tabs from "@/components/screens/vendor/Tabs";

const page = async () => {
  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-primary-700">Vendors</h2>
        <span className="flex gap-2 items-center justify-end">
          <Button
            variant="ctm-primary"
            slotBefore={<Icon name="add" height={16} width={16} />}
            asChild
          >
            <Link href={"./vendor/create"}>Create Vendor</Link>
          </Button>

          <Button variant="ctm-outline" asChild className="border-2">
            <Link href={"./vendor/update"}>Update</Link>
          </Button>
        </span>
      </div>
      <Tabs />
    </main>
  );
};

export default page;

// {
//   searchParams,
// }: {
//   searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
// }
