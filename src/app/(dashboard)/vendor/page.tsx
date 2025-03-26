import Link from "next/link";
import { Icon } from "@/components";
import { CustomButton as Button } from "@/components/ui/custom/button";
import Tab from "@/components/ui/custom/Tabs";
import VendorsTable from "@/components/screens/vendor/VendorsTable";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const params = await searchParams;
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
            <Link href={"#"}>Create Vendor</Link>
          </Button>

          <Button variant="ctm-outline" asChild className="border-2">
            <Link href={"#"}>Update</Link>
          </Button>
        </span>
      </div>
      <Tab
        items={[
          {
            trigger: (
              <Link href={{ pathname: "/vendor", query: { page: 1, tab: 0 } }}>All Vendors</Link>
            ),
            content: <VendorsTable />,
            key: "0",
          },
          {
            trigger: (
              <Link href={{ pathname: "/vendor", query: { page: 1, tab: 1 } }}>All Categories</Link>
            ),
            content: <></>,
            key: "1",
          },
          {
            trigger: (
              <Link href={{ pathname: "/vendor", query: { page: 1, tab: 2 } }}>
                All Applications
              </Link>
            ),
            content: <></>,
            key: "2",
          },
        ]}
        value={(params?.tab as string) ?? "0"}
      />
    </main>
  );
};

export default page;
