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
          KGN Collection Shop Management System
        </p>
      </div>

      {/* About App */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

        <p className="text-gray-700 text-sm leading-relaxed">
          This application is built to manage daily shop operations for 
          <span className="font-semibold"> KGN Collection</span>.
        </p>

        <p className="text-gray-700 text-sm leading-relaxed">
          The goal of this system is to make customer transactions, wholesaler
          records, and billing simple and organized.
        </p>

        <p className="text-gray-700 text-sm leading-relaxed">
          Instead of maintaining physical notebooks for credit and payments,
          all records are stored digitally so they are easy to track and manage.
        </p>

      </div>

      {/* Features */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">

        <h2 className="font-semibold text-gray-800 mb-2">
          Features
        </h2>

        <ul className="text-sm text-gray-700 space-y-2">

          <li>• Manage customer credit (Udhar) records</li>

          <li>• Manage wholesaler transactions</li>

          <li>• Track payments and balances</li>

          <li>• Generate and print bills</li>

          <li>• View transaction history</li>

          <li>• Simple dashboard for quick access</li>

        </ul>

      </div>

      {/* Purpose */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-2">

        <h2 className="font-semibold text-gray-800">
          Purpose
        </h2>

        <p className="text-gray-700 text-sm leading-relaxed">
          This project was created to simplify daily shop management and reduce
          manual work. It helps track customer dues, payments, and billing
          efficiently in one place.
        </p>

      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-500 mt-6">
        Built for KGN Collection
      </div>

    </div>
  );
}