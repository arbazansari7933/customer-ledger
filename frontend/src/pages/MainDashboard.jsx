import { Link } from "react-router-dom";

export default function MainDashboard() {
  return (
     <div className="min-h-screen bg-gray-100 px-4 py-6">

      {/* HEADER CARD */}
<div className="w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl p-5 sm:p-6 mb-8">
  <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">

    <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 text-center sm:text-left">
      KGN COLLECTION
    </h1>

    {/* Login / Signup */}
    <div className="flex justify-center sm:justify-end gap-2">
      <Link
        to="/login"
        className="px-3 py-1.5 text-sm text-green-600 border border-green-600 rounded-lg hover:bg-green-50 transition"
      >
        Login
      </Link>

      <Link
        to="/signup"
        className="px-3 py-1.5 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
      >
        Sign Up
      </Link>
    </div>

  </div>
</div>


      {/* QUICK ACTIONS */}
      <div className="w-full max-w-xl mx-auto mb-8 grid grid-cols-2 gap-4">

        <Link
          to="/customers"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">👥</p>
          <p className="font-semibold text-gray-700 mt-1">Customers</p>
        </Link>

        <Link
          to="/wholesalers"
          className="bg-white shadow-sm rounded-xl p-5 text-center hover:shadow-md transition"
        >
          <p className="text-3xl">🏪</p>
          <p className="font-semibold text-gray-700 mt-1">Wholesalers</p>
        </Link>

      </div>

      {/* SECOND MENU */}
      <div className="w-full max-w-xl mx-auto space-y-4">

        <Link className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition">
          📊 Reports
        </Link>

        <Link className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition">
          ℹ️ About App
        </Link>

        <Link className="block bg-white shadow-sm rounded-xl p-4 text-gray-700 font-medium hover:shadow-md transition">
          ⚙️ Settings
        </Link>

        <Link className="block bg-red-600 text-white shadow-sm rounded-xl p-4 text-center font-medium hover:bg-red-700 transition">
          🔐 Logout
        </Link>

      </div>

    </div>
  );
}
