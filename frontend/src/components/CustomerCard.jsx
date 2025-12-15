import { Link } from "react-router-dom";

const CustomerCard = ({ customer }) => {
  const balanceColor =
    customer.balance > 0
      ? "text-green-600"
      : customer.balance < 0
      ? "text-red-600"
      : "text-gray-500";

  return (
    <Link
      to={`/customer-details/${customer._id}`}
      className="block bg-white p-4 rounded-xl shadow border border-gray-200 
                 hover:shadow-md transition"
    >
      {/* Top Row: Name + Last Updated */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-gray-800">
          {customer.name}
        </h2>

        <span className="text-xs text-gray-500">
          {customer.updatedAt
            ? new Date(customer.updatedAt).toLocaleDateString()
            : ""}
        </span>
      </div>

      {/* Phone */}
      <p className="text-gray-600 text-sm mt-1">{customer.phone}</p>

      {/* Amount */}
      <p className={`text-xl font-bold mt-2 ${balanceColor}`}>
        ₹ {customer.balance}
      </p>
    </Link>
  );
};

export default CustomerCard;
