import { useState } from "react";

export default function PurchaseCalculator() {

  const [rows, setRows] = useState([{ rate: "", qty: 6 }]);

  const addRow = () => {
    setRows([...rows, { rate: "", qty: 6 }]);
  };

  const updateValue = (index, field, value) => {
    const updated = [...rows];
    updated[index][field] = value;
    setRows(updated);
  };

  const grandTotal = rows.reduce((sum, row) => {
    const rate = Number(row.rate) || 0;
    const qty = Number(row.qty) || 0;
    return sum + rate * qty;
  }, 0);

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      {/* HEADER CARD */}
      <div className="w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl p-6 mb-6 text-center">

        <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
          Purchase Calculator
        </h1>

        <p className="text-gray-500 text-sm mt-1">
          Quick bill estimate before buying
        </p>

      </div>


      {/* CALCULATOR CARD */}
      <div className="w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl p-5">

        {rows.map((row, i) => (
          <div key={i} className="grid grid-cols-3 gap-3 mb-3">

            <input
              type="number"
              placeholder="Rate"
              value={row.rate}
              onChange={(e) =>
                updateValue(i, "rate", e.target.value)
              }
              className="border rounded-lg p-2 text-sm"
            />

            <input
              type="number"
              placeholder="Qty"
              value={row.qty}
              onChange={(e) =>
                updateValue(i, "qty", e.target.value)
              }
              className="border rounded-lg p-2 text-sm"
            />

            <div className="border rounded-lg p-2 text-sm text-center bg-gray-50">
              ₹ {(row.rate || 0) * (row.qty || 0)}
            </div>

          </div>
        ))}


        {/* ADD ITEM BUTTON */}
        <button
          onClick={addRow}
          className="w-full bg-gray-800 text-white rounded-lg py-2 mt-2 hover:bg-black transition"
        >
          + Add Item
        </button>


        {/* TOTAL */}
        <div className="mt-6 text-center">

          <p className="text-gray-500 text-sm">
            Total Purchase
          </p>

          <p className="text-2xl font-semibold text-green-600">
            ₹ {grandTotal}
          </p>

        </div>

      </div>

    </div>
  );
}