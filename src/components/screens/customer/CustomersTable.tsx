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
import RadioItems from "@/components/ui/custom/radio/RadioItems";
import { CustomInput as Input } from "@/components/ui/custom/input";
import {  Search } from "lucide-react";
import DataTable from "@/components/ui/data-table";
import { ColumnDef } from "@tanstack/react-table";
import { ICustomer, useDeleteCustomerMutation, useGetCustomersQuery } from "@/api/customers";
import { useToast } from "@/providers/ToastContext";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import DateRangePicker from "@/components/ui/custom/Daterange";
const status = [
  { label: "Active", value: "active" },
  { label: "In Active", value: "inactive" },
  { label: "Suspended", value: "suspended" },
];


// Custom useDebounce hook
const useDebounce = (value: string, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
};
const CustomersTable = () => {
  const router = useRouter();
  const [queryValues, setQueryValues] = useState<{ [name: string]: string | string[] | number }>(
    {}
  );
  const [deleteId, setDeleteId] = useState<string | null>(null); // For popup
  const { showError, showSuccess } = useToast();

  const [isDialogOpen, setIsDialogOpen] = useState(false); // For popup
  const { mutateAsync: deleteCustomer, isPending: isDeleting } = useDeleteCustomerMutation(
    deleteId ?? ""
  );
  const { result } = useGetCustomersQuery(queryValues);
  const columns: ColumnDef<Pick<ICustomer, "_id" | "email" | "phoneNumber" | "fullName">>[] = [
    {
      accessorKey: "index",
      header: () => <span className="whitespace-nowrap font-semibold text-base">S/N</span>,
      cell: ({ row }) => <span>{row.index + 1}</span>,
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
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200">{row.original.email}</span>
        );
      },
    },

    {
      accessorKey: "fullName",
      header: () => (
        <span className="whitespace-nowrap font-semibold text-base">Customer Name</span>
      ),
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200 capitalize">
            {row.original.fullName}
          </span>
        );
      },
    },
    {
      accessorKey: "phoneNumber",
      header: () => (
        <span className="whitespace-nowrap font-semibold text-base">Customer PhoneNumber</span>
      ),
      cell: ({ row }) => {
        return (
          <span className="font-normal text-base text-ctm-secondary-200 capitalize">
            {row?.original?.phoneNumber}
          </span>
        );
      },
    },
    {
      accessorKey: "actions",
      header: () => <span className="whitespace-nowrap font-semibold text-base">Actions</span>,
      cell: ({ row }) => (
        <PopOver className="max-w-[110px]">
          <div className="flex flex-col justify-center items-center">
            <Button
              onClick={() => router.push(`/customer/${row.original._id}`)}
              className="w-[100px] justify-start"
              variant={"ghost"}
            >
              <Icon width={15} height={15} name="eye" />
              View
            </Button>

            <Button
              className="w-[100px] justify-start"
              variant={"ghost"}
              onClick={() => {
                setDeleteId(row.original._id);
                setIsDialogOpen(true);
              }}
            >
              <Icon width={20} height={20} name="trash" />
              Delete
            </Button>
          </div>
        </PopOver>
      ),
    },
  ];

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await deleteCustomer({ _id: deleteId } as ICustomer);
      showSuccess("Customer deleted successfully");
      setIsDialogOpen(false);
      setDeleteId(null);
      result.refetch();
    } catch (error) {
      const errorMessage =
        typeof error === "object" && error !== null && "message" in error
          ? (error as { message?: string }).message
          : "Failed to delete customer";
      showError(errorMessage || "Failed to delete customer");
      setIsDialogOpen(false);
    }
  };

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


  
  const handleStatusChange = (status: string | null) => {
    const updatedQuery = { ...queryValues, status: status || "active", page: 1 }; // Reset to page 1
    setQueryValues(updatedQuery);
    router.push(stringifyUrl(updatedQuery));
    result.refetch(); // Explicitly refetch
  };

  const debouncedSearch = useDebounce(queryValues.search as string, 500);
  useEffect(() => {
    if (debouncedSearch !== queryValues.search) {
      const updatedQuery = { ...queryValues, search: debouncedSearch, page: 1 };
      setQueryValues(updatedQuery);
      router.push(stringifyUrl(updatedQuery));
      result.refetch();
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearch, queryValues.search, result]);

  const handleDateRangeChange = (fromDate: Date | null, toDate: Date | null) => {
    type QueryType = typeof queryValues & { fromDate?: string; toDate?: string };
    const updatedQuery: QueryType = { ...queryValues, page: 1 }; // Reset to page 1

    if (fromDate) {
      updatedQuery.fromDate = fromDate.toISOString();
    } else {
      delete updatedQuery.fromDate;
    }

    if (toDate) {
      updatedQuery.toDate = toDate.toISOString();
    } else {
      delete updatedQuery.toDate;
    }

    if (!fromDate && !toDate) {
      delete updatedQuery.fromDate;
      delete updatedQuery.toDate;
    }

    setQueryValues(updatedQuery);
    router.push(stringifyUrl(updatedQuery));
    result.refetch(); // Trigger refetch after updating date range
  };

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
                router.push(`customer/${stringifyQuery({ page: 1, limit: 10 })}#0`);
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
                Status
                <Icon name="arrow-down" height={16} width={16} />
              </Button>
            }
            className="bg-ctm-background border border-ctm-primary-500 rounded-[16px] p-1"
          >
            <RadioItems
              onSubmit={handleStatusChange}
              selectedItem={(queryValues.status as string) ?? ""}
              items={status}
            />
          </PopOver>
          <DateRangePicker
            fromDate={queryValues.fromDate ? new Date(queryValues.fromDate as string) : undefined}
            toDate={queryValues.toDate ? new Date(queryValues.toDate as string) : undefined}
            // onApply={(fromDate, toDate) => {
            //   setQueryValues((prev) => {
            //     const newValues = { ...prev };

            //     if (fromDate) {
            //       newValues.fromDate = fromDate.toISOString();
            //     } else {
            //       delete newValues.fromDate;
            //     }

            //     if (toDate) {
            //       newValues.toDate = toDate.toISOString();
            //     } else {
            //       delete newValues.toDate;
            //     }
            //     if (!fromDate && !toDate) {
            //       delete newValues.fromDate;
            //       delete newValues.toDate;
            //     }

            //     return newValues;
            //   });
            // }}
            onApply={handleDateRangeChange}
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
        <DataTable dataQuery={result} columns={columns} />
        {result.data?.data.length && result.data?.data.length > 0 ? (
          <Pagination
            total={result.data?.total ?? 10}
            page={Number(queryValues.page)}
            limit={Number(queryValues.limit)}
          />
        ) : null}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Delete Customer</DialogTitle>
            </DialogHeader>
            <div>Are you sure you want to delete this customer?</div>
            <DialogFooter>
              <Button
                variant="secondary"
                onClick={() => setIsDialogOpen(false)}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

const Customers = () => (
  <Suspense>
    <CustomersTable />
  </Suspense>
);

export default Customers;

