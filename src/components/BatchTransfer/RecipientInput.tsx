import React from "react";
import { Trash2 } from "lucide-react";

interface RecipientInputProps {
  index: number;
  address: string;
  amount: string;
  onChange: (index: number, field: "address" | "amount", value: string) => void;
  onRemove: (index: number) => void;
}

export const RecipientInput: React.FC<RecipientInputProps> = ({
  index,
  address,
  amount,
  onChange,
  onRemove,
}) => {
  return (
    <div className="flex gap-4 items-center mb-4">
      <input
        type="text"
        placeholder="Recipient Address (0x...)"
        value={address}
        onChange={(e) => onChange(index, "address", e.target.value)}
        className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <input
        type="text"
        placeholder="Amount"
        value={amount}
        onChange={(e) => onChange(index, "amount", e.target.value)}
        className="w-32 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
      />
      <button
        onClick={() => onRemove(index)}
        className="p-2 text-red-500 hover:text-red-700"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};
