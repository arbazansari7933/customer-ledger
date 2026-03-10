import { Link } from "react-router-dom";

export default function BillCard({ bill }) {
  const statusColor =
    bill.status === "paid"
      ? "text-green-600"
      : "text-red-600";

  return (
    <Link
      to={`/bill/${bill._id}`}
      className="block bg-white p-4 rounded-xl shadow border border-gray-200 
                 hover:shadow-md transition"
    >
      {/* Top Row */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-semibold text-gray-800">
            {bill.name}
          </h2>
          <p className="text-gray-600 text-sm">{bill.phone}</p>
        </div>

        <span className="text-xs text-gray-500">
          {bill.createdAt
            ? new Date(bill.createdAt).toLocaleDateString()
            : ""}
        </span>
      </div>

      {/* Bottom Row */}
      <div className="flex justify-between items-center mt-3">
        <p className="text-gray-700 font-medium">
          Total: ₹ {bill.total}
        </p>

        <p className={`font-bold ${statusColor}`}>
          {bill.status === "paid"
            ? "Paid"
            : `Due: ₹ ${bill.due}`}
        </p>
      </div>
    </Link>
  );
}
