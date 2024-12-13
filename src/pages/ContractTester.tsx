import React, { useState, useEffect } from "react";
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
              to="/send"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Send Tokens
            </NavLink>
            <NavLink
              to="/recurring-payment"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Recurring Payments
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
          <div className=" flex flex-col px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-b">
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
              to="/send"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Send Tokens
            </NavLink>
            <NavLink
              to="/recurring-payment"
              className="text-gray-600 hover:text-indigo-600 transition-colors"
            >
              Recurring Payments
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
  );
}

function ContractTester() {
  const { address } = useAccount();
  const [contractAddress, setContractAddress] = useState("");
  const [functionName, setFunctionName] = useState("");
  const [functionArgs, setFunctionArgs] = useState("[]");
  const [abi, setAbi] = useState("[]");
  const [isRead, setIsRead] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  document.title = "Smart Contract Tester - Etherflow";

  const safeParseJson = (input: string, fallback: any = null) => {
    try {
      return JSON.parse(input);
    } catch {
      return fallback;
    }
  };

  const isValidAddress = (address: string) =>
    /^0x[a-fA-F0-9]{40}$/.test(address);

  const { writeContract, isError: writeError } = useWriteContract();

  const { data: readResult, isPending: readLoading } = useReadContract({
    address: contractAddress as `0x${string}`,
    abi: safeParseJson(abi, []),
    functionName,
    args: safeParseJson(functionArgs, []),
    enabled: isRead && !!contractAddress && !!functionName && !!abi,
  });

  useEffect(() => {
    if (writeError) {
      setErrorMessage("Error executing write: " + writeError.message);
    }
  }, [writeError]);

  const validateInputs = () => {
    if (!contractAddress) {
      setErrorMessage("Contract address is required.");
      return false;
    }
    if (!isValidAddress(contractAddress)) {
      setErrorMessage("Invalid Ethereum address.");
      return false;
    }
    if (!safeParseJson(abi)) {
      setErrorMessage("Invalid ABI. Ensure it is valid JSON.");
      return false;
    }
    if (!safeParseJson(functionArgs, []).length && !isRead) {
      setErrorMessage(
        "Invalid function arguments. Ensure it's a JSON array, e.g., ['0x...', '100']."
      );
      return false;
    }
    setErrorMessage("");
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateInputs()) return;

    const parsedAbi = safeParseJson(abi, []);
    const parsedArgs = safeParseJson(functionArgs, []);

    setIsLoading(true);

    // Console log all variables
    console.log("Contract Address:", contractAddress);
    console.log("Function Name:", functionName);
    console.log("Function Arguments:", functionArgs);
    console.log("ABI:", abi);
    console.log("Is Read:", isRead);
    console.log("Error Message:", errorMessage);
    console.log("Is Loading:", isLoading);

    try {
      if (isRead) {
        console.log("Read result:", readResult);
      } else {
        await writeContract({
          address: contractAddress as `0x${string}`,
          abi: parsedAbi,
          functionName,
          args: parsedArgs,
        });
        console.log("Write successful");
      }
    } catch (error) {
      console.error("Error executing contract:", error);
      setErrorMessage(
        "Error interacting with the contract. Check console for details."
      );
    } finally {
      setIsLoading(false);
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

            {errorMessage && (
              <div className="text-sm text-red-600 bg-red-100 border border-red-400 rounded-md p-2">
                {errorMessage}
              </div>
            )}

            <button
              type="submit"
              disabled={!address || isLoading || readLoading}
              className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 disabled:opacity-50"
            >
              <PlayCircle className="w-5 h-5" />
              {readLoading || isLoading
                ? "Processing..."
                : isRead
                  ? "Read Contract"
                  : "Write Contract"}
            </button>
          </form>
        </div>
      </main>
    </div>
  );
}

export default ContractTester;
