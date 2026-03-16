import { Link } from "react-router-dom";

export default function MainDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      {/* HEADER */}
      <div className="w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl p-6 mb-6 text-center">

        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          KGN COLLECTION
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Customer Ledger & Billing System
        </p>

      </div>


      {/* QUICK SUMMARY
      <div className="w-full max-w-xl mx-auto grid grid-cols-3 gap-3 mb-6">

        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-xs text-gray-500">Today Sales</p>
          <p className="font-semibold text-green-600">₹0</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-xs text-gray-500">Bills Today</p>
          <p className="font-semibold text-gray-800">0</p>
        </div>

        <div className="bg-white rounded-xl shadow-sm p-3 text-center">
          <p className="text-xs text-gray-500">Total Due</p>
          <p className="font-semibold text-red-600">₹0</p>
        </div>

      </div> */}


      {/* MAIN ACTIONS */}
      <div className="w-full max-w-xl mx-auto mb-6 grid grid-cols-2 gap-4">

        <Link
          to="/customers"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">👥</p>
          <p className="font-semibold text-gray-700 mt-1">
            Customers
          </p>
        </Link>

        <Link
          to="/wholesalers"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">🏪</p>
          <p className="font-semibold text-gray-700 mt-1">
            Wholesalers
          </p>
        </Link>

        <Link
          to="/bills"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">🧾</p>
          <p className="font-semibold text-gray-700 mt-1">
            Bills
          </p>
        </Link>

        <Link
          to="/reports"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">📊</p>
          <p className="font-semibold text-gray-700 mt-1">
            Reports
          </p>
        </Link>
        <Link
  to="/stickers"
  className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
>
  <p className="text-3xl">🏷️</p>
  <p className="font-semibold text-gray-700 mt-1">Stickers</p>
</Link>

        <Link
  to="/purchase-calculator"
  className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
>
  <p className="text-3xl">📦</p>
  <p className="font-semibold text-gray-700 mt-1">
    Purchase Calculator
  </p>
</Link>

      </div>


      {/* SECOND MENU */}
      <div className="w-full max-w-xl mx-auto space-y-4">

        <Link
          to="/about"
          className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition"
        >
          ℹ️ About App
        </Link>

        <Link
          to="/settings"
          className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition"
        >
          ⚙️ Settings
        </Link>

      </div>

    </div>
  );
}