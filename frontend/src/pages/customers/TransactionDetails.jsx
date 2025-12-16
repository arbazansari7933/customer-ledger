import { useState, useEffect } from "react";
import { useLocation, Link, useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import api from "../../uitls/api";
const TransactionDetails = () => {
  const { transactionId } = useParams();
  const location = useLocation();
  const customerId = location.state?.customerId;
  const transactionType=location.state?.type;

  
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const res = await api.get(`/customers/${customerId}/transaction-details/${transactionId}`)

        setData(res.data.transaction);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong!");
      } finally {
        setLoading(false);
      }
    }
    fetchDetail();
  }, [customerId, transactionId])
  const handleDelete = async () => {
    const confirmDelete = window.confirm("Are you sure want to delete this transction?");
    if (!confirmDelete) {
      return;
    }
    try {
      const res = await api.delete(`/customers/${customerId}/transaction/${transactionId}`);
      navigate(`/customer-details/${customerId}`)
    } catch (error) {
      console.log(error.response?.data?.message || "Something went wrong");
    }
  }
  console.log("id:", transactionId);
  
  if (loading) return <p className="p-4 text-center">Loading...</p>;
  if (!data) return <p className="p-4 text-center">No transaction found</p>;
  return (
    <div className="min-h-screen bg-gray-100 px-4 sm:px-6 py-6">

      {/* Top Section */}
      <div className="mb-6 w-full max-w-xl mx-auto bg-white shadow-sm rounded-xl p-5 sm:p-6">

        {/* Top Row: Back + Edit/Delete */}
        <div className="flex justify-between items-start mb-3">

          {/* Back Button */}
          <button
            onClick={() => navigate(`/customer-detail/${customerId}`)}
            className="text-green-600 text-sm hover:underline"
          >
            ← Back
          </button>

          {/* Edit + Delete Buttons */}
          <div className="flex gap-2">
            <Link
              to={`/transaction-detail/edit/${transactionId}`}
              state={{ type: transactionType, customerId }}
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

        {/* Transaction Info */}
        <h1 className="text-2xl sm:text-3xl font-semibold text-gray-800">
          Transaction Details
        </h1>



        <p className="text-gray-600 mt-4 text-base">
          <span className="font-semibold">Amount:</span> ₹{data.amount}
        </p>

        <p className="text-gray-600 text-base">
          <span className="font-semibold">Type:</span> {data.type}
        </p>

        <p className="text-gray-600 text-base">
          <span className="font-semibold">Date:</span> {new Date(data.date).toLocaleString()}
        </p>

        {data.note && (
          <p className="text-gray-600 text-base">
            <span className="font-semibold">Note:</span> {data.note}
          </p>
        )}

      </div>

    </div>


  )
}

export default TransactionDetails
