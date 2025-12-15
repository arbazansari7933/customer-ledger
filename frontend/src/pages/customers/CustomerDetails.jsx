import api from "../../uitls/api";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import TransactionCard from "../../components/TransactionCard";

export default function CustomerDetails() {

  const { id } = useParams(); // customerId
  const navigate = useNavigate();

  const [customer, setCustomer] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");


  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/customers/customerdetail/${id}`);
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
      const res = await api.delete(`/customers/delete/${id}`);
      navigate(`/customers`);
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">

      {/* Top Section */}
      <div className="mb-6 w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl p-5 sm:p-6">

        {/* Top Row: Back button + Edit/Delete */}
        <div className="flex justify-between items-start mb-3">

          {/* Back Button */}
          <button
            onClick={() => navigate(`/`)}
            className="text-green-600 text-sm hover:underline"
          >
            ← Back
          </button>

          {/* Edit + Delete Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/customer/${id}/edit-customer`}
              className="px-3 py-1.5 text-sm bg-white text-green-600 border border-green-600 rounded-lg shadow-sm hover:bg-green-50 transition"
            >
              Edit
            </Link>

            <button
              onClick={handleDelete}
              className="px-3 py-1.5 text-sm bg-red-600 text-white rounded-lg shadow-sm hover:bg-red-700 transition"
            >
              Delete
            </button>
          </div>

        </div>

        {/* Customer Info */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          {customer.name}
        </h1>

        <p className="text-gray-600 text-sm sm:text-base">{customer.phone}</p>

        {customer.address && (
          <p className="text-gray-500 text-sm mt-1">{customer.address}</p>
        )}

        <p
          className={`text-3xl sm:text-4xl font-bold mt-4 ${balanceColor}`}
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
