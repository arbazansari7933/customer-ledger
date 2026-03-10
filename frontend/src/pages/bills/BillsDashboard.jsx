import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../uitls/api";
import BillCard from "../../components/BillCard";

export default function BillsDashboard() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBill=async()=>{
      try {
        const res=await api.get("/bills");
         // console.log("Response : " , res);
        setData(res.data.bills);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      } finally{
        setLoading(false);
      }
    };
    fetchBill();
  }, [])
  //console.log("Bills: " , data);
  return (
    <div className="min-h-screen bg-gray-100 p-4">

      {/* Back */}
      <button
        onClick={() => navigate(`/`)}
        className="text-green-600 text-sm hover:underline"
      >
        ← Back
      </button>

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-xl font-semibold text-gray-800">Bills</h1>

        <Link
          to="/add-bill"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          + Create Bill
        </Link>
      </div>

      {/* SUMMARY CARDS */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">
        <div className="w-1/2 text-center border-r">
          <p className="text-gray-600 text-sm">Total Sales</p>
          <p className="text-green-600 font-bold text-lg">₹0</p>
        </div>

        <div className="w-1/2 text-center">
          <p className="text-gray-600 text-sm">Total Due</p>
          <p className="text-red-600 font-bold text-lg">₹0</p>
        </div>
      </div>

      {/* SEARCH */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search bill by name / phone"
          className="flex-1 h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm 
                     focus:ring-2 focus:ring-green-400 outline-none"
        />

        <button className="px-3 h-11 bg-green-600 text-white rounded-lg shadow hover:bg-green-700">
          Search
        </button>
      </div>

      {/* LABEL */}
      <p className="text-gray-500 text-sm mb-2">
        Bills: <span className="text-gray-800 font-semibold">0</span>
      </p>

      {/* LIST */}
      <div className="space-y-4 overflow-y-auto pb-20 h-[65vh]">

        {/* Example card */}
        {data.map((bill)=>{
          return <BillCard key={bill._id} bill={bill}/>
        })}
        
        {/* Empty */}
        <p className="text-center text-gray-500">No bills found</p>

      </div>
    </div>
  );
}
