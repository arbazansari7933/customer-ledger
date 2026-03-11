import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import ItemCard from "../../components/ItemCard";

export default function BillDetails() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await api.get(`/bills/${id}`);
        setBill(res.data.bill);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);
  const handleDelete = async () => {
      const confirmDelete = window.confirm("Are you sure want to delete this bill ?");
      if (!confirmDelete) {
        return;
      }
      try {
        const res = await api.delete(`/bills/${id}`);
        navigate(`/bills`);
      } catch (error) {
        console.log(error.response?.data?.message || "Something went wrong");
      }
    }

  // 🟡 Loading state
  if (loading) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  // 🔴 Error / Not found state
  if (!bill) {
    return (
      <div className="p-4 text-center text-red-500">
        {message || "Bill not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="text-green-600 text-sm hover:underline mb-4"
      >
        ← Back
      </button>

      {/* HEADER */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Bill Details</h1>
        <p className="text-gray-500 text-sm">Bill Id: {id}</p>
      </div>

      {/* CUSTOMER INFO */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-1">
        <p className="text-sm text-gray-600">Name: {bill.name}</p>
        <p className="text-sm text-gray-600">Phone: {bill.phone}</p>
        <p className="text-sm text-gray-600">Address: {bill.address}</p>
        <p className="text-sm text-gray-600">
          Date: {new Date(bill.date).toLocaleDateString()}
        </p>
      </div>

      {/* ITEMS */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="font-semibold text-gray-800 mb-3">Items</p>
        <div className="bg-gray-100 border rounded-lg px-3 py-2 text-xs font-semibold text-gray-700 flex justify-between">
          <span className="w-[30%]">Name</span>
          <span className="w-[10%] text-center">Qty</span>
          <span className="w-[15%] text-center">MRP</span>
          <span className="w-[15%] text-center">Disc</span>
          <span className="w-[15%] text-center">Price</span>
          <span className="w-[15%] text-right">Amount</span>
        </div>

        <div className="space-y-2">
          {bill?.items?.map((item) => (
            <ItemCard key={item._id} item={item} />
          ))}
        </div>
      </div>

      {/* BILL SUMMARY */}
      <div className="bg-white rounded-xl shadow p-4 space-y-2">
        <div className="flex justify-between">
          <p className="text-gray-600">Total</p>
          <p className="font-semibold">₹ {bill.total}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Paid</p>
          <p className="text-green-600 font-semibold">₹ {bill.paid}</p>
        </div>

        <div className="flex justify-between">
          <p className="text-gray-600">Due</p>
          <p className="text-red-600 font-semibold">₹ {bill.due}</p>
        </div>

        <div className="flex justify-between border-t pt-2 mt-2">
          <p className="text-gray-700 font-medium">Status</p>
          <p
            className={`font-bold ${bill.status === "paid" ? "text-green-600" : "text-red-600"
              }`}
          >
            {bill.status.toUpperCase()}
          </p>
        </div>
      </div>

      {/* ACTION BUTTONS */}
      <div className="mt-4 flex gap-3">
        <Link to={`/bill-print/${id}`} className="flex-1">
          <button className="w-full bg-green-600 text-white py-3 rounded-lg shadow hover:bg-green-700">
            Print Bill
          </button>
        </Link>

        <button               
        onClick={handleDelete}
        className="flex-1 bg-red-600 text-white py-3 rounded-lg shadow hover:bg-red-700">
          Delete
        </button>
      </div>
    </div>
  );
}
