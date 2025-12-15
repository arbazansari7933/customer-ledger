import { Link } from "react-router-dom";

export default function TransactionCardWholesaler({ t, wholesalerId }) {

  const amountColor = 
    t.type === "receive" ? "text-red-600" : "text-green-600";
    console.log("transactionid :", t._id);
    console.log("wholesalerId :",wholesalerId);
    const type=t.type;
  return (
    <Link
      to={`/wholesaler/transaction-detail/${t._id}`}
      state={{ wholesalerId, type }}   // pass wholesalerId from parent
      className="display:block bg-white p-4 sm:p-5 rounded-xl shadow border border-gray-100 flex justify-between items-center hover:shadow-md transition"
    >
      {/* LEFT SIDE */}
      <div>
        <p className="font-semibold text-gray-800 text-sm sm:text-base">
          {t.note || (t.type === "give" ? "Payment Kiya" : "Stock Ayaa")}
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
