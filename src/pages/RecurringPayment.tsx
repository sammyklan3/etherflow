import { useState } from "react";
import RecurringPaymentsList from "../components/RecurringPaymentsList";
import { RecurringPaymentForm } from "../components/RecurringPaymentForm";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import ConnectWallet from "../components/ConnectWallet";

function RecurringPayment() {
  const [isOpen, setIsOpen] = useState(false);

  document.title = "Recurring Payments | Etherflow";

  return (
    <div className="min-h-screen bg-gray-100">
      <nav className="w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100 mb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <NavLink to="/" className="flex items-center space-x-2">
              <img
                src="/etherflow-transparent.png"
                alt="Logo"
                className="h-9 w-100"
              />
            </NavLink>
            <div className="hidden md:flex items-center space-x-8">
              <NavLink
                to="/send"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Send Tokens
              </NavLink>
              <NavLink
                to="/batch-transfer"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Batch Transfer
              </NavLink>
              <NavLink
                to="/contract-tester"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Test smart contracts
              </NavLink>
              <NavLink
                to="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Faucet
              </NavLink>
            </div>
            <ConnectWallet />
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="text-gray-600"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>

        {isOpen && (
          <div className="md:hidden">
            <div className="flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
              <NavLink
                to="/send"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Send Tokens
              </NavLink>
              <NavLink
                to="#"
                className="text-gray-600 hover:text-indigo-600 transition-colors"
              >
                Faucet
              </NavLink>
            </div>
          </div>
        )}
      </nav>
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <RecurringPaymentForm onSuccess={() => {}} />
          </div>
          <div>
            <RecurringPaymentsList />
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecurringPayment;
