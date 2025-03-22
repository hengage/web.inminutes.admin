import Link from "next/link";
import { Icon } from "@/components";
import { CustomButton as Button } from "@/components/ui/custom/button";
import * as Tabs from "@radix-ui/react-tabs";

const page = () => {
  return (
    <main className="w-[98%] py-[2%] mx-auto">
      <div className="flex justify-between items-center">
        <h2 className="ctm-header-1 text-ctm-secondary-colour">Vendors</h2>
        <span className="flex gap-2 items-center justify-end">
          <Button
            variant="ctm-primary"
            slotBefore={<Icon name="add" height={16} width={16} />}
            asChild
          >
            <Link href={"#"}>Create Vendor</Link>
          </Button>

          <Button variant="ctm-outline" asChild className="border-2 text-ctm-primary-colour">
            <Link href={"#"}>Update</Link>
          </Button>
        </span>
      </div>
      <Tabs.Root className="flex flex-col" defaultValue="tab1">
        <Tabs.List className="flex shrink-0 w-fit bg-transparent gap-4" aria-label="Vendors Data">
          <Tabs.Trigger className="ctm-tab-trigger" value="tab1">
            All Vendors
          </Tabs.Trigger>
          <Tabs.Trigger className="ctm-tab-trigger" value="tab2">
            Vendor Categories
          </Tabs.Trigger>
          <Tabs.Trigger className="ctm-tab-trigger" value="tab3">
            Vendor Applications
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="tab1">Tab one content</Tabs.Content>
        <Tabs.Content value="tab2">Tab two content</Tabs.Content>
        <Tabs.Content value="tab3">Tab three content</Tabs.Content>
      </Tabs.Root>
    </main>
  );
};

export default page;
