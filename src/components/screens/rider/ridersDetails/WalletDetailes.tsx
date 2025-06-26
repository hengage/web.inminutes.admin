/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useParams, useRouter } from "next/navigation";
import { Suspense } from "react";
import { useGetRiderWalletQuery } from "@/api/rider";
import PayoutAccountCard, { IPayoutAccount } from "./PayoutAccountCard";

const WalletTable = () => {
  const router = useRouter();
  const { riderId } = useParams<{ riderId?: string }>();

  const { data: singleRider, isLoading, isError } = useGetRiderWalletQuery(riderId || "");

  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error loading wallet data</div>;

  return (
    <div className="my-4">
      {/* Wallet Section */}
      <div className="bg-white rounded-lg p-4 shadow-md mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <span className="text-gray-600">Wallet ID:</span>{" "}
            <span className="font-semibold">{singleRider?.merchantId}</span>
          </div>
          <div className="flex items-center">
            <span className="inline-flex capitalize items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-indigo-100 text-[#3F2BC3]">
              <svg className="w-2 h-2 text-[#3F2BC3] mr-1" fill="currentColor" viewBox="0 0 8 8">
                <circle cx="4" cy="4" r="4" />
              </svg>
              {singleRider?.status}
            </span>

            <span className="text-gray-600">Currency: {singleRider?.currency}</span>
          </div>
        </div>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-500 text-sm">TOTAL EARNINGS</p>
            <p className="text-indigo-900 font-bold text-2xl">
              ₦{singleRider?.totalEarnings?.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-500 text-sm">CURRENT BALANCE</p>
            <p className="text-indigo-900 font-bold text-2xl">
              ₦{singleRider?.balance?.toLocaleString()}
            </p>
          </div>
          <div className="bg-gray-100 p-4 rounded-lg text-center">
            <p className="text-gray-500 text-sm">TOTAL NO. OF TRANSACTION</p>
            <p className="text-indigo-900 font-bold text-2xl">{singleRider?.transactionCount}</p>
          </div>
        </div>
      </div>

      {/* Payout Accounts Section */}
      <div className="bg-white rounded-lg p-4 shadow-md mb-6">
        <h3 className="text-lg font-bold text-[#160A62] mb-4">Payout Accounts</h3>
        <div className="grid grid-cols-2 gap-4">
          {singleRider?.cashoutAccounts?.map((account: IPayoutAccount, index: number) => (
            <PayoutAccountCard key={index} account={account} />
          ))}
        </div>
      </div>
    </div>
  );
};

const RiderWallet = () => (
  <Suspense>
    <WalletTable />
  </Suspense>
);

export default RiderWallet;
