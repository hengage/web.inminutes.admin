import Tag from "@/components/general/Tag";
import Link from "next/link";

const recentTransactionsData = [
  {
    id: "#43678THTS",
    type: "Refund",
    date: "15/04/2021",
    time: "08:15 am",
    amount: "+₦10,000",
    status: "pending",
  },
  {
    id: "#43678DBMFP",
    type: "Cash out",
    date: "20/04/2022",
    time: "10:20 pm",
    amount: "+₦10,000",
    status: "successful",
  },
  //   {
  //     id: "#43678THTS",
  //     type: "Disbursement",
  //     date: "16/03/2023",
  //     time: "09:23 am",
  //     amount: "-₦10,000",
  //     status: "rejected",
  //   },
  {
    id: "#43678THTS",
    type: "Refund",
    date: "15/06/2024",
    time: "02:28 am",
    amount: "+₦10,000",
    status: "abandoned",
  },
];

export default function RecentTransactions({ data = recentTransactionsData }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-bold text-gray-800">Recent Transactions</h3>
        <Link
          href="/transaction "
          className="text-sm text-ctm-primary-500 hover:text-ctm-primary-500"
        >
          See all
        </Link>
      </div>
      <div className="space-y-1">
        {data.map((transaction, index) => (
          <div
            key={index}
            className=" flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0"
          >
            <div>
              <p className="font-medium text-gray-800">{transaction.type}</p>
              <p className="text-xs text-gray-500">{transaction.id}</p>
            </div>
            <div className="">
              <p className="font-medium">Credit</p>
              <p className="text-xs text-gray-500">
                {transaction.date} {transaction.time}
              </p>
            </div>
            <div className="">
              <p
                className={`font-medium ${transaction.amount.includes("+") ? "text-green-600" : "text-red-600"}`}
              >
                {transaction.amount}
              </p>
              <Tag tag={transaction.status.toLowerCase()} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
