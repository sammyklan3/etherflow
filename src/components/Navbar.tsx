import { Menu, ArrowRight } from "lucide-react";
import { useState } from "react";
import ConnectWallet from "./ConnectWallet";
import { Link, NavLink } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="bg-black backdrop-blur-md text-gray-300">
        <Link
          to="/recurring-payment"
          className="text-sm flex justify-center gap-2 items-center"
        >
          Recurring payments are now available
          <ArrowRight className="text-green-500" />
        </Link>
      </div>
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
              to="#features"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Features
            </NavLink>
            <NavLink
              to="#how-it-works"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              How it Works
            </NavLink>
            <NavLink
              to="/send"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Send Tokens
            </NavLink>
            <NavLink
              to="#networks"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Supported Networks
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
              to="#features"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
            >
              Features
            </NavLink>
            <NavLink
              to="#how-it-works"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
            >
              How it Works
            </NavLink>
            <NavLink
              to="#networks"
              className="block px-3 py-2 text-gray-600 hover:text-indigo-600"
            >
              Supported Networks
            </NavLink>
            <ConnectWallet />
          </div>
        </div>
      )}
    </nav>
  );
}
