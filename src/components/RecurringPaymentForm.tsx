import React, { useState, useEffect } from "react";
import { RECURRING_PAYMENTS_ADDRESS } from "../utils/constants";
import { recurringPaymentsABI } from "../utils/contractABI";
import { parseEther, BaseError, isAddress } from "viem";
import TransactionCard from "./TransactionCard";
import {
  useWriteContract,
  useWaitForTransactionReceipt,
  useAccount,
} from "wagmi";
import { Clock, Wallet } from "lucide-react";
import { useQueryClient } from "@tanstack/react-query";

interface RecurringPaymentFormProps {
  onSuccess: () => void;
}

export function RecurringPaymentForm({ onSuccess }: RecurringPaymentFormProps) {
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");
  const [error, setError] = useState<string | BaseError>("");
  const [frequency, setFrequency] = useState<"daily" | "weekly" | "monthly">(
    "weekly"
  );
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const { isConnected } = useAccount();

  const frequencies = [
    { value: "daily", label: "Daily" },
    { value: "weekly", label: "Weekly" },
    { value: "monthly", label: "Monthly" },
  ];

  // Map frequency to intervals in seconds
  const frequencyToInterval: {
    [key in "daily" | "weekly" | "monthly"]: number;
  } = {
    daily: 86400, // 1 day in seconds
    weekly: 604800, // 7 days in seconds
    monthly: 2592000, // 30 days in seconds
  };

  const {
    writeContract,
    error: contractError,
    data: hash,
  } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } = useWaitForTransactionReceipt({
    hash,
  });

  useEffect(() => {
    if (isSuccess) {
      onSuccess(); // Callback for success handling
      setIsOpen(true); // Close the TransactionCard
      queryClient.invalidateQueries({ queryKey: ["recurringPayments"] }); // Invalidate queries to refresh data
    }
  }, [isSuccess, onSuccess, queryClient]);

  // Effect for handling contract error
  useEffect(() => {
    if (contractError) {
      setError(contractError as BaseError);
    }
  }, [contractError]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!recipient || !amount) return;
    if (!isAddress(recipient)) {
      setError("Invalid recipient address");
      return;
    }
    if (parseFloat(amount) <= 0) {
      setError("Amount must be greater than zero");
      return;
    }

    try {
      writeContract({
        abi: recurringPaymentsABI, // Add your contract ABI here
        address: RECURRING_PAYMENTS_ADDRESS, // Add your contract address here
        functionName: "createSubscription",
        args: [
          recipient,
          parseEther(amount),
          BigInt(frequencyToInterval[frequency]),
        ],
      });
    } catch (error) {
      console.error("Error creating recurring payment:", error);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      queryClient.invalidateQueries({ queryKey: ["recurringPayments"] });
      onSuccess();
    }
  }, [isSuccess, onSuccess, queryClient]);

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white p-6 rounded-lg shadow-md"
    >
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        Create Recurring Payment
      </h2>

      <div className="space-y-4">
        <div>
          <label
            htmlFor="recipient"
            className="block text-sm font-medium text-gray-700"
          >
            Recipient Address
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Wallet className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              id="recipient"
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0x..."
              aria-label="Recipient Address"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="amount"
            className="block text-sm font-medium text-gray-700"
          >
            Amount (ETH)
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <input
              type="number"
              id="amount"
              step="0.0001"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="block w-full pl-3 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
              placeholder="0.0"
              aria-label="Amount"
            />
          </div>
        </div>

        <div>
          <label
            htmlFor="frequency"
            className="block text-sm font-medium text-gray-700"
          >
            Payment Frequency
          </label>
          <div className="mt-1 relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Clock className="h-5 w-5 text-gray-400" />
            </div>
            <select
              id="frequency"
              value={frequency}
              aria-label="Payment Frequency"
              onChange={(e) => setFrequency(e.target.value as "daily" | "weekly" | "monthly")}
              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md focus:ring-indigo-500 focus:border-indigo-500"
            >
              {frequencies.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="text-red-500">
          Error:{" "}
          {typeof error === "string"
            ? error
            : error.shortMessage || error.message || "Unknown error"}
        </div>
      )}

      <button
        type="submit"
        disabled={isConfirming || !isConnected || !recipient || !amount}
        className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${isConnected ? "bg-indigo-600 hover:bg-indigo-700" : "bg-indigo-400"} focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50`}
      >
        {isConfirming ? (
          <span className="flex">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8z"
              ></path>
            </svg>
            Confirming...
          </span>
        ) : !isConnected ? (
          "Connect Wallet"
        ) : (
          "Create Recurring Payment"
        )}
      </button>
      {isSuccess && (
        <TransactionCard isOpen={isOpen} setIsOpen={setIsOpen} hash={hash} />
      )}
    </form>
  );
}
