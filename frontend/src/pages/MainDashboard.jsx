import { Link } from "react-router-dom";

export default function MainDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-100 to-gray-200 px-4 py-6">

      {/* HEADER */}
      <div className="w-full max-w-xl mx-auto bg-white/80 backdrop-blur rounded-2xl shadow-lg p-6 mb-6 text-center border border-gray-200">

        <h1 className="text-3xl font-bold text-gray-800 tracking-wide">
          KGN COLLECTION
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Customer Ledger & Billing System
        </p>

      </div>


      {/* MAIN ACTIONS */}
      <div className="w-full max-w-xl mx-auto grid grid-cols-2 gap-4 mb-6">

        <Link
          to="/customers"
          className="group bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-5 text-center shadow hover:shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-4xl group-hover:scale-110 transition">👥</p>
          <p className="font-semibold text-gray-700 mt-2">
            Customers
          </p>
        </Link>

        <Link
          to="/wholesalers"
          className="group bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-5 text-center shadow hover:shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-4xl group-hover:scale-110 transition">🏪</p>
          <p className="font-semibold text-gray-700 mt-2">
            Wholesalers
          </p>
        </Link>

        <Link
          to="/bills"
          className="group bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-5 text-center shadow hover:shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-4xl group-hover:scale-110 transition">🧾</p>
          <p className="font-semibold text-gray-700 mt-2">
            Bills
          </p>
        </Link>

        <Link
          to="/reports"
          className="group bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-2xl p-5 text-center shadow hover:shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-4xl group-hover:scale-110 transition">📊</p>
          <p className="font-semibold text-gray-700 mt-2">
            Reports
          </p>
        </Link>

        <Link
          to="/stickers"
          className="group bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 text-center shadow hover:shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-4xl group-hover:scale-110 transition">🏷️</p>
          <p className="font-semibold text-gray-700 mt-2">
            Stickers
          </p>
        </Link>

        <Link
          to="/addstock"
          className="group bg-gradient-to-br from-pink-50 to-pink-100 rounded-2xl p-5 text-center shadow hover:shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-4xl group-hover:scale-110 transition">📦</p>
          <p className="font-semibold text-gray-700 mt-2">
            Add Stock
          </p>
        </Link>

        <Link
          to="/purchase-calculator"
          className="group bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-5 text-center shadow hover:shadow-lg transition hover:-translate-y-1"
        >
          <p className="text-4xl group-hover:scale-110 transition">📝</p>
          <p className="font-semibold text-gray-700 mt-2">
            Purchase Calculator
          </p>
        </Link>

      </div>


      {/* SECOND MENU */}
      <div className="w-full max-w-xl mx-auto space-y-3">

        <Link
          to="/about"
          className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:shadow-md transition"
        >
          <span className="text-gray-700 font-medium">ℹ️ About App</span>
          <span className="text-gray-400">›</span>
        </Link>

        <Link
          to="/settings"
          className="flex items-center justify-between bg-white rounded-xl shadow p-4 hover:shadow-md transition"
        >
          <span className="text-gray-700 font-medium">⚙️ Settings</span>
          <span className="text-gray-400">›</span>
        </Link>

      </div>

    </div>
  );
}