import React from "react";

export interface IPayoutAccount {
  channel: string;
  bankName: string;
  bankCode: string;
  accountName: string;
  accountNumber: string;
  currency: string;
  recipientType: string;
  recipientCode: string;
}

const PayoutAccountCard: React.FC<{ account: IPayoutAccount }> = ({ account }) => {
  return (
    <div className="bg-[#F7F7F7] p-4 rounded-lg">
      <p className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Channel:</span>{" "}
        <span className="font-semibold">{account.channel}</span>
      </p>
      <p className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Bank Name:</span>{" "}
        <span className="font-semibold">{account.bankName}</span>
      </p>
      <p className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Bank Code:</span>{" "}
        <span className="font-semibold">{account.bankCode}</span>
      </p>
      <p className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Account Name:</span>{" "}
        <span className="font-semibold">{account.accountName}</span>
      </p>
      <p className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Account Number:</span>{" "}
        <span className="font-semibold">{account.accountNumber}</span>
      </p>
      <p className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Currency:</span>{" "}
        <span className="font-semibold">{account.currency}</span>
      </p>
      <p className="flex justify-between items-center mb-2">
        <span className="text-gray-600">Recipient Type:</span>{" "}
        <span className="font-semibold">{account.recipientType}</span>
      </p>
      <p className="flex justify-between items-center">
        <span className="text-gray-600">Recipient Code:</span>{" "}
        <span className="font-semibold">{account.recipientCode}</span>
      </p>
    </div>
  );
};

export default PayoutAccountCard;
