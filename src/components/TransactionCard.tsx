import { Link } from "react-router-dom";
import { BadgeCheck } from "lucide-react";

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
  return (
    <div
      className={`${
        isOpen ? "flex-col" : "hidden"
      } bg-gradient-to-br from-gray-900 to-gray-800 p-4 rounded-lg shadow-lg absolute z-50`}
    >
      {/* Show successful icon */}
      <BadgeCheck className="inline-block h-[300px] w-[300px] text-green-500" />

      {/* Show link to transaction on the block scan */}
      <div className="flex w-full justify-between mt-4">
        <button
          onClick={() => setIsOpen(false)}
          className="bg-gray-300 px-5 rounded-lg text-black"
        >
          Close
        </button>
        <Link
          to={`https://sepolia.etherscan.io/tx/${hash}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-red-600 p-2 text-center rounded-lg text-gray-100"
        >
          View the transaction
        </Link>
      </div>
    </div>
  );
};

export default TransactionCard;
