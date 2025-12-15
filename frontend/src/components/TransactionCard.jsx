import { Link } from "react-router-dom";

export default function TransactionCard({ t, customerId }) {

  const amountColor = 
    t.type === "receive" ? "text-green-600" : "text-red-600";
    // console.log("transactionid :", t._id);
    // console.log("customerid :",customerId);
    const type=t.type;
  return (
    <Link
      to={`/transaction-detail/${t._id}`}
      state={{ customerId, type }}   // pass customerId from parent
      className="display:block bg-white p-4 sm:p-5 rounded-xl shadow border border-gray-100 flex justify-between items-center hover:shadow-md transition"
    >
      {/* LEFT SIDE */}
      <div>
        <p className="font-semibold text-gray-800 text-sm sm:text-base">
          {t.note || (t.type === "give" ? "Udhar Diya" : "Customer Paid")}
        </p>

        <p className="text-gray-500 text-xs sm:text-sm">
          {new Date(t.date).toLocaleString()}
        </p>
      </div>

      {/* AMOUNT */}
      <p className={`font-bold text-lg sm:text-xl ${amountColor}`}>
        ₹ {t.amount}
      </p>
    </Link>
  );
}
