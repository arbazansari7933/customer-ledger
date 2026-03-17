import { useNavigate } from "react-router-dom";

export default function AboutApp() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 text-sm hover:underline mb-4"
      >
        ← Back
      </button>

      {/* Header */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">
          About This App
        </h1>
        <p className="text-sm text-gray-500">
          KGN Collection • Customer Ledger & Billing System
        </p>
      </div>

      {/* About */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

        <p className="text-gray-700 text-sm leading-relaxed">
          This application is built for 
          <span className="font-semibold"> KGN Collection </span>
          to manage daily shop operations like customer records,
          wholesaler transactions, and billing in a simple digital way.
        </p>

        <p className="text-gray-700 text-sm leading-relaxed">
          It replaces manual notebook entries by storing all data digitally,
          making it easy to track dues, payments, and daily business activity.
        </p>

      </div>

      {/* Features */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">

        <h2 className="font-semibold text-gray-800 mb-2">
          Features
        </h2>

        <ul className="text-sm text-gray-700 space-y-2">

          <li>• Manage customer details and credit (Udhar)</li>

          <li>• Manage wholesaler records and transactions</li>

          <li>• Track payments (Due / Paid entries)</li>

          <li>• Generate bills and thermal print support</li>

          <li>• Create and print price tag stickers</li>

          <li>• Purchase calculator for estimating wholesaler cost</li>

          <li>• Daily reports (sales, due, customers, bills)</li>

          <li>• View today's bills and due lists</li>

        </ul>

      </div>

      {/* Reports */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-2">

        <h2 className="font-semibold text-gray-800">
          Daily Reports Include
        </h2>

        <ul className="text-sm text-gray-700 space-y-2">
          <li>• Total sales of the day</li>
          <li>• Total due amount</li>
          <li>• Number of customers</li>
          <li>• Today’s bills</li>
          <li>• Pending due bills</li>
        </ul>

      </div>

      {/* Purpose */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-2">

        <h2 className="font-semibold text-gray-800">
          Purpose
        </h2>

        <p className="text-gray-700 text-sm leading-relaxed">
          The goal of this app is to make shop management faster,
          reduce manual errors, and keep all records organized in one place.
        </p>

        <p className="text-gray-700 text-sm leading-relaxed">
          It is designed for real daily usage with a focus on simplicity
          and quick access to important data.
        </p>

      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-6 space-y-1">
        <p>Built for KGN Collection</p>
        <p className="text-gray-400">Developed by Arbaz Ansari</p>
      </div>

    </div>
  );
}