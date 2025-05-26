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
import CheckboxItems from "@/components/ui/custom/checkbox/CheckboxItems";
import { Suspense, useEffect, useState } from "react";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { CheckSquare2, Search, X } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import { tag } from "@/types";
import {
  IProduct,
  useDeleteProductMutation,
  useGetProductCategoriesQuery,
  useGetProductsQuery,
  useUpdateProductStatusMutation,
} from "@/api/product";
import { useToast } from "@/providers/ToastContext";
import DateRangePicker from "@/components/ui/custom/Daterange";
import Link from "next/link";

const status = [
  { label: "Pending", value: "pending" },
  { label: "Approved", value: "approved" },
  { label: "Rejected", value: "rejected" },
];
const priceRangeOptions = [
  { label: "₦500 - ₦10,000", value: "500-10000" },
  { label: "₦10,000 - ₦50,000", value: "10000-50000" },
  { label: "₦50,000 - ₦100,000", value: "50000-100000" },
  { label: "₦100,000 - ₦200,000", value: "100000-200000" },
  { label: "₦200,000 - ₦500,000", value: "200000-500000" },
  { label: "₦500,000+", value: "500000-" },
];
const AllProductTable = () => {
  const router = useRouter();
  const { showSuccess } = useToast();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>(
    {}
  );
  const { item: categoryItems, isLoading: categoryItemsLoading } = useGetProductCategoriesQuery({
    page: Number(1),
    limit: Number(25),
  });
  const { result, isLoading, refetch } = useGetProductsQuery(queryValues);
  const { mutate: deleteItem, isPending } = useDeleteProductMutation();
  const { mutate: updateStatus } = useUpdateProductStatusMutation();
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
  const handleDelete = (productId: string) => {
    deleteItem(productId, {
      onSuccess: () => {
        showSuccess("Product deleted successfully");
      },
      onError: (err: unknown) => {
        console.error("Error deleting product:", err);
      },
    });
  };

  const { allParams } = useUrlState();
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
      header: () => <span className="whitespace-nowrap font-semibold text-base">ID Number</span>,
      cell: ({ row }) => (
        <span className="font-normal text-base text-ctm-secondary-200">{row.original._id}</span>
      ),
    },
    {
      accessorKey: "cost",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Price </span>,
      cell: ({ row }) => {
        const formattedAmount = Number(row.original.cost).toLocaleString("en-NG");
        return (
          <>
            <span className="font-normal text-base text-ctm-secondary-200">₦{formattedAmount}</span>
          </>
        );
      },
    },
    {
      accessorKey: "category",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Category</span>,
      cell: ({ row }) => {
        return (
          <Link
            href={`/product/category/details?id=${row.original.category?._id}&name=${encodeURIComponent(row.original.category?.name)}`}
            className="text-blue-600 underline font-normal text-base capitalize hover:text-blue-800"
          >
            {row.original.category.name}
          </Link>
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
      accessorKey: "status",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Status</span>,
      cell: ({ row }) => {
        return <Tag tag={row.original.status.toLowerCase() as tag} />;
      },
    },
    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Actions</span>,
      cell: ({ row }) => {
        const status = row.original.status.toLowerCase();
        const productId = row.original._id;
        const isUpdating = loadingId === productId;

        return (
          <PopOver className="max-w-[110px]">
            <div className="flex flex-col justify-center items-center">
              <Button
                className="w-[100px] justify-start"
                variant={"ghost"}
                onClick={() => router.push(`/product/${productId}`)}
              >
                <Icon width={15} height={15} name="eye" />
                View
              </Button>

              {status === "pending" && (
                <>
                  <Button
                    className="w-[100px] justify-start text-green-600"
                    variant={"ghost"}
                    onClick={() => handleStatusUpdate(productId, true)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? <Refresh2 className="animate-spin" /> : <CheckSquare2 />}
                    {isUpdating ? "Updating..." : "Approve"}
                  </Button>
                  <Button
                    className="w-[100px] justify-start text-red-600"
                    variant={"ghost"}
                    onClick={() => handleStatusUpdate(productId, false)}
                    disabled={isUpdating}
                  >
                    {isUpdating ? <Refresh2 className="animate-spin" /> : <X />}
                    {isUpdating ? "Updating..." : "Reject"}
                  </Button>
                </>
              )}

              {status === "rejected" && (
                <Button
                  className="w-[100px] justify-start text-green-600"
                  variant={"ghost"}
                  onClick={() => handleStatusUpdate(productId, true)}
                  disabled={isUpdating}
                >
                  {isUpdating ? <Refresh2 className="animate-spin" /> : <CheckSquare2 />}
                  {isUpdating ? "Updating..." : "Approve"}
                </Button>
              )}

              <Button
                className="w-[100px] justify-start"
                variant={"ghost"}
                onClick={() => handleDelete(productId)}
                disabled={isPending || isUpdating}
              >
                {isPending ? (
                  <Refresh2 className="animate-spin" />
                ) : (
                  <Icon width={15} height={15} name="trash" />
                )}
                {isPending ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </PopOver>
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

const AllProduct = () => (
  <Suspense>
    <AllProductTable />
  </Suspense>
);

export default AllProduct;
