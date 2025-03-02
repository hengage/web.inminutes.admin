import { Icon } from "@/components";
import { CustomButton as Button } from "@/components/ui/custom/button";
import Link from "next/link";

const page = () => {
  return (
    <main className="w-[98%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-secondary-colour">Vendors</h2>
        <span className="flex gap-2 items-center justify-end">
          <Button
            variant="ctm-primary"
            slotBefore={<Icon name="add" height={16} width={16} />}
            asChild
            className="pl-8"
          >
            <Link href={"#"}>Create Vendor</Link>
          </Button>
          <Button variant="ctm-outline" asChild className="border-2 text-ctm-primary-colour">
            <Link href={"#"}>Update</Link>
          </Button>
        </span>
      </div>
    </main>
  );
};

export default page;
