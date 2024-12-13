import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Calendar, RefreshCw } from "lucide-react";

interface Payment {
  id: string;
  recipient: string;
  amount: string;
  frequency: string;
  nextPayment: Date;
  status: "active" | "paused";
}

function RecurringPaymentsList() {
  const { data: payments, isLoading } = useQuery({
    queryKey: ["recurringPayments"],
    queryFn: async () => {
      // Replace with your actual API call
      return [] as Payment[];
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <RefreshCw className="h-8 w-8 text-gray-400 animate-spin" />
      </div>
    );
  }

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <div className="px-4 py-5 sm:px-6">
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Active Recurring Payments
        </h3>
      </div>
      <ul className="divide-y divide-gray-200">
        {payments?.map((payment) => (
          <li key={payment.id} className="px-4 py-4 sm:px-6">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">
                  To: {payment.recipient}
                </p>
                <p className="text-sm text-gray-500">
                  Amount: {payment.amount} ETH
                </p>
                <div className="mt-2 flex items-center text-sm text-gray-500">
                  <Calendar className="flex-shrink-0 mr-1.5 h-4 w-4 text-gray-400" />
                  <p>
                    Next payment:{" "}
                    {formatDistanceToNow(payment.nextPayment, {
                      addSuffix: true,
                    })}
                  </p>
                </div>
              </div>
              <div className="ml-4 flex-shrink-0">
                <span
                  className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    payment.status === "active"
                      ? "bg-green-100 text-green-800"
                      : "bg-yellow-100 text-yellow-800"
                  }`}
                >
                  {payment.status}
                </span>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RecurringPaymentsList;
