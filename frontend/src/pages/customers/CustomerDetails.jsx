import api from "../../utils/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TransactionCard from "../../components/TransactionCard";
import { FaWhatsapp, FaPhoneAlt } from "react-icons/fa";

export default function CustomerDetails() {

  const { id } = useParams(); // customerId
  console.log("PARAM ID:", id);
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/customers/${id}`);
        setCustomer(res.data.customer);
      } catch (error) {
        console.log("DETAIL ERROR:", error.response?.data || error.message);
        setMessage(error.response?.data?.message || "Unable to load customer");
      }

      finally {
        setLoading(false);
      }
    };

    fetchDetail();
  }, [id]);

  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!customer) return <p className="p-4 text-center">No customer found</p>;
  const balanceColor =
    customer.balance > 0
      ? "text-green-600"
      : customer.balance < 0
        ? "text-red-600"
        : "text-gray-600";   // balance = 0 → gray
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure want to delete this cutomer?");
    if (!confirmDelete) {
      return;
    }
    try {
      const res = await api.delete(`/customers/${id}`);
      navigate(`/customers`);
    } catch (error) {
      alert(error.response?.data?.message || "Something went wrong");
    }
  }
  const handleWhatsAppReminder = () => {
  if (!customer.phone) {
    alert("Customer phone number not available");
    return;
  }

  const phone = `91${customer.phone}`;

  // remove minus sign
  const balanceAmount = Math.abs(customer.balance);

  let statusText = "";

  if (customer.balance < 0) {
    statusText = `Aapka ₹${balanceAmount} baki (due) hai.`;
  } else if (customer.balance > 0) {
    statusText = `Aapke paas ₹${balanceAmount} advance jama hai.`;
  } else {
    statusText = `Aapka balance clear hai.`;
  }

  const message = `Hello ${customer.name},

KGN Collection se message.

${statusText}

Jitna jald ho sake payment clear kare !

Thank You !!`;

  const url = `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;

  window.open(url, "_blank");
};

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">

      {/* Top Section */}
<div className="mb-6 w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl p-5 sm:p-6">

  {/* TOP BAR */}
  <div className="flex justify-between items-center mb-4">

    {/* BACK BUTTON */}
    <button
      onClick={() => navigate(`/customers`)}
      className="text-green-600 text-sm hover:underline"
    >
      ← Back
    </button>

    {/* ACTIONS */}
    <div className="flex items-center gap-2">

      {/* CALL */}
      <a
        href={`tel:${customer.phone}`}
        className="flex items-center gap-1 px-2.5 py-1 text-xs bg-blue-600 text-white rounded-md shadow-sm hover:bg-blue-700 transition"
      >
        <FaPhoneAlt size={10} />
        Call
      </a>

      {/* REMINDER */}
      <button
        onClick={handleWhatsAppReminder}
        className="flex items-center gap-1 px-2.5 py-1 text-xs bg-green-500 text-white rounded-md shadow-sm hover:bg-green-600 transition"
      >
        <FaWhatsapp size={12} />
        Reminder
      </button>

      {/* 3 DOT MENU */}
      <details className="relative">

        <summary className="list-none cursor-pointer text-2xl text-gray-600 px-1 select-none">
          ⋮
        </summary>

        <div className="absolute right-0 mt-2 w-28 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden z-10">

          <Link
            to={`/customer/${id}/edit-customer`}
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
          >
            Edit
          </Link>

          <button
            onClick={handleDelete}
            className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
          >
            Delete
          </button>

        </div>

      </details>

    </div>

  </div>

  {/* CUSTOMER INFO */}
  <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800 leading-tight">
    {customer.name}
  </h1>

  <p className="text-gray-600 text-sm sm:text-base mt-1">
    {customer.phone}
  </p>

  {customer.address && (
    <p className="text-gray-500 text-xs mt-0.5">
      {customer.address}
    </p>
  )}

  {/* BALANCE */}
  <p
    className={`text-3xl sm:text-4xl font-bold mt-5 ${balanceColor}`}
  >
    ₹ {customer.balance}
  </p>

</div>

      {/* Action Buttons */}
      <div className="w-full max-w-xl mx-auto mb-6 flex gap-3">


        {/* Give */}
        <Link
          to={`/customer/${id}/add-transaction`}
          state={{ type: "give" }}
          className="flex-1 text-center py-3 sm:py-4 bg-red-600 text-white font-semibold rounded-xl shadow hover:bg-red-700 transition"
        >
          Give
        </Link>

        {/* Receive */}
        <Link
          to={`/customer/${id}/add-transaction`}
          state={{ type: "receive" }}
          className="flex-1 text-center py-3 sm:py-4 bg-green-600 text-white font-semibold rounded-xl shadow hover:bg-green-700 transition"
        >
          Receive
        </Link>

      </div>

      {/* Transactions Title */}
      <h2 className="text-lg sm:text-xl font-semibold text-gray-700 mb-2 max-w-xl mx-auto">
        Transactions
      </h2>

      {/* Transactions List */}
      <div className="space-y-3 w-full max-w-xl mx-auto overflow-y-auto h-[60vh] sm:h-[65vh] pb-4">

        {customer.transaction.length === 0 && (
          <p className="text-gray-500 text-center">No transactions yet</p>
        )}

        {customer.transaction
          .slice()
          .reverse()
          .map((t) => (
            <TransactionCard key={t._id} t={t} customerId={id} />
          ))}

      </div>
    </div>


  );
}
