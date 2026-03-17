import { useNavigate } from "react-router-dom";
import { useState } from "react";
import DevNotice from "../components/DevNotice";

export default function Reports() {

  const navigate = useNavigate();

  // 📅 date state
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );

  // dummy data (later API se aayega)
  const totalSales = 0;
  const totalUdhaar = 0;
  const totalAdvance = 0;
  const totalBills = 0;

  const dueCustomers = [];
  const bills = [];

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* BACK */}
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 text-sm hover:underline mb-4"
      >
        ← Back
      </button>

      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Reports
      </h1>

      <DevNotice />

      {/* 📅 DATE FILTER */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center justify-between">
        
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />

        <button
          onClick={() =>
            setSelectedDate(new Date().toISOString().split("T")[0])
          }
          className="text-green-600 text-sm font-medium"
        >
          Today
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <p className="text-green-600 text-xl font-bold">
            ₹{totalSales}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Udhaar</p>
          <p className="text-red-600 text-xl font-bold">
            ₹{totalUdhaar}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Advance</p>
          <p className="text-green-600 text-xl font-bold">
            ₹{totalAdvance}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Bills</p>
          <p className="text-blue-600 text-xl font-bold">
            {totalBills}
          </p>
        </div>

      </div>

      {/* 💰 DUE CUSTOMERS */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="font-semibold text-gray-800 mb-2">
          Due Customers
        </p>

        {dueCustomers.length === 0 ? (
          <p className="text-sm text-gray-500">
            No due customers
          </p>
        ) : (
          dueCustomers.map((c, i) => (
            <div key={i} className="flex justify-between text-sm border-b py-2">
              <span>{c.name}</span>
              <span className="text-red-600">₹{c.balance}</span>
            </div>
          ))
        )}
      </div>

      {/* 🧾 BILLS */}
      <div className="bg-white rounded-xl shadow p-4">
        <p className="font-semibold text-gray-800 mb-2">
          Bills ({selectedDate})
        </p>

        {bills.length === 0 ? (
          <p className="text-sm text-gray-500">
            No bills for this date
          </p>
        ) : (
          bills.map((bill, i) => (
            <div key={i} className="border-b py-2 text-sm flex justify-between">
              <span>#{bill.billNo}</span>
              <span>₹{bill.total}</span>
            </div>
          ))
        )}
      </div>

    </div>
  );
}