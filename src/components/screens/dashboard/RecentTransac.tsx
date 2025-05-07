"use client";

import Tag from "@/components/general/Tag";
import { tag } from "@/types";
import Link from "next/link";

export default function RecentTransactions({ data, loading }) {
  const formatTransactionForDisplay = (transaction) => {
    const date = new Date(transaction.createdAt);
    const formattedDate = date.toLocaleDateString("en-GB");
    const formattedTime = date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });

    return {
      id: transaction.reference || `#${transaction._id?.substring(0, 8)}`,
      type: transaction.reason,
      date: formattedDate,
      time: formattedTime,
      amount: transaction.amount,
      status: transaction.status?.toLowerCase(),
    };
  };

  const hasTransactions = data && data.length > 0;

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Recent Transactions</h3>
        <Link
          href="/transaction"
          className="text-sm text-ctm-primary-500 hover:text-ctm-primary-500"
        >
          See all
        </Link>
      </div>

      {loading ? (
        <p className="text-sm text-gray-500">Loading transactions...</p>
      ) : hasTransactions ? (
        <div className="space-y-1">
          <div className="grid grid-cols-3 gap-4 py-2 border-b border-gray-200 font-medium text-gray-600 text-sm">
            <div>Transaction</div>
            <div>Type</div>
            <div>Amount</div>
          </div>

          {/* Transaction Items */}
          {data.map((transaction, index) => {
            const formattedTransaction = formatTransactionForDisplay(transaction);
            return (
              <div
                key={index}
                className="grid grid-cols-3 gap-4 py-3 border-b border-gray-100 last:border-b-0"
              >
                <div>
                  <p className="font-medium text-gray-800">{formattedTransaction.type}</p>
                  <p className="text-xs text-gray-500">{formattedTransaction.id}</p>
                </div>
                <div>
                  <p className="font-medium">Credit</p>
                  <p className="text-xs text-gray-500">
                    {formattedTransaction.date} {formattedTransaction.time}
                  </p>
                </div>
                <div>
                  <p
                    className={`font-medium ${
                      formattedTransaction.isCredit ? "text-green-600" : "text-red-600"
                    }`}
                  >
                    ₦{formattedTransaction.amount}
                  </p>
                  <Tag tag={formattedTransaction.status as tag} />
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        <p>No transaction</p>
      )}
    </div>
  );
}
