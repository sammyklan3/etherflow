import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";
import { usePublicClient } from "wagmi";

interface TransactionCardProps {
  hash: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TransactionCard: React.FC<TransactionCardProps> = ({
  hash,
  isOpen,
  setIsOpen,
}) => {
  const publicClient = usePublicClient();

  // Map chain IDs to their respective block explorer URLs
  const blockExplorerLinks: { [key: number]: string } = {
    11155111: "https://sepolia.etherscan.io/tx/", // Sepolia
    1: "https://etherscan.io/tx/", // Ethereum Mainnet
    8453: "https://base.blockscout.com/tx/", // Base Mainnet
    84532: "https://base-sepolia.blockscout.com/tx/", // Base Sepolia
  };

  // Get the chain ID from the public client
  const chainId = publicClient?.chain?.id;
  const blockExplorerUrl = chainId ? blockExplorerLinks[chainId] : undefined;

  return (
    <div
      className={`${
        isOpen ? "flex flex-col" : "hidden"
      } fixed inset-0 flex items-center justify-center bg-gray-300 p-4 rounded-lg shadow-lg z-50 w-[30%] m-auto h-min`}
    >
      {/* Success Icon */}
      <BadgeCheck className="inline-block h-[300px] w-[300px] text-green-500" />

      {/* Transaction Details */}
      <div className="flex w-full justify-between mt-4 bg-white p-4 rounded-lg shadow-md">
        <button
          onClick={() => setIsOpen(false)}
          className="bg-gray-300 px-5 rounded-lg text-black"
        >
          Close
        </button>
        {blockExplorerUrl ? (
          <Link
            to={`${blockExplorerUrl}${hash}`}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-red-600 p-2 text-center rounded-lg text-gray-100"
          >
            View the transaction
          </Link>
        ) : (
          <span className="text-gray-400 text-sm">
            Block explorer not available for this chain
          </span>
        )}
      </div>
    </div>
  );
};

export default TransactionCard;