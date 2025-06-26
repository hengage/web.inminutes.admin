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
import { Suspense, useEffect, useState } from "react";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { Search } from "lucide-react";
import { IRider, useGetRidersQuery } from "@/api/rider";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";

const status = [
  { label: "All", value: "" }, // Added to show all riders
  { label: "Active", value: "true" },
  { label: "Inactive", value: "false" },
];

const RidersTable = () => {
  const router = useRouter();
  const [queryValues, setQueryValues] = useState<{
    [name: string]: string | string[] | number;
  }>({ page: 1, limit: 30 });

  const { result } = useGetRidersQuery(queryValues);

  const columns: ColumnDef<
    Pick<IRider, "_id" | "fullName" | "displayName" | "email" | "currentlyWorking" | "phoneNumber">
  >[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "riderName",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Rider Name</span>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-1">
            <Image
              src={
                "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg"
              }
              alt={item.fullName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-normal text-base text-ctm-secondary-200 capitalize">
              {item.fullName}
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
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200">{row.original.email}</span>
      ),
    },
    {
      accessorKey: "phone",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Phone Number</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200 capitalize">
          {row.original.phoneNumber}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Work Status</span>,
      cell: ({ row }) => <Tag tag={row.original.currentlyWorking ? "active" : "inactive"} />,
    },
    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Action</span>,
      cell: ({ row }) => (
        <PopOver className="max-w-[110px]">
          <div className="flex flex-col justify-center items-center">
            <Button
              className="w-[100px] justify-start"
              variant={"ghost"}
              onClick={() => router.push(`/rider/${row.original._id}`)}
            >
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

  const handleRefresh = () => {
    router.push(stringifyUrl(queryValues));
    result.refetch();
  };

  // Sync queryValues with URL params
  const { allParams = {} } = useUrlState();
  useEffect(() => {
    setQueryValues({
      ...allParams,
      page: Number(allParams.page ?? 1),
      limit: Number(allParams.limit ?? 30),
    });
  }, [allParams]);

  return (
    <div className="my-4">
      <div className="bg-ctm-background rounded-md border-ctm-secondary-100 p-2 mb-2">
        <div className="flex gap-4 w-full my-4">
          <Button
            className="stroke-ctm-secondary-300 hover:stroke-ctm-primary-500 px-4"
            variant={"secondary"}
            size="icon"
            onClick={handleRefresh}
            disabled={result.isRefetching}
          >
            <Refresh2
              className={cn("transition-transform", {
                "animate-spin text-ctm-primary-400": result.isRefetching,
              })}
            />
          </Button>
          <Button
            onClick={() => {
              setQueryValues({ page: 1, limit: 30 });
              router.push(`rider/${stringifyQuery({ page: 1, limit: 30 })}#0`);
              result.refetch();
            }}
            variant={"secondary"}
            className="text-ctm-secondary-300"
          >
            Clear Filter
          </Button>
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
              value={(queryValues.search as string) ?? ""}
              onChange={(e) => setQueryValues((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
        <DataTable dataQuery={result} columns={columns} />
        {result.data?.data?.length && result.data?.data?.length > 0 ? (
          <Pagination
            total={result.data?.total ?? 30}
            page={Number(queryValues.page)}
            limit={Number(queryValues.limit)}
          />
        ) : null}
      </div>
    </div>
  );
};

const Riders = () => (
  <Suspense>
    <RidersTable />
  </Suspense>
);

export default Riders;
