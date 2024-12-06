import React, { useState, useEffect } from "react";
import {
  type BaseError,
  useAccount,
  useBalance,
  useWriteContract,
  useWaitForTransactionReceipt,
} from "wagmi";
import { parseEther, isAddress } from "viem";
import { Plus } from "lucide-react";
import { RecipientInput } from "./RecipientInput";
import { batchTransferABI } from "../../utils/contractABI";
import { CONTRACT_ADDRESS } from "../../utils/constants";

interface Recipient {
  address: string;
  amount: string;
}

export const BatchTransferForm: React.FC = () => {
  const { address } = useAccount();
  const [recipients, setRecipients] = useState<Recipient[]>([
    { address: "", amount: "" },
  ]);
  const [errorMessage, setErrorMessage] = useState<BaseError | string | null>(
    null
  );

  const { data: balance } = useBalance({
    address,
  });

  const {
    writeContract,
    isPending: isLoading,
    error: contractError,
    data: hash,
  } = useWriteContract();

  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({
      hash,
    });

  // Effect for handling contract error
  useEffect(() => {
    if (contractError) {
      setErrorMessage(contractError as BaseError);
    }
  }, [contractError]);

  const handleAddRecipient = () => {
    setRecipients([...recipients, { address: "", amount: "" }]);
  };

  const handleRemoveRecipient = (index: number) => {
    setRecipients(recipients.filter((_, i) => i !== index));
  };

  const handleChange = (
    index: number,
    field: keyof Recipient,
    value: string
  ) => {
    const newRecipients = [...recipients];
    newRecipients[index][field] = value;
    setRecipients(newRecipients);
  };

  const validateInput = (): string | null => {
    for (let i = 0; i < recipients.length; i++) {
      const recipient = recipients[i];
      if (!recipient.address || !isAddress(recipient.address)) {
        setErrorMessage(`Recipient ${i + 1}: Invalid address.`);
        return null;
      }
      if (
        isNaN(Number(recipient.amount)) ||
        parseFloat(recipient.amount) <= 0
      ) {
        setErrorMessage(`Recipient ${i + 1}: Invalid amount.`);
        return null;
      }
    }
    setErrorMessage(null);
    return null;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const validationError = validateInput();
    if (validationError) {
      setErrorMessage(validationError);
      return;
    }

    const addresses = recipients.map((r) => r.address);
    const amounts = recipients.map((r) => parseEther(r.amount));
    const tokenAddress = CONTRACT_ADDRESS;

    try {
      await writeContract({
        address: CONTRACT_ADDRESS,
        abi: batchTransferABI,
        functionName: "batchTransfer",
        args: [tokenAddress, addresses, amounts],
      });
    } catch (error) {
      setErrorMessage("Transaction failed. Please try again.");
      console.error("Transaction failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto p-6">
      <div className="mb-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Batch Transfer</h2>
          <div className="text-sm text-gray-600">
            Balance: {balance?.formatted} {balance?.symbol}
          </div>
        </div>

        {recipients.map((recipient, index) => (
          <RecipientInput
            key={index}
            index={index}
            address={recipient.address}
            amount={recipient.amount}
            onChange={handleChange}
            onRemove={handleRemoveRecipient}
          />
        ))}

        {errorMessage && (
          <div className="text-red-500 text-sm mt-2">
            {errorMessage.shortMessage || errorMessage.message}
          </div>
        )}
      </div>

      <div className="flex gap-4">
        <button
          type="button"
          onClick={handleAddRecipient}
          className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg"
        >
          <Plus size={20} />
          Add Recipient
        </button>

        <button
          type="submit"
          disabled={isLoading || isConfirming}
          className={`px-6 py-2 text-white rounded-lg ${!isLoading || !isConfirming ? "hover: bg-blue-600" : null} ${isLoading || isConfirming ? "bg-blue-300" : isConfirmed ? "bg-green-500" : "bg-blue-500"} disabled:bg-gray-400`}
        >
          {isLoading
            ? "Processing..."
            : isConfirming
              ? "Awaiting for confirmation..."
              : isConfirmed
                ? "Confirmed"
                : "Send"}
        </button>
      </div>
    </form>
  );
};
