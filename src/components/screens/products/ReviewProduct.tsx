/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useRouter } from "next/navigation";
import { Pagination } from "@/components/ui/custom/Pagination";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, stringifyQuery, stringifyUrl } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import {
  IProduct,
  useGetProductCategoriesQuery,
  useGetReviewingProductsQuery,
  useUpdateProductStatusMutation,
} from "@/api/product";
import { Button } from "@/components/ui/button";
import { useToast } from "@/providers/ToastContext";
import { Search } from "lucide-react";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import PopOver from "@/components/ui/custom/PopOver";
import DateRangePicker from "@/components/ui/custom/Daterange";
import CheckboxItems from "@/components/ui/custom/checkbox/CheckboxItems";
import { Icon } from "@/components/ui/Icon";
import { CustomInput as Input } from "@/components/ui/custom/input";
import Link from "next/link";
const priceRangeOptions = [
  { label: "₦500 - ₦10,000", value: "500-10000" },
  { label: "₦10,000 - ₦50,000", value: "10000-50000" },
  { label: "₦50,000 - ₦100,000", value: "50000-100000" },
  { label: "₦100,000 - ₦200,000", value: "100000-200000" },
  { label: "₦200,000 - ₦500,000", value: "200000-500000" },
  { label: "₦500,000+", value: "500000-" },
];
const ReviewProductTable = () => {
  const { allParams } = useUrlState();
  const router = useRouter();
  const { showSuccess } = useToast();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>(
    {}
  );
  const { result, refetch } = useGetReviewingProductsQuery(queryValues);
  const { mutate: updateStatus, isPending: updateLoading } = useUpdateProductStatusMutation();
  const { item: categoryItems, isLoading: categoryItemsLoading } = useGetProductCategoriesQuery({});
  const [loadingId, setLoadingId] = useState<string | null>(null);
  const handleRefresh = (value: typeof queryValues) => {
    const queryString = new URLSearchParams(value as Record<string, string>).toString();
    router.push(`/product?${queryString}`);
  };

  const handleStatusUpdate = async (productId: string, newStatus: boolean) => {
    setLoadingId(productId);
    try {
      await updateStatus(
        {
          productId,
          approve: newStatus,
        },
        {
          onSuccess: () => {
            showSuccess("Product status updated successfully");
            refetch();
          },
          onError: (err: unknown) => {
            console.error("Error updating status:", err);
          },
        }
      );
    } finally {
      setLoadingId(null);
    }
  };
  useEffect(() => {
    setQueryValues({
      ...allParams,
      page: Number(allParams.page ?? 1),
      limit: Number(allParams.limit ?? 25),
    });
  }, [allParams]);
  const columns: ColumnDef<
    Pick<IProduct, "_id" | "name" | "vendor" | "cost" | "category" | "status">
  >[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
    },
    {
      accessorKey: "name",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Product name</span>,
      cell: ({ row }) => {
        const item = row.original;
        return (
          <div className="flex items-center gap-1">
            <Image
              src={
                "https://res.cloudinary.com/dx73n7qiv/image/upload/v1717115764/tmp-7-1717115763718_dvecds.jpg"
              }
              alt={item.name}
              width={40}
              height={40}
              className="rounded-full"
            />
            <span className="font-normal text-base text-ctm-secondary-200 capitalize">
              {item.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "_id",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Product ID</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200">{row.original._id}</span>
      ),
    },
    {
      accessorKey: "cost",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Price </span>,
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200">{row.original.cost}</span>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Category</span>,
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200 capitalize">
            {row.original.category?.name || "Uncategorized"}{" "}
          </span>
        );
      },
    },
    {
      accessorKey: "vendor",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Vendor</span>,
      cell: ({ row }) => {
        const vendorName = row.original.vendor?.businessName || "N/A";
        const vendorId = row.original.vendor?._id;

        return (
          <Link
            href={`/vendor/${vendorId}`}
            prefetch={false}
            onClick={(e) => {
              if (vendorName === "N/A" || !vendorId) {
                e.preventDefault();
              }
            }}
            className={cn(
              "font-normal text-base capitalize underline",
              vendorName !== "N/A" && vendorId
                ? "text-blue-600 hover:text-blue-800"
                : "text-gray-400 cursor-not-allowed"
            )}
          >
            {vendorName}
          </Link>
        );
      },
    },

    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Actions</span>,
      cell: ({ row }) => {
        const productId = row.original._id;
        const isUpdating = loadingId === productId;

        return (
          <Button
            onClick={() => handleStatusUpdate(row.original._id, true)}
            className="border border-blue-700 bg-transparent hover:bg-transparent text-blue-700 rounded-md px-4 py-2"
            disabled={isUpdating}
          >
            {isUpdating ? <span className="animate-spin">...</span> : "Approve Product"}
          </Button>
        );
      },
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
            disabled={result.isLoading}
          >
            <Refresh2
              className={cn("transition-transform", {
                "animate-spin text-ctm-primary-400": result.isLoading,
              })}
            />
          </Button>
          <Button
            onClick={() => {
              const resetValues = { page: 1, limit: 25 };
              setQueryValues(resetValues);
              router.push(`/product${stringifyQuery(resetValues)}`);
            }}
            variant={"secondary"}
            className="text-ctm-secondary-300"
          >
            Clear Filter
          </Button>
          <PopOver
            trigger={
              <Button
                className="stroke-ctm-secondary-300"
                variant={"secondary"}
                disabled={categoryItemsLoading}
              >
                Category
                {categoryItemsLoading ? (
                  <Refresh2 className="animate-spin ml-2" size={16} />
                ) : (
                  <Icon name="arrow-down" height={16} width={16} />
                )}
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <CheckboxItems
              onSubmit={(params) => {
                setQueryValues((prev) => ({ ...prev, category: params.map((item) => item.value) }));
              }}
              selectedItems={
                categoryItems?.filter((item) =>
                  (queryValues.category as string[])?.includes(item.value)
                ) || []
              }
              showSearchBox
              searchPlaceholder="Categories"
              items={categoryItems || []}
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
                Amount
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <RadioItems
              className="w-full"
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

          <div className="w-full flex justify-end justify-self-end">
            <Input
              className="w-fit bg-transparent"
              slotBefore={<Search className="text-ctm-secondary-300" />}
              placeholder="Search"
              value={queryValues.searchQuery}
              onChange={(e) => setQueryValues((prev) => ({ ...prev, searchQuery: e.target.value }))}
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

const ReviewProduct = () => (
  <Suspense
    fallback={
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-ctm-primary-500"></div>
      </div>
    }
  >
    <ReviewProductTable />
  </Suspense>
);

export default ReviewProduct;
