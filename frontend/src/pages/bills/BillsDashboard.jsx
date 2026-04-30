import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../../utils/api";
import BillCard from "../../components/BillCard";
import Navbar from "../../components/Navbar";
import BottomNavbar from "../../components/BottomNavbar";

export default function BillsDashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [filteredBills, setFilteredBills] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await api.get("/bills");
        setData(res.data.bills);
        setFilteredBills(res.data.bills);
        setMessage(res.data.message);
      } catch (error) {
        setMessage(error.response?.data?.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, []);

  // 🔎 Search Logic
  useEffect(() => {

    const query = search.toLowerCase().trim();

    if (!query) {
      setFilteredBills(data);
      return;
    }

    const filtered = data.filter((bill) => {

      const name = (bill.name || "").toLowerCase();
      const phone = bill.phone || "";
      const id = bill._id || "";

      return (
        name.includes(query) ||
        phone.includes(query) ||
        id.includes(query)
      );
    });

    setFilteredBills(filtered);

  }, [search, data]);

  const totalSale=data
      .reduce((sum, d)=> sum+Math.abs(d.total), 0);
      
  const totalDue=data
      .reduce((sum, d)=>sum+Math.abs(d.due), 0);      
      

  return (
    <div className="min-h-screen bg-gray-100 pb-16">
  {/* <Navbar /> */}
  <div className="p-4">

      {/* TOP BAR */}
      <div className="flex items-center justify-between mb-4">

        <h1 className="text-xl font-semibold text-gray-800">
          Bills
        </h1>

        <Link
          to="/add-bill"
          className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
        >
          + Create New Bill
        </Link>

      </div>

      {/* SUMMARY CARDS */}
      <div className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">

        <div className="w-1/2 text-center border-r">
          <p className="text-gray-600 text-sm">Total Sales</p>
          <p className="text-green-600 font-bold text-lg">{totalSale.toFixed(2)}</p>
        </div>

        <div className="w-1/2 text-center">
          <p className="text-gray-600 text-sm">Total Due</p>
          <p className="text-red-600 font-bold text-lg">{totalDue.toFixed(2)}</p>
        </div>

      </div>

      {/* SEARCH BAR */}
      <div className="mb-4">

        <input
          type="text"
          placeholder="🔎 Search by name, phone or bill id..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full h-11 px-4 border border-gray-300 rounded-lg bg-white shadow-sm
                     focus:ring-2 focus:ring-green-400 outline-none"
        />

      </div>

      {/* BILL COUNT */}
      <p className="text-gray-500 text-sm mb-2">
        Bills:
        <span className="text-gray-800 font-semibold ml-1">
          {filteredBills.length}
        </span>
      </p>

      {/* LIST */}
      <div className="space-y-4 overflow-y-auto pb-20 h-[65vh]">

        {/* Loading */}
        {loading && (
          <p className="text-center text-gray-500">
            Loading bills...
          </p>
        )}

        {/* Bills */}
        {!loading && filteredBills.map((bill) => (
          <BillCard key={bill._id} bill={bill} />
        ))}

        {/* Empty */}
        {!loading && filteredBills.length === 0 && (
          <p className="text-center text-gray-500">
            No bills found
          </p>
        )}

      </div>

    </div>
  <BottomNavbar />
</div>
  );
}