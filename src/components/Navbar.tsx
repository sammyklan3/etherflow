import { Menu } from 'lucide-react';
import { useState } from 'react';
import ConnectWallet from './ConnectWallet';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed w-full bg-white/80 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
            <img src="assets/etherflow-transparent.png" alt="Logo" className="h-9 w-100" />
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-600 hover:text-indigo-600 transition-colors">Features</a>
            <a href="#how-it-works" className="text-gray-600 hover:text-indigo-600 transition-colors">How it Works</a>
            <a href="#networks" className="text-gray-600 hover:text-indigo-600 transition-colors">Supported Networks</a>
          </div>
            <ConnectWallet />
          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-gray-600">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
            <a href="#features" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Features</a>
            <a href="#how-it-works" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">How it Works</a>
            <a href="#networks" className="block px-3 py-2 text-gray-600 hover:text-indigo-600">Supported Networks</a>
            <ConnectWallet />
          </div>
        </div>
      )}
    </nav>
  );
}