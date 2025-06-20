"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import PopOver from "@/components/ui/custom/PopOver";
import { Icon } from "@/components/ui/Icon";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, stringifyQuery, stringifyUrl } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { ChevronDown, Search } from "lucide-react";
import { IVendor, useGetVendorsQuery } from "@/api/vendors";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { DatePicker } from "@/components/ui/custom/date/DatePicker";
import { useQueryClient } from "@tanstack/react-query";
import { QUERY_KEYS } from "@/lib/constants/queryKeys";

const VendorsTable = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>({
    approvalStatus: "pending",
  });
  const { result } = useGetVendorsQuery(queryValues);
  const columns: ColumnDef<
    Pick<
      IVendor,
      "_id" | "businessName" | "businessLogo" | "email" | "category" | "accountStatus" | "createdAt"
    >
  >[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "applications",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Applications</span>,
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
      accessorKey: "date",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Date Applied</span>,
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200">
            {row.original.createdAt}
          </span>
        );
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
              Approve
            </Button>
            <Button className="w-[100px] justify-start" variant={"ghost"}>
              <Icon width={15} height={15} name="edit" />
              Reject
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
  const handleRefresh = (value: typeof queryValues) => {
    router.push(stringifyUrl(value));
    queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.VENDORS] });
    result.refetch();
  };
  const { allParams = {} } = useUrlState();
  useEffect(() => {
    setQueryValues({
      ...allParams,
      approvalStatus: "pending",
      page: Number(allParams.page ?? 1),
      limit: Number(allParams.limit ?? 10),
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
            onClick={() => {
              handleRefresh(queryValues);
            }}
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
              setQueryValues((prev) => {
                router.push(`vendor/${stringifyQuery({ page: 1, limit: 10 })}#0`);
                return { page: prev.page, limit: prev.limit };
              });
              result.refetch();
            }}
            variant={"secondary"}
            className="text-ctm-secondary-300"
          >
            Clear Filter
          </Button>
          <DatePicker
            trigger={
              <Button variant={"secondary"}>
                Date Applied
                <ChevronDown />
              </Button>
            }
            value={queryValues.date ? new Date(queryValues.date as string) : undefined}
            onSelect={(date) =>
              setQueryValues((prev) => ({ ...prev, date: date?.toISOString() ?? "" }))
            }
          />
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
        <DataTable dataQuery={result} columns={columns} />
        {result.data?.data.length && result.data?.data.length > 0 ? (
          <Pagination
            total={result.data?.total ?? 10}
            page={Number(queryValues.page)}
            limit={Number(queryValues.limit)}
          />
        ) : null}
      </div>
    </div>
  );
};

const Applicants = () => (
  <Suspense>
    <VendorsTable />
  </Suspense>
);

export default Applicants;
