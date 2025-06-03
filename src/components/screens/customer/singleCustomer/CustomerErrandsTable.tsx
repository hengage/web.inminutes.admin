"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Pagination } from "@/components/ui/custom/Pagination";
import PopOver from "@/components/ui/custom/PopOver";
import { Icon } from "@/components/ui/Icon";
import { Refresh2 } from "iconsax-react";
import useUrlState from "@/hooks/useUrlState";
import { cn, formatDate, stringifyQuery, stringifyUrl } from "@/lib/utils";
import { Suspense, useEffect, useState } from "react";
import { CustomInput as Input } from "@/components/ui/custom/input";
import { ChevronDown, Search } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { DatePicker } from "@/components/ui/custom/date/DatePicker";
import { useQueryClient } from "@tanstack/react-query";
import { ErrandRow, useGetCustomersErrandsQuery } from "@/api/customers";
import Tag from "@/components/general/Tag";
import { tag } from "@/types";
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { useGetSingleErrandQuery } from "@/api/errand";
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

const ApplicantsTable = () => {
  const router = useRouter();
  const customerId =
    typeof window !== "undefined" ? window.location.pathname.split("/").pop() : undefined;
  const [selectedStatus, setSelectedStatus] = useState<string>("pending");

  const queryClient = useQueryClient();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>({
    status: selectedStatus,
    page: 1,
    limit: 30,
  });
  const { result: errandData } = useGetCustomersErrandsQuery(queryValues, customerId as string);

  const [selectedErrandId, setSelectedErrandId] = useState<string | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Pass the selectedErrandId to the hook
  const { data: singleErrand, isLoading: isSingleErrandLoading } = useGetSingleErrandQuery(
    selectedErrandId ?? ""
  );

  const columns: ColumnDef<ErrandRow>[] = [
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
      accessorKey: "pickupAddress",
      header: () => (
        <span className="whitespace-nowrap font-semibold text-base">Pickup Address</span>
      ),
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200">
            {row.original.pickupAddress}
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
    queryClient.invalidateQueries({ queryKey: ["customer-errand", customerId, queryValues] });
    errandData.refetch();
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
            disabled={errandData?.isRefetching}
          >
            <Refresh2
              className={cn("transition-transform", {
                "animate-spin text-ctm-primary-400": errandData?.isRefetching,
              })}
            />
          </Button>
          <Button
            onClick={() => {
              setQueryValues((prev) => {
                router.push(`/customer/${customerId}${stringifyQuery({ page: 1, limit: 30 })}#2`);
                return { page: prev.page, limit: prev.limit };
              });
              errandData?.refetch();
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
                setSelectedStatus(params ?? "");
                setQueryValues((prev) => ({ ...prev, status: params ?? "" }));
              }}
              selectedItem={selectedStatus}
              items={status}
            />
          </PopOver>
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
              className="w-fit"
              slotBefore={<Search className="text-ctm-secondary-300" />}
              placeholder="Search"
              value={queryValues.search}
              onChange={(e) => setQueryValues((prev) => ({ ...prev, search: e.target.value }))}
            />
          </div>
        </div>
        <DataTable dataQuery={errandData} columns={columns} />
        {errandData.data?.data.length && errandData?.data?.data.length > 0 ? (
          <Pagination
            total={errandData.data?.total ?? 30}
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
            <DialogTitle>Errand Details</DialogTitle>
          </DialogHeader>
          {isSingleErrandLoading ? (
            <div>Loading...</div>
          ) : singleErrand ? (
            <div className="flex flex-col gap-2">
              <div>
                <strong>Order ID:</strong> {singleErrand?._id}
              </div>
              <div>
                <strong>Type:</strong> {singleErrand?.type}
              </div>
              <div>
                <strong>Status:</strong> <Tag tag={singleErrand?.status.toLowerCase() as tag} />
              </div>
              <div>
                <strong>Package Type:</strong> {singleErrand?.packageType?.join(", ")}
              </div>
              <div>
                <strong>Description:</strong> {singleErrand?.description}
              </div>
              <div>
                <strong>Customer:</strong> {singleErrand?.customer?.fullName}
              </div>
              <div>
                <strong>Receiver:</strong> {singleErrand?.receiver?.name} (
                {singleErrand?.receiver?.phoneNumber})
              </div>
              <div>
                <strong>Pickup Address:</strong> {singleErrand?.pickupAddress}
              </div>
              <div>
                <strong>Dropoff Address:</strong> {singleErrand?.dropoffAddress}
              </div>
              <div>
                <strong>Dispatch Fee:</strong> {singleErrand?.dispatchFee}
              </div>
              <div>
                <strong>Created At:</strong> {formatDate(singleErrand?.createdAt)}
              </div>
              <div>
                <strong>Updated At:</strong> {formatDate(singleErrand?.updatedAt)}
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

const CustomerErrands = () => (
  <Suspense>
    <ApplicantsTable />
  </Suspense>
);

export default CustomerErrands;
