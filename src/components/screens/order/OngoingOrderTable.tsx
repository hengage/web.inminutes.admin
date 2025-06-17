"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, stringifyQuery, stringifyUrl } from "@/lib/utils";
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
import { OrderRow, useGetOngoingOrdersQuery } from "@/api/order";
import { types } from "@/lib/comon/constant";
import DateRangePicker from "@/components/ui/custom/Daterange";

const OngoingOrderTable = () => {
  const router = useRouter();

  const [selectedType, setSelectedType] = useState<string>("");

  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>({
    type: selectedType,
    fromDate: "",
    toDate: "",
    page: 1,
    limit: 30,
    onlyOngoing: "true",
  });
  const { result } = useGetOngoingOrdersQuery(queryValues);

  const columns: ColumnDef<OrderRow>[] = [
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
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base capitalize text-ctm-secondary-200">
            {row.original.type}
          </span>
        );
      },
    },
    {
      accessorKey: "rider",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Rider</span>,
      cell: ({ row }) => {
        return (
          <span className="font-normal text-center text-base text-ctm-secondary-200">
            {row.original?.rider?.fullName || "-"}
          </span>
        );
      },
    },
    {
      accessorKey: "status",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Status</span>,
      cell: ({ row }) => {
        return <Tag tag={row.original.status.toLowerCase() as tag} />;
      },
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
  const handleRefresh = (value: typeof queryValues) => {
    router.push(stringifyUrl(value));
    result.refetch();
  };
  const { allParams = {} } = useUrlState();
  useEffect(() => {
    setQueryValues({
      ...allParams,
      type: selectedType,
      fromDate: allParams.fromDate ?? "",
      toDate: allParams.toDate ?? "",
      page: Number(allParams.page ?? 1),
      limit: Number(allParams.limit ?? 30),
    });
  }, [allParams, selectedType]);

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
                router.push(`order/${stringifyQuery({ page: 1, limit: 30 })}#1`);
                return { page: prev.page, limit: prev.limit };
              });
              setSelectedType("");
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
              value={queryValues.search as string}
              onChange={(e) => setQueryValues((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
        <DataTable dataQuery={result} columns={columns} />
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

const OngoingOrders = () => <OngoingOrderTable />;

export default OngoingOrders;
