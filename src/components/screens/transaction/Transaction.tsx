/* eslint-disable @typescript-eslint/no-unused-vars */
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
import { ChevronDown, Search } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { tag } from "@/types";
import { ITransaction, useGetTransactionQuery } from "@/api/transaction";
import TransactionDetails from "./TransactionDetails";
import { DatePicker } from "@/components/ui/custom/date/DatePicker";
import DateRangePicker from "@/components/ui/custom/Daterange";

const status = [
  { label: "Success", value: "success" },
  { label: "Abandoned", value: "abandoned" },
  { label: "Pending", value: "pending" },
];
const reason = [
  { label: "Cashout", value: "cashout" },
  { label: "Refund", value: "refund" },
  { label: "Disbursement", value: "disbursement" },
];

const priceRangeOptions = [
  { label: "₦500 - ₦10,000", value: "500-10000" },
  { label: "₦10,000 - ₦50,000", value: "10000-50000" },
  { label: "₦50,000 - ₦100,000", value: "50000-100000" },
  { label: "₦100,000 - ₦200,000", value: "100000-200000" },
  { label: "₦200,000 - ₦500,000", value: "200000-500000" },
  { label: "₦500,000+", value: "500000-" },
];

const TransactionTable = () => {
  const router = useRouter();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>(
    {}
  );
  const { result } = useGetTransactionQuery(queryValues);
  const columns: ColumnDef<
    Pick<ITransaction, "_id" | "reason" | "reference" | "amount" | "status" | "createdAt">
  >[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "reason",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Reason</span>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <span className="font-normal text-base text-ctm-secondary-200 capitalize">
            {item.reason}
          </span>
        );
      },
    },
    {
      accessorKey: "reference",
      header: () => (
        <span className="whitespace-nowrap font-semibold text-base">Transaction ID</span>
      ),
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200">
          {row.original.reference}
        </span>
      ),
    },
    {
      accessorKey: "createdAt",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Date/Time</span>,
      cell: ({ row }) => {
        const date = new Date(row.original.createdAt);
        const formatted = new Intl.DateTimeFormat("en-NG", {
          year: "numeric",
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          hour12: true,
        }).format(date);

        return <span className="font-normal text-base text-ctm-secondary-200">{formatted}</span>;
      },
    },

    {
      accessorKey: "amount",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Amount</span>,
      cell: ({ row }) => {
        const formattedAmount = Number(row.original.amount).toLocaleString("en-NG");
        return (
          <span className="font-normal text-base text-ctm-secondary-200">₦{formattedAmount}</span>
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
            <TransactionDetails transaction={row.original._id}>
              <Button className="w-[100px] justify-start" variant={"ghost"}>
                <Icon width={15} height={15} name="eye" />
                View
              </Button>
            </TransactionDetails>

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

  return (
    <main className="flex flex-col p-6 bg-white">
      <div className="bg-ctm-background rounded-md border-ctm-secondary-100 p-2 mb-2">
        <div className="flex gap-4 w-full my-4 flex-wrap">
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
                router.push(`transaction/${stringifyQuery({ page: 1, limit: 10 })}#0`);
                return { page: prev.page, limit: prev.limit };
              });
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
                Reason
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <RadioItems
              onSubmit={(params) => {
                if (params) {
                  setQueryValues((prev) => ({ ...prev, reason: params }));
                } else {
                  setQueryValues((prev) => {
                    const { reason, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              selectedItem={(queryValues.reason as string) ?? ""}
              items={reason}
            />
          </PopOver>
          <PopOver
            trigger={
              <Button className="stroke-ctm-secondary-300" variant={"secondary"}>
                Amount
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <RadioItems
              onSubmit={(params) => {
                if (params) {
                  const [min, max] = params.split("-");
                  setQueryValues((prev) => ({
                    ...prev,
                    lowestAmount: min,
                    highestAmount: max,
                  }));
                } else {
                  setQueryValues((prev) => {
                    const { lowestAmount, highestAmount, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              selectedItem={
                queryValues.lowestAmount && queryValues.highestAmount
                  ? `${queryValues.lowestAmount}-${queryValues.highestAmount}`
                  : ""
              }
              items={priceRangeOptions}
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
                if (params) {
                  setQueryValues((prev) => ({ ...prev, status: params }));
                } else {
                  setQueryValues((prev) => {
                    const { status, ...rest } = prev;
                    return rest;
                  });
                }
              }}
              selectedItem={(queryValues.status as string) ?? ""}
              items={status}
            />
          </PopOver>
          <div className="w-full flex justify-end justify-self-end">
            <Input
              className="w-fit bg-transparent"
              slotBefore={<Search className="text-ctm-secondary-300" />}
              placeholder="Search"
              value={(queryValues.search as string) || ""}
              onChange={(e) => setQueryValues((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
        <DataTable dataQuery={result} columns={columns} />
        {result.data?.data && result.data?.data?.length > 0 ? (
          <Pagination
            total={result.data?.total ?? 10}
            page={Number(queryValues.page)}
            limit={Number(queryValues.limit)}
          />
        ) : null}
      </div>
    </main>
  );
};

const Transaction = () => (
  <Suspense>
    <TransactionTable />
  </Suspense>
);

export default Transaction;
