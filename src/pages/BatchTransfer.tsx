import { useState } from "react";
import { BatchTransferForm } from "../components/BatchTransfer/BatchTansferForm";
import ConnectWallet from "../components/ConnectWallet";
import { Menu } from "lucide-react";
import { NavLink } from "react-router-dom";

function BatchTransfer() {
  const [isOpen, setIsOpen] = useState(false);

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
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
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

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <BatchTransferForm />
      </main>
    </div>
  );
}

export default BatchTransfer;
