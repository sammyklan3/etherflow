import { CircleDollarSign, Zap, Shield } from "lucide-react";

const Features = () => {
  return (
    <div id="features" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Why Choose EtherFlow
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Experience the next generation of Ethereum transfers with our
            cutting-edge platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-indigo-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-indigo-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Lightning Fast
            </h3>
            <p className="text-gray-600">
              Complete transfers in seconds with our optimized transaction
              routing.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-green-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <Shield className="h-6 w-6 text-green-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Bank-Grade Security
            </h3>
            <p className="text-gray-600">
              Your transactions are protected with military-grade encryption.
            </p>
          </div>

          <div className="p-6 bg-white rounded-xl border border-gray-100 hover:shadow-lg transition-shadow">
            <div className="bg-blue-100 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
              <CircleDollarSign className="h-6 w-6 text-blue-600" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              No fees
            </h3>
            <p className="text-gray-600">
              Enjoy free and transparent pricing on all transfers.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Features;
