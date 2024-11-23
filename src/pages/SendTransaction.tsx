import { useState, useEffect } from "react";
import {
  type BaseError,
  useAccount,
  useSendTransaction,
  useWaitForTransactionReceipt,
} from "wagmi";
import { Toaster, toast } from "react-hot-toast";
import { Send, Loader2 } from "lucide-react";
import { parseEther } from "viem";
import ConnectWallet from "../components/ConnectWallet";
import TransactionCard from "../components/TransactionCard";

interface FormData {
  address: string;
  amount: string;
}

function SendTransaction() {
  document.title = "Etherflow - Send";
  // Form data state
  const [formData, setFormData] = useState<FormData>({
    address: "",
    amount: "",
  });
  const [isOpen, setIsOpen] = useState(false);

  // Wagmi hooks
  const {
    sendTransaction,
    isPending,
    data: hash,
    error,
  } = useSendTransaction();
  const { isLoading: isConfirming, isSuccess: isConfirmed } =
    useWaitForTransactionReceipt({ hash });

  // Handle transaction confirmation and toast notification
  useEffect(() => {
    if (isConfirmed && hash) {
      toast.success(`Transaction sent! Hash: ${hash}`);
      setIsOpen(true); // Open the transaction card when the transaction is confirmed
    }
  }, [isConfirmed, hash]);

  if (error) {
    toast.error(
      `Failed to send transaction: ${(error as BaseError).shortMessage || error.message}`
    );
  }

  const { isConnected } = useAccount();

  // Form submission handler
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { address, amount } = formData;

    // Validation
    if (!address || !amount) {
      toast.error("Please fill in all fields.");
      return;
    }

    try {
      sendTransaction({
        to: address,
        value: parseEther(amount),
      });
    } catch (error: any) {
      toast.error(`Failed to send transaction: ${error.message}`);
    }
  };

  // Form input handler
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 text-white flex items-center justify-center p-4">
      <div className="max-w-md w-full">
        <div className="bg-gray-800/50 backdrop-blur-xl rounded-2xl p-8 shadow-xl border border-gray-700">
          <div className="flex items-center justify-between mb-8">
            <h1 className="text-2xl font-bold">Send ETH</h1>
            <ConnectWallet />
          </div>

          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="address"
              >
                Recipient Address
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="0x..."
                className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-2"
                htmlFor="amount"
              >
                Amount (ETH)
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                value={formData.amount}
                onChange={handleInputChange}
                placeholder="0.0"
                step="0.0001"
                min="0"
                className="w-full px-4 py-3 bg-gray-700/50 rounded-lg border border-gray-600 focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-colors"
              />
            </div>

            <button
              type="submit"
              disabled={
                !isConnected ||
                isPending ||
                !formData.address ||
                !formData.amount ||
                isConfirmed
              }
              className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-600 disabled:cursor-not-allowed rounded-lg font-medium transition-colors flex items-center justify-center gap-2"
            >
              {isPending ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Sending...
                </>
              ) : isConfirming ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Confirming...
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Send ETH
                </>
              )}
            </button>
          </form>
        </div>
      </div>
      <Toaster position="top-right" />

      {isConfirmed && hash && (
        <TransactionCard
          hash={hash || ""}
          isOpen={isOpen}
          setIsOpen={setIsOpen}
        />
      )}
    </div>
  );
}

export default SendTransaction;