"use client";

import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, stringifyUrl } from "@/lib/utils";
import { useEffect, useState } from "react";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { Search } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import PopOver from "@/components/ui/custom/PopOver";
import { Icon } from "@/components/ui/Icon";
import Tag from "@/components/general/Tag";
import { tag } from "@/types";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { OrderRow } from "@/api/order";
import { ErrandRow } from "@/api/errand";
import { types } from "@/lib/comon/constant";
import DateRangePicker from "@/components/ui/custom/Daterange";
import { useDebounce } from "@/hooks/useDebounce";
import { useGetOrdersQuery, useGetErrandQuery } from "@/api/rider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const RiderActivityTable = () => {
  const router = useRouter();
  const { riderId } = useParams<{ riderId?: string }>();
  const [tableType, setTableType] = useState<"orders" | "errands">("orders");
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [searchInput, setSearchInput] = useState("");
  const debouncedSearchTerm = useDebounce(searchInput, 500);

  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>({
    status: selectedStatus,
    type: selectedType,
    searchQuery: searchInput,
    fromDate: "",
    toDate: "",
    page: 1,
    limit: 30,
  });

  // Call both hooks unconditionally to satisfy React's rules of hooks
  const ordersResult = useGetOrdersQuery(queryValues, riderId ?? "");
  const errandsResult = useGetErrandQuery(queryValues, riderId ?? "");
  const result = tableType === "orders" ? ordersResult : errandsResult;

  // Define columns for Orders
  const orderColumns: ColumnDef<OrderRow>[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "_id",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Order ID</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200">{row.original._id}</span>
      ),
    },
    {
      accessorKey: "type",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Type</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base capitalize text-ctm-secondary-200">
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: "rider",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Rider</span>,
      cell: ({ row }) => (
        <span
          onClick={() => router.push(`/riders/${row.original._id}`)}
          className="font-normal text-center text-base text-ctm-secondary-200 cursor-pointer"
        >
          {row.original?.rider?.fullName || "-"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Status</span>,
      cell: ({ row }) => <Tag tag={row.original.status.toLowerCase() as tag} />,
    },
    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Actions</span>,
      cell: ({ row }) => (
        <PopOver className="max-w-[110px]">
          <div className="flex flex-col justify-center items-center">
            <Button
              className="w-[100px] justify-start"
              variant={"ghost"}
              onClick={() => router.push(`/order/${row.original._id}`)}
            >
              <Icon width={15} height={15} name="eye" />
              View
            </Button>
          </div>
        </PopOver>
      ),
    },
  ];

  // Define columns for Errands
  const errandColumns: ColumnDef<ErrandRow>[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "_id",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Errand ID</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200">{row.original._id}</span>
      ),
    },
    {
      accessorKey: "type",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Type</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base capitalize text-ctm-secondary-200">
          {row.original.type}
        </span>
      ),
    },
    {
      accessorKey: "customer",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Customer</span>,
      cell: ({ row }) => (
        <span
          onClick={() => router.push(`/customer/${row.original._id}`)}
          className="font-normal cursor-pointer text-center text-base text-ctm-secondary-200"
        >
          {row.original?.customer?.fullName || "-"}
        </span>
      ),
    },
    {
      accessorKey: "status",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Status</span>,
      cell: ({ row }) => <Tag tag={row.original.status.toLowerCase() as tag} />,
    },
    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Actions</span>,
      cell: ({ row }) => (
        <PopOver className="max-w-[110px]">
          <div className="flex flex-col justify-center items-center">
            <Button
              className="w-[100px] justify-start"
              variant={"ghost"}
              onClick={() => router.push(`/errand/${row.original._id}`)}
            >
              <Icon width={15} height={15} name="eye" />
              View
            </Button>
          </div>
        </PopOver>
      ),
    },
  ];

  const handleRefresh = (value: typeof queryValues) => {
    router.push(stringifyUrl(value));
    result.result.refetch();
  };

  const { allParams = {} } = useUrlState();
  useEffect(() => {
    setQueryValues({
      ...allParams,
      status: selectedStatus,
      type: selectedType,
      searchQuery: debouncedSearchTerm,
      fromDate: allParams.fromDate ?? "",
      toDate: allParams.toDate ?? "",
      page: Number(allParams.page ?? 1),
      limit: Number(allParams.limit ?? 30),
    });
  }, [allParams, selectedStatus, debouncedSearchTerm, selectedType]);

  useEffect(() => {
    setQueryValues((prev) => ({
      ...prev,
      searchQuery: debouncedSearchTerm,
    }));
  }, [debouncedSearchTerm]);

  return (
    <div className="my-4">
      <div className="bg-ctm-background rounded-md border-ctm-secondary-100 p-2 mb-2">
        <div className="flex gap-4 w-full my-4">
          <Button
            className="stroke-ctm-secondary-300 hover:stroke-ctm-primary-500 px-4"
            variant={"secondary"}
            size="icon"
            onClick={() => handleRefresh(queryValues)}
            disabled={result.result.isRefetching}
          >
            <Refresh2
              className={cn("transition-transform", {
                "animate-spin text-ctm-primary-400": result.result.isRefetching,
              })}
            />
          </Button>
          <Button
            onClick={() => {
              setQueryValues((prev) => ({
                ...prev,
                status: "",
                type: "",
                searchQuery: "",
                fromDate: "",
                toDate: "",
                page: 1,
                limit: 30,
              }));
              setSelectedStatus("");
              setSelectedType("");
              setSearchInput("");
              result.result.refetch();
            }}
            variant={"secondary"}
            className="text-ctm-secondary-300"
          >
            Clear Filter
          </Button>
          <div className="mb-4">
            <Select
              value={tableType}
              onValueChange={(value: "orders" | "errands") => setTableType(value)}
            >
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select Table" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="orders">Orders</SelectItem>
                <SelectItem value="errands">Errands</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <PopOver
            trigger={
              <Button className="stroke-ctm-secondary-300" variant={"secondary"}>
                Type
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <RadioItems
              onSubmit={(params) => {
                setSelectedType(params ?? "");
                setQueryValues((prev) => ({ ...prev, type: params ?? "" }));
              }}
              selectedItem={selectedType}
              items={types}
            />
          </PopOver>
          <DateRangePicker
            fromDate={queryValues.fromDate ? new Date(queryValues.fromDate as string) : undefined}
            toDate={queryValues.toDate ? new Date(queryValues.toDate as string) : undefined}
            onApply={(fromDate, toDate) => {
              setQueryValues((prev) => {
                const newValues = { ...prev };
                if (fromDate) {
                  newValues.fromDate = fromDate.toISOString();
                } else {
                  delete newValues.fromDate;
                }
                if (toDate) {
                  newValues.toDate = toDate.toISOString();
                } else {
                  delete newValues.toDate;
                }
                if (!fromDate && !toDate) {
                  delete newValues.fromDate;
                  delete newValues.toDate;
                }
                return newValues;
              });
            }}
          />
          <div className="w-full flex justify-end justify-self-end">
            <Input
              className="w-fit"
              slotBefore={<Search className="text-ctm-secondary-300" />}
              placeholder="Search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          </div>
        </div>
        <DataTable
          dataQuery={result.result}
          columns={tableType === "orders" ? orderColumns : errandColumns}
        />
        {result.data?.data.length && result.data?.data.length > 0 ? (
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

export default RiderActivityTable;
