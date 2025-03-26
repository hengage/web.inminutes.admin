"use client";
import { useRouter } from "next/navigation";
import Tag from "@/components/general/Tag";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import PopOver from "@/components/ui/custom/PopOver";
import { Icon } from "@/components/ui/Icon";
import { Refresh2 } from "iconsax-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useUrlState from "@/hooks/useUrlState";
import { stringifyUrl } from "@/lib/utils";
import CheckboxItems from "@/components/ui/custom/checkbox/CheckboxItems";
import { useEffect, useState } from "react";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { Search } from "lucide-react";

const arr = new Array(10).fill(1);
const categories = [
  { label: "Food & Beverage", value: "food" },
  { label: "Fashion", value: "fashion" },
];
const status = [
  { label: "Active", value: "active" },
  { label: "In Active", value: "in-active" },
];

const VendorsTable = () => {
  const router = useRouter();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>(
    {}
  );
  const handleQueryChange = (key: string, selectedOptions: string | string[] | number) => {
    setQueryValues((prevqueryValues) => ({
      ...prevqueryValues,
      ...{ [key]: selectedOptions },
    }));
  };
  const { getParam, allParams } = useUrlState();
  useEffect(() => {
    setQueryValues({ ...allParams });
  }, [allParams]);
  return (
    <div className="my-4">
      <div className="bg-ctm-background rounded-md border-ctm-secondary-100 p-2 mb-2">
        <div className="flex gap-4 w-full my-4">
          <Button
            className="stroke-ctm-secondary-300 hover:stroke-ctm-primary-500 px-4"
            variant={"secondary"}
            size="icon"
            onClick={() => {
              router.push(stringifyUrl({ params: allParams, query: queryValues }));
            }}
          >
            <Refresh2 />
          </Button>
          <Button variant={"secondary"} className="text-ctm-secondary-300">
            Clear Filter
          </Button>
          <PopOver
            trigger={
              <Button className="stroke-ctm-secondary-300" variant={"secondary"}>
                Category
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <CheckboxItems
              onSubmit={(params) => {
                handleQueryChange(
                  "category",
                  params.map((item) => item.value)
                );
              }}
              selectedItems={categories.filter((item) =>
                (queryValues.category as string[])?.includes(item.value)
              )}
              showSearchBox
              searchPlaceholder="Categories"
              items={categories}
            />
          </PopOver>
          <PopOver
            trigger={
              <Button className="stroke-ctm-secondary-300" variant={"secondary"}>
                Status
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <RadioItems
              onSubmit={(params) => {
                handleQueryChange("status", params ?? "");
              }}
              selectedItem={getParam("status") ?? ""}
              items={status}
            />
          </PopOver>
          <div className="w-full flex justify-end justify-self-end">
            <Input
              className="w-fit bg-ctm-secondary-100"
              slotBefore={<Search className="text-ctm-secondary-300" />}
              placeholder="Search"
            />
          </div>
        </div>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-base">S/N</TableHead>
              <TableHead className="font-semibold text-base">Business Name</TableHead>
              <TableHead className="font-semibold text-base">ID Number</TableHead>
              <TableHead className="font-semibold text-base">Email Address</TableHead>
              <TableHead className="font-semibold text-base">Category</TableHead>
              <TableHead className="font-semibold text-base">Status</TableHead>
              <TableHead className="font-semibold text-base">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {arr.map((_, i) => (
              <TableRow key={i}>
                <TableCell className="font-normal text-base text-ctm-secondary-200">
                  {i + 1}
                </TableCell>
                <TableCell className="font-normal text-base text-ctm-secondary-200">
                  Genesis Foods
                </TableCell>
                <TableCell className="font-normal text-base text-ctm-secondary-200">
                  ID: #32678FGBDF
                </TableCell>
                <TableCell className="font-normal text-base text-ctm-secondary-200">
                  Johndoe85@gmail.com
                </TableCell>
                <TableCell className="font-normal text-base text-ctm-secondary-200">
                  Food & Beverage
                </TableCell>
                <TableCell className="font-normal text-base text-ctm-secondary-200">
                  <Tag tag="pending" />
                </TableCell>
                <TableCell className="font-normal text-base text-ctm-secondary-200">
                  <PopOver className="max-w-[110px]">
                    <div className="flex flex-col justify-center items-center">
                      <Button className="w-[100px] justify-start" variant={"ghost"}>
                        <Icon width={15} height={15} name="eye" />
                        View
                      </Button>
                      <Button className="w-[100px] justify-start" variant={"ghost"}>
                        <Icon width={15} height={15} name="restrict" />
                        Restrict
                      </Button>
                      <Button className="w-[100px] justify-start" variant={"ghost"}>
                        <Icon width={15} height={15} name="edit" />
                        Edit
                      </Button>
                      <Button className="w-[100px] justify-start" variant={"ghost"}>
                        <Icon width={15} height={15} name="trash" />
                        Delete
                      </Button>
                    </div>
                  </PopOver>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <Pagination total={100} currentPage={Number(getParam("page") ?? 1)} pageSize={10} />
    </div>
  );
};

export default VendorsTable;
