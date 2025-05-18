"use client";
import React from "react";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { useGetTransactionByIdQuery } from "@/api/transaction";
import Tag from "@/components/general/Tag";
import { tag } from "@/types";
import { Icon } from "@/components/ui/Icon";
import { ArrowLeft } from "lucide-react";
import { DialogClose } from "@/components/ui/dialog";

interface TransactionDetailsProps {
  transaction: string;
  children: React.ReactNode;
}

const TransactionDetails = ({ transaction, children }: TransactionDetailsProps) => {
  const { data: transactionData, isLoading } = useGetTransactionByIdQuery(transaction);

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-NG", {
      year: "numeric",
      month: "short",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>{children}</SheetTrigger>
      <SheetContent
        side="right"
        className="w-full max-w-[600px] sm:max-w-[35vw] overflow-y-auto [&>button]:hidden"
      >
        <SheetHeader className="border-b border-gray-200 pb-4">
          <div className="flex items-center gap-6">
            <DialogClose asChild>
              <div className="p-3">
                <ArrowLeft className="bg-purple-100 text-purple-800 " size={35} />
              </div>
            </DialogClose>

            <SheetTitle className="text-lg font-semibold">Transaction Details</SheetTitle>
          </div>
        </SheetHeader>

        {isLoading ? (
          <div className="flex items-center justify-center h-64">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        ) : transactionData ? (
          <div className="py-4 overflow-y-auto">
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <h3 className="text-sm text-gray-500 mb-1">ID: #{transactionData.reference}</h3>
                <Tag tag={transactionData.status.toLowerCase() as tag} />
              </div>
              <span
                className="border border-red-500  rounded-md
               px-1"
              >
                <Icon width={15} height={15} name="trash" />
              </span>
            </div>

            {/* Transaction Reason */}
            <div className="mb-4 border rounded-lg p-4 bg-gray-50 flex items-center justify-between">
              <h3 className="text-sm text-gray-500 mb-1">Transaction Reason</h3>
              <p className="font-medium capitalize">{transactionData.reason}</p>
            </div>

            {/* Details */}
            <div className="mb-4 border rounded-lg p-4 bg-gray-50">
              {[
                ["Order ID", transactionData._id],
                ["Merchant Code", `MCH_${transactionData.reference.slice(0, 8)}`],
                ["Transfer Code", transactionData.transferCode],
                ["Amount", `₦${transactionData.amount}`],
                ["Processing Fee", `₦${transactionData.transactionFee}`],
                ["Status", transactionData.status],
                ["Bank Name", transactionData.bankName],
                ["Account Name", transactionData.accountName],
                ["Account Number", transactionData.accountNumber],
                ["Currency", transactionData.currency],
              ].map(([label, value]) => (
                <div key={String(label)} className="flex justify-between items-center mb-3">
                  <h3 className="text-sm text-gray-500">{label}</h3>
                  <p className="font-medium capitalize">{value}</p>
                </div>
              ))}
            </div>

            {/* Date & Time */}
            <div className="mb-6 border rounded-lg p-4 bg-gray-50">
              <div className="flex justify-between items-center mb-3">
                <h3 className="text-sm text-gray-500">Date</h3>
                <p className="font-medium">{formatDate(transactionData.createdAt).split(",")[0]}</p>
              </div>
              <div className="flex justify-between items-center">
                <h3 className="text-sm text-gray-500">Time</h3>
                <p className="font-medium">
                  {formatDate(transactionData.createdAt).split(",")[1].trim()}
                </p>
              </div>
            </div>
            {/* 
            <Button className="w-full" variant="destructive">
              Delete
            </Button> */}
          </div>
        ) : (
          <div className="p-6 text-center text-gray-500">Transaction not found</div>
        )}
      </SheetContent>
    </Sheet>
  );
};

export default TransactionDetails;
