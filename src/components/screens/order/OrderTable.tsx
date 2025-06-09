"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, formatDate, formatNaira, stringifyQuery, stringifyUrl } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { Search } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import PopOver from "@/components/ui/custom/PopOver";
import { Icon } from "@/components/ui/Icon";
import Tag from "@/components/general/Tag";
import { tag } from "@/types";
import { OrderRow, } from "@/api/customers";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { useGetCustomersOrdersQuery, useGetSingleOrderQuery } from "@/api/order";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";

const status = [
  { label: "Pending", value: "pending" },
  { label: "Ready", value: "ready" },
  { label: "Active", value: "active" },
  { label: "In-Transit", value: "in-transit" },
  { label: "NearBy", value: "nearby" },
  { label: "Approved", value: "approved" },
  { label: "Arrived", value: "arrived" },
];
const CustomersTable = () => {
  const router = useRouter();
  
  const [selectedStatus, setSelectedStatus] = useState<string>("");

  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>({
    status: selectedStatus,
    page: 1,
    limit: 30,
  });
  const { result } = useGetCustomersOrdersQuery();

  console.log(result, 'result')

  const [selectedErrandId, setSelectedErrandId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Pass the selectedErrandId to the hook
  const singleOrderQuery = useGetSingleOrderQuery(selectedErrandId ?? "");
  const singleOrder = singleOrderQuery.data;
  const isSingleOrderLoading: boolean = singleOrderQuery.isLoading;

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
          <span className="font-normal text-base text-ctm-secondary-200">{row.original.rider}</span>
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
              onClick={() => {
                setSelectedErrandId(row.original._id);
                setIsDialogOpen(true);
              }}
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
  const { allParams } = useUrlState();
  useEffect(() => {
    setQueryValues({
      ...allParams,
      status: selectedStatus,
      page: Number(allParams.page ?? 1),
      limit: Number(allParams.limit ?? 30),
    });
  }, [allParams, selectedStatus]);

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
                setSelectedStatus(params ?? "");
                setQueryValues((prev) => ({ ...prev, status: params ?? "" }));
              }}
              selectedItem={selectedStatus}
              items={status}
            />
          </PopOver>
          <Button
            onClick={() => {
              setQueryValues((prev) => {
                router.push(`order/${stringifyQuery({ page: 1, limit: 30 })}#1`);
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
              className="w-fit"
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
            total={result.data?.total ?? 30}
            page={Number(queryValues.page)}
            limit={Number(queryValues.limit)}
          />
        ) : null}
      </div>

      <Dialog
        open={isDialogOpen}
        onOpenChange={(open) => {
          setIsDialogOpen(open);
          if (!open) setSelectedErrandId(null);
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Order Details</DialogTitle>
          </DialogHeader>
          {isSingleOrderLoading ? (
            <div>Loading...</div>
          ) : singleOrder ? (
            <div className="flex flex-col gap-2">
              <div>
                <strong>Order ID:</strong> {singleOrder?._id}
              </div>
              <div className="flex gap-2 items-center">
                <strong>Status:</strong> <Tag tag={singleOrder?.status?.toLowerCase() as tag} />
              </div>
              <div>
                <strong>Type:</strong> {singleOrder?.type}
              </div>
              <div>
                <strong>Customer:</strong> {singleOrder?.customer?.fullName}
              </div>
              <div>
                <strong>Recipient Phone:</strong> {singleOrder?.recipientPhoneNumber}
              </div>
              <div>
                <strong>Vendor:</strong> {singleOrder?.vendor?.businessName}
              </div>
              <div>
                <strong>Delivery Address:</strong> {singleOrder?.deliveryAddress}
              </div>
              <div>
                <strong>Delivery Fee:</strong> {formatNaira(singleOrder?.deliveryFee)}
              </div>
              <div>
                <strong>Service Fee:</strong> {formatNaira(singleOrder?.serviceFee)}
              </div>
              <div>
                <strong>Total Products Cost:</strong> {formatNaira(singleOrder?.totalProductsCost)}
              </div>
              <div>
                <strong>Total Cost:</strong> {formatNaira(singleOrder?.totalCost)}
              </div>
              <div>
                <strong>Items:</strong>
                <ul className="ml-4 list-disc">
                  {singleOrder?.items?.map(
                    (
                      item: {
                        product: string;
                        quantity: number;
                        cost: number;
                        vendor: string;
                        addOns?: string[];
                      },
                      idx: number
                    ) => (
                      <li key={idx}>
                        <div>
                          <strong>Product:</strong> {item.product}
                        </div>
                        <div>
                          <strong>Quantity:</strong> {item.quantity}
                        </div>
                        <div>
                          <strong>Cost:</strong> {formatNaira(item.cost)}
                        </div>
                        <div>
                          <strong>Vendor:</strong> {item.vendor}
                        </div>
                        {/* Add-ons if any */}
                        {item.addOns && item.addOns.length > 0 && (
                          <div>
                            <strong>AddOns:</strong> {item.addOns.join(", ")}
                          </div>
                        )}
                      </li>
                    )
                  )}
                </ul>
              </div>
              <div>
                <strong>Created At:</strong> {formatDate(singleOrder?.createdAt)}
              </div>
              <div>
                <strong>Updated At:</strong> {formatDate(singleOrder?.updatedAt)}
              </div>
            </div>
          ) : (
            <div>No details found.</div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

const Orders = () => (
  <Suspense>
    <CustomersTable />
  </Suspense>
);

export default Orders;
