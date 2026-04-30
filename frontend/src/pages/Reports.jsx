import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import DevNotice from "../components/DevNotice";
import api from "../utils/api";
import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";

export default function Reports() {

  const navigate = useNavigate();

  // 📅 date state
  const [selectedDate, setSelectedDate] = useState(
    new Date().toISOString().split("T")[0]
  );
  
  //console.log(selectedDate);

  // dummy data (baad me API se aayega)
  const [bills, setBills] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

 
  const totalBills = bills.length;

  const totalSale=bills
      .reduce((sum, d)=> sum+Math.abs(d.total), 0);
      
  const totalDue=bills
      .reduce((sum, d)=>sum+Math.abs(d.due), 0);  

  const totalPaid=bills
      .reduce((sum, d)=>sum+Math.abs(d.paid), 0);  
// console.log(totalSale, totalDue);
  const dueBills = bills.filter((bill) => bill.due > 0);
  
 // const bills = [];

  useEffect(() => {
    const fetchReport=async()=>{
      try {
      const res=await api.post("/reports",{selectedDate});
      setBills(res.data);
      setMessage(res.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
    finally{
      setLoading(false); 
    }
    }
    fetchReport();
  }, [selectedDate])
  

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
  {/* <Navbar /> */}
  <div className="p-4">

      <h1 className="text-xl font-semibold text-gray-800 mb-4">
        Reports
      </h1>

      <DevNotice />

      {/* 📅 DATE FILTER */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex items-center justify-between">
        
        <input
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          className="border rounded-lg px-3 py-2 text-sm"
        />

        <button
          onClick={() =>
            setSelectedDate(new Date().toISOString().split("T")[0])
          }
          className="text-green-600 text-sm font-medium"
        >
          Today
        </button>
      </div>

      {/* SUMMARY */}
      <div className="grid grid-cols-2 gap-4 mb-4">

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Sales</p>
          <p className="text-green-600 text-xl font-bold">
            ₹{totalSale.toFixed(0)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Due</p>
          <p className="text-red-600 text-xl font-bold">
            ₹{totalDue.toFixed(0)}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Receive</p>
          <p className="text-green-600 text-xl font-bold">
            ₹{totalPaid}
          </p>
        </div>

        <div className="bg-white rounded-xl shadow p-4 text-center">
          <p className="text-gray-500 text-sm">Total Bills</p>
          <p className="text-blue-600 text-xl font-bold">
            {totalBills}
          </p>
        </div>

      </div>

      {/* 💰 DUE CUSTOMERS */}
      <div className="bg-white rounded-xl shadow p-4 mb-4">
        <p className="font-semibold text-gray-800 mb-2">
          Due Bills
        </p>

        {dueBills.length === 0 ? (
          <p className="text-sm text-gray-500">
            No due bills
          </p>
        ) : (
          dueBills.map((c, i) => (
            <div key={i} className="flex justify-between text-sm border-b py-2">
              <span>{c.name}</span>
              <span className="text-red-600">₹{c.due.toFixed(0)}</span>
            </div>
          ))
        )}
      </div>

      {/* 🧾 BILLS */}
      <div className="bg-white rounded-xl shadow p-4">
        <p className="font-semibold text-gray-800 mb-2">
          Bills ({selectedDate})
        </p>

        {bills.length === 0 ? (
          <p className="text-sm text-gray-500">
            No bills for this date
          </p>
        ) : (
          bills.map((bill, i) => (
            <div key={i} className="border-b py-2 text-sm flex justify-between">
              <span>{bill.name}</span>
              <span>₹{bill.total}</span>
            </div>
          ))
        )}
      </div>

      </div>
  <BottomNavbar />
</div>
  );
}