"use client";
import { useRouter } from "next/navigation";
import Tag from "@/components/general/Tag";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import PopOver from "@/components/ui/custom/PopOver";
import { Icon } from "@/components/ui/Icon";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, stringifyQuery, stringifyUrl } from "@/lib/utils";
import CheckboxItems from "@/components/ui/custom/checkbox/CheckboxItems";
import { Suspense, useEffect, useState } from "react";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { Search } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { tag } from "@/types";
import { IProduct, useGetProductCategoriesQuery, useGetProductsQuery } from "@/api/product";

const status = [
  { label: "Active", value: "active" },
  { label: "In Active", value: "inactive" },
];

const AllProductTable = () => {
  const router = useRouter();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>(
    {}
  );
  const categriesResult = useGetProductCategoriesQuery();

  const { data, isLoading, refetch } = useGetProductsQuery(queryValues);
  const handleRefresh = (value: typeof queryValues) => {
    router.push(stringifyUrl(value));
    result.refetch();
  };
  const { allParams } = useUrlState();
  useEffect(() => {
    setQueryValues({
      ...allParams,
      page: Number(allParams.page ?? 1),
      limit: Number(allParams.limit ?? 10),
    });
  }, [allParams]);
  const columns: ColumnDef<
    Pick<IProduct, "_id" | "businessName" | "businessLogo" | "email" | "category" | "accountStatus">
  >[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "businessName",
      header: () => (
        <span className="whitespace-nowrap font-semibold text-base">Business name</span>
      ),
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-1">
            <Image
              src={
                "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg"
              }
              alt={item.businessName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-normal text-base text-ctm-secondary-200 capitalize">
              {item.businessName}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "_id",
      header: () => <span className="whitespace-nowrap font-semibold text-base">ID Number</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200">{row.original._id}</span>
      ),
    },
    {
      accessorKey: "email",
      header: () => (
        <span className="whitespace-nowrap font-semibold text-base">Email Address</span>
      ),
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200">{row.original.email}</span>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Category</span>,
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200 capitalize">
            {row.original.category.name}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Status</span>,
      cell: ({ row }) => {
        return <Tag tag={row.original.accountStatus.toLowerCase() as tag} />;
      },
    },
    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Actions</span>,
      cell: () => (
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
      ),
    },
  ];

  return (
    <div className="my-4">
      <div className="bg-ctm-background rounded-md border-ctm-secondary-100 p-2 mb-2">
        <div className="flex gap-4 w-full my-4">
          <Button
            className="stroke-ctm-secondary-300 hover:stroke-ctm-primary-500 px-4"
            variant={"secondary"}
            size="icon"
            onClick={() => {
              handleRefresh(queryValues);
            }}
            disabled={isLoading}
          >
            <Refresh2
              className={cn("transition-transform", {
                "animate-spin text-ctm-primary-400": isLoading,
              })}
            />
          </Button>
          <Button
            onClick={() => {
              setQueryValues((prev) => {
                router.push(`product/${stringifyQuery({ page: 1, limit: 10 })}#0`);
                return { page: prev.page, limit: prev.limit };
              });
              refetch();
            }}
            variant={"secondary"}
            className="text-ctm-secondary-300"
          >
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
                setQueryValues((prev) => ({ ...prev, category: params.map((item) => item.value) }));
              }}
              selectedItems={categriesResult.item.filter((item) =>
                (queryValues.category as string[])?.includes(item.value)
              )}
              showSearchBox
              searchPlaceholder="Categories"
              items={categriesResult.item}
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
                setQueryValues((prev) => ({ ...prev, status: params ?? "" }));
              }}
              selectedItem={(queryValues.status as string) ?? ""}
              items={status}
            />
          </PopOver>
          <div className="w-full flex justify-end justify-self-end">
            <Input
              className="w-fit bg-ctm-secondary-100"
              slotBefore={<Search className="text-ctm-secondary-300" />}
              placeholder="Search"
              value={queryValues.search}
              onChange={(e) => setQueryValues((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
        <DataTable dataQuery={data} columns={columns} />
        {data.data?.data.length && data.data?.data.length > 0 ? (
          <Pagination
            total={data.data?.total ?? 10}
            page={Number(queryValues.page)}
            limit={Number(queryValues.limit)}
          />
        ) : null}
      </div>
    </div>
  );
};

const AllProduct = () => (
  <Suspense>
    <AllProductTable />
  </Suspense>
);

export default AllProduct;
