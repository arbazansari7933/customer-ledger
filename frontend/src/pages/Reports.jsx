import { useNavigate } from "react-router-dom";
import DevNotice from "../components/DevNotice";

export default function Reports() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <button
        onClick={() => navigate(-1)}
        className="text-green-600 text-sm hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Reports
      </h1>
      <DevNotice/>
      

      {/* SUMMARY CARDS */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Daily Sales</p>
          <p className="text-green-600 text-xl font-bold">₹0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Customer Udhaar</p>
          <p className="text-red-600 text-xl font-bold">₹0</p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Customer Advance</p>
          <p className="text-green-600 text-xl font-bold">₹0</p>
        </div>

      </div>

      {/* DUE CUSTOMERS */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="font-semibold text-gray-800 mb-2">
          Due Customers
        </p>

        <p className="text-sm text-gray-500">
          No due customers
        </p>
      </div>

      {/* RECENT BILLS */}
      <div className="bg-white rounded-xl shadow p-4">
        <p className="font-semibold text-gray-800 mb-2">
          Recent Bills
        </p>

        <p className="text-sm text-gray-500">
          No bills yet
        </p>
      </div>

    </div>
  );
}