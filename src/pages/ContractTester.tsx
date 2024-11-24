import React, { useState } from "react";
import { useAccount, useWriteContract, useReadContract } from "wagmi";
import { Code2, PlayCircle, AlertCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Menu } from "lucide-react";
import ConnectWallet from "../components/ConnectWallet";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
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
            {/* Links go here */}
            <NavLink
              to="/send"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
                Send Tokens
            </NavLink>
            {/* TODO: Create this page */}
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
            {/* Links go here */}
            <NavLink
              to="/send"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
                Send Tokens
            </NavLink>
            {/* TODO: Create this page */}
            <NavLink
              to="#"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
                Faucet
            </NavLink>
            <ConnectWallet />
          </div>
        </div>
      )}
    </nav>
  );
}

function ContractTester() {
  const { address } = useAccount();
  const [contractAddress, setContractAddress] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [functionArgs, setFunctionArgs] = useState("");
  const [abi, setAbi] = useState("");
  const [isRead, setIsRead] = useState(true);

  const {
    writeContract,
    isError: writeError,
    isPending: writeLoading,
  } = useWriteContract();
  const {
    data: readResult,
    isError: readError,
    isLoading: readLoading,
  } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: abi ? JSON.parse(abi) : [],
    functionName,
    args: functionArgs ? JSON.parse(functionArgs) : [],
    enabled: isRead && !!contractAddress && !!functionName && !!abi,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isRead) {
      try {
        writeContract({
          address: contractAddress as `0x${string}`,
          abi: JSON.parse(abi),
          functionName,
          args: functionArgs ? JSON.parse(functionArgs) : [],
        });
      } catch (error) {
        console.error("Error executing contract:", error);
      }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-purple-50">
      <Navbar />
      <main className="max-w-7xl mx-auto flex flex-col items-center justify-center">
        <div className="w-full max-w-4xl p-6 bg-white rounded-xl shadow-xl">
          <div className="flex items-center gap-3 mb-8">
            <Code2 className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">
              Smart Contract Tester
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Contract Address
                </label>
                <input
                  type="text"
                  value={contractAddress}
                  onChange={(e) => setContractAddress(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="0x..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Function Name
                </label>
                <input
                  type="text"
                  value={functionName}
                  onChange={(e) => setFunctionName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                  placeholder="transfer"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contract ABI
              </label>
              <textarea
                value={abi}
                onChange={(e) => setAbi(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 h-32"
                placeholder="[{...}]"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Function Arguments (JSON array)
              </label>
              <input
                type="text"
                value={functionArgs}
                onChange={(e) => setFunctionArgs(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                placeholder='["0x...", "100"]'
              />
            </div>

            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={isRead}
                  onChange={() => setIsRead(true)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Read</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={!isRead}
                  onChange={() => setIsRead(false)}
                  className="text-indigo-600 focus:ring-indigo-500"
                />
                <span className="text-sm font-medium text-gray-700">Write</span>
              </label>
            </div>

            {!address && (
              <div className="flex items-center gap-2 text-amber-600 bg-amber-50 p-4 rounded-lg">
                <AlertCircle className="w-5 h-5" />
                <p className="text-sm">
                  Please connect your wallet to interact with contracts
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={!address || writeLoading || readLoading}
              className="flex items-center justify-center gap-2 w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <PlayCircle className="w-5 h-5" />
              {writeLoading || readLoading
                ? "Processing..."
                : "Execute Contract"}
            </button>
          </form>

          {(readResult || writeError || readError) && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-800 mb-2">
                Result:
              </h2>
              <pre className="whitespace-pre-wrap break-words text-sm">
                {readResult
                  ? JSON.stringify(readResult, null, 2)
                  : "Error executing contract"}
              </pre>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default ContractTester;
