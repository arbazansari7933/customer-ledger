import { Link } from "react-router-dom";

export default function MainDashboard() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      {/* HEADER */}
      <h1 className="text-3xl font-semibold text-gray-800 text-center mb-8">
        📘 My Ledger App
      </h1>

      {/* QUICK ACTIONS */}
      <div className="w-full max-w-xl mx-auto mb-8 grid grid-cols-2 gap-4">

        {/* Customers */}
        <Link
          to="/customers"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">👥</p>
          <p className="font-semibold text-gray-700 mt-1">Customers</p>
        </Link>

        {/* Wholesalers */}
        <Link
          to="/wholesalers"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">🏪</p>
          <p className="font-semibold text-gray-700 mt-1">Wholesalers</p>
        </Link>
      </div>

      {/* SECOND MENU SECTION */}
      <div className="w-full max-w-xl mx-auto space-y-4">

        <Link
         // to="/reports"
          className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition"
        >
          📊 Reports
        </Link>

        <Link
         // to="/about"
          className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition"
        >
          ℹ️ About App
        </Link>

        <Link
         // to="/settings"
          className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition"
        >
          ⚙️ Settings
        </Link>

        <Link
         // to="/login"
          className="block bg-red-600 text-white shadow-sm rounded-xl p-4 text-center font-medium hover:bg-red-700 transition"
        >
          🔐 Logout
        </Link>

      </div>

    </div>
  );
}
