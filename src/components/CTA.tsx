import { Link } from "react-router-dom";

const CTA = () => {
  return (
    <div className="bg-indigo-600 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-white mb-4">
          Ready to Start Transferring?
        </h2>
        <p className="text-indigo-100 mb-8 max-w-2xl mx-auto">
          Join other users who trust EtherFlow for their Ethereum transfers.
        </p>
        <Link
          to="/send"
          className="bg-white text-indigo-600 px-8 py-3 rounded-lg hover:bg-indigo-50 transition-colors"
        >
          Get Started Now
        </Link>
      </div>
    </div>
  );
};

export default CTA;
