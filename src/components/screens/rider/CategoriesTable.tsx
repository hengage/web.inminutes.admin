"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, stringifyQuery, stringifyUrl } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { Search, Trash2 } from "lucide-react";
import { ICategory, useGetCategoriesQuery } from "@/api/vendors";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";

const CategoriesTable = () => {
  const router = useRouter();
  const result = useGetCategoriesQuery();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>(
    {}
  );
  const columns: ColumnDef<ICategory>[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "category",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Category</span>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span className="font-normal text-base text-ctm-secondary-200 capitalize">
            {item.name}
          </span>
        );
      },
    },
    {
      accessorKey: "sub-categories",
      header: () => (
        <span className="whitespace-nowrap font-semibold text-base">Sub-Categories</span>
      ),
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200 text-center">
          {row.original.subcategoryCount}
        </span>
      ),
    },
    {
      accessorKey: "vendors",
      header: () => <span className="whitespace-nowrap font-semibold text-base">No. Vendors</span>,
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200 text-center">
            {row.original.vendorCount}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Action</span>,
      cell: () => (
        <Button className="" variant={"ghost"} size="icon">
          <Trash2 />
        </Button>
      ),
    },
  ];
  const handleRefresh = (value: typeof queryValues) => {
    router.push(stringifyUrl(value));
    result.refetch();
  };
  const { allParams = {} } = useUrlState();
  useEffect(() => {
    setQueryValues({
      ...allParams,
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
                router.push(`vendor/${stringifyQuery({ page: 1, limit: 10 })}#1`);
                return { page: prev.page, limit: prev.limit };
              });
              result.refetch();
            }}
            variant={"secondary"}
            className="text-ctm-secondary-300"
          >
            Clear Filter
          </Button>
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

const Categories = () => (
  <Suspense>
    <CategoriesTable />
  </Suspense>
);

export default Categories;
