import React from "react";

export default function Networks() {
  const networks = [
    {
      name: "Ethereum",
      description: "Main Ethereum network",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjMzQzNDM0IiBkPSJNMTYgMzJDNy4xNjMgMzIgMCAyNC44MzcgMCAxNlM3LjE2MyAwIDE2IDBzMTYgNy4xNjMgMTYgMTZzLTcuMTYzIDE2LTE2IDE2em03Ljk5NC0xNS43NDFMMTYuNDk4IDRMMTAgMTYuMjU5TDE2LjQ5OCAyMWw3LjQ5Ni00Ljc0MXptLTcuOTkxIDEuMTdsLTQuNDctMi44MjlsNC40Ny03LjI4M2w0LjQ3IDcuMjgzbC00LjQ3IDIuODI5eiIvPjwvc3ZnPg==",
      bgColor: "bg-gray-100",
      textColor: "text-gray-900",
    },
    {
      name: "Base",
      description: "Coinbase L2 network",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDI0QzE4LjYyNzQgMjQgMjQgMTguNjI3NCAyNCAxMkMyNCA1LjM3MjU4IDE4LjYyNzQgMCAxMiAwQzUuMzcyNTggMCAwIDUuMzcyNTggMCAxMkMwIDE4LjYyNzQgNS4zNzI1OCAyNCAxMiAyNFoiIGZpbGw9IiMwMDUyRkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA1LjU1NTU2QzguNDY1MDEgNS41NTU1NiA1LjU1NTU2IDguNDY1MDEgNS41NTU1NiAxMkM1LjU1NTU2IDE1LjUzNSA4LjQ2NTAxIDE4LjQ0NDQgMTIgMTguNDQ0NEMxNS41MzUgMTguNDQ0NCAxOC40NDQ0IDE1LjUzNSAxOC40NDQ0IDEyQzE4LjQ0NDQgOC40NjUwMSAxNS41MzUgNS41NTU1NiAxMiA1LjU1NTU2Wk04Ljg4ODg5IDEyQzguODg4ODkgMTMuNzE1MiAxMC4yODQ4IDE1LjExMTEgMTIgMTUuMTExMUMxMy43MTUyIDE1LjExMTEgMTUuMTExMSAxMy43MTUyIDE1LjExMTEgMTJDMTUuMTExMSAxMC4yODQ4IDEzLjcxNTIgOC44ODg4OSAxMiA4Ljg4ODg5QzEwLjI4NDggOC44ODg4OSA4Ljg4ODg5IDEwLjI4NDggOC44ODg4OSAxMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
      bgColor: "bg-blue-100",
      textColor: "text-blue-900",
    },
    {
      name: "Sepolia",
      description: "Ethereum test network",
      icon: "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgdmlld0JveD0iMCAwIDMyIDMyIj48cGF0aCBmaWxsPSIjODI4MkZGIiBkPSJNMTYgMzJDNy4xNjMgMzIgMCAyNC44MzcgMCAxNlM3LjE2MyAwIDE2IDBzMTYgNy4xNjMgMTYgMTZzLTcuMTYzIDE2LTE2IDE2em03Ljk5NC0xNS43NDFMMTYuNDk4IDRMMTAgMTYuMjU5TDE2LjQ5OCAyMWw3LjQ5Ni00Ljc0MXptLTcuOTkxIDEuMTdsLTQuNDctMi44MjlsNC40Ny03LjI4M2w0LjQ3IDcuMjgzbC00LjQ3IDIuODI5eiIvPjwvc3ZnPg==",
      bgColor: "bg-purple-100",
      textColor: "text-purple-900",
    },
    {
      name: "Base Sepolia",
      description: "Base test network",
      icon: "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDI0QzE4LjYyNzQgMjQgMjQgMTguNjI3NCAyNCAxMkMyNCA1LjM3MjU4IDE4LjYyNzQgMCAxMiAwQzUuMzcyNTggMCAwIDUuMzcyNTggMCAxMkMwIDE4LjYyNzQgNS4zNzI1OCAyNCAxMiAyNFoiIGZpbGw9IiM3QjYxRkYiLz4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xMiA1LjU1NTU2QzguNDY1MDEgNS41NTU1NiA1LjU1NTU2IDguNDY1MDEgNS41NTU1NiAxMkM1LjU1NTU2IDE1LjUzNSA4LjQ2NTAxIDE4LjQ0NDQgMTIgMTguNDQ0NEMxNS41MzUgMTguNDQ0NCAxOC40NDQ0IDE1LjUzNSAxOC40NDQ0IDEyQzE4LjQ0NDQgOC40NjUwMSAxNS41MzUgNS41NTU1NiAxMiA1LjU1NTU2Wk04Ljg4ODg5IDEyQzguODg4ODkgMTMuNzE1MiAxMC4yODQ4IDE1LjExMTEgMTIgMTUuMTExMUMxMy43MTUyIDE1LjExMTEgMTUuMTExMSAxMy43MTUyIDE1LjExMTEgMTJDMTUuMTExMSAxMC4yODQ4IDEzLjcxNTIgOC44ODg4OSAxMiA4Ljg4ODg5QzEwLjI4NDggOC44ODg4OSA4Ljg4ODg5IDEwLjI4NDggOC44ODg4OSAxMloiIGZpbGw9IndoaXRlIi8+Cjwvc3ZnPgo=",
      bgColor: "bg-indigo-100",
      textColor: "text-indigo-900",
    },
  ];

  return (
    <div id="networks" className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Supported Networks
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transfer your assets across multiple networks with seamless
            integration
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {networks.map((network) => (
            <div
              key={network.name}
              className={`${network.bgColor} rounded-xl p-6 transition-transform hover:scale-105`}
            >
              <div className="flex items-start space-x-4">
                <img
                  src={network.icon}
                  alt={network.name}
                  className="w-12 h-12"
                />
                <div>
                  <h3 className={`font-semibold ${network.textColor} text-lg`}>
                    {network.name}
                  </h3>
                  <p className="text-gray-600 text-sm mt-1">
                    {network.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
