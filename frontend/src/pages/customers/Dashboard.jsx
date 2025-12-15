import api from "../../uitls/api";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import CustomerCard from "../../components/CustomerCard";
import { useNavigate } from "react-router-dom";


const Dashboard = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const [search, setSearch] = useState("");
    const navigate = useNavigate();
    useEffect(() => {
        const fetchCustomer = async () => {
            try {
                const res = await api.get("/customers/list");
                setData(res.data.customers);
                setMessage(res.data.message);
            } catch (error) {
                setMessage(error.response?.data?.message || "Something went wrong");
            } finally {
                setLoading(false);
            }
        };

        fetchCustomer();
    }, []);
    // console.log("Customer Data:", data);

    const filtered = data.filter((customer) => {
        const name = (customer.name || "").toLowerCase();
        const phone = customer.phone || "";

        const query = search.toLowerCase().trim();

        return name.includes(query) || phone.includes(query);
    });
    // console.log("Filtered:", filtered);
    const totalUdhar = data
        .filter((c => c.balance < 0))
        .reduce((sum, c) => sum + Math.abs(c.balance), 0);
    const totalAdvance = data
        .filter(c => c.balance > 0)
        .reduce((sum, c) => sum + Math.abs(c.balance), 0);
        console.log("Udhar: ", totalUdhar);
        console.log("Advance: ", totalAdvance);
        

    return (
        <div className="min-h-screen bg-gray-100 p-4">
          {/* Back Button */}
          <button
            onClick={() => navigate(`/`)}
            className="text-green-600 text-sm hover:underline"
          >
            ← Back
          </button>

  {/* TOP BAR */}
  <div className="flex items-center justify-between mb-4">
    
    <h1 className="text-xl font-semibold text-gray-800">Customers</h1>

    <Link
      to="/add-customer"
      className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
    >
      + Add
    </Link>
  </div>

  {/* SUMMARY CARDS (You will give / You will get) */}
  <div className="bg-white rounded-xl shadow p-4 mb-4 flex justify-between items-center">
    <div className="w-1/2 text-center border-r">
      <p className="text-gray-600 text-sm">You will get from Customer </p>
      <p className="text-red-600 font-bold text-lg">₹{totalUdhar}</p>
    </div>

    <div className="w-1/2 text-center">
      <p className="text-gray-600 text-sm">You will give to Customer</p>
      <p className="text-green-600 font-bold text-lg">₹{totalAdvance}</p>
    </div>
  </div>

  {/* SEARCH BAR */}
  <div className="flex gap-2 mb-4">
    <input
      type="text"
      placeholder="Search customer"
      value={search}
      onChange={(e) => setSearch(e.target.value)}
      className="flex-1 h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm 
                 focus:ring-2 focus:ring-green-400 outline-none"
    />

    <button
      //onClick={() => navigate("/wholesaler")}
      className="px-3 h-11 bg-green-600 text-white rounded-lg shadow hover:bg-green-700"
    >
      Search
    </button>
  </div>

  {/* LABEL */}
  <p className="text-gray-500 text-sm mb-2">
    Customers: <span className="text-gray-800 font-semibold">{filtered.length}</span>
  </p>

  {/* CUSTOMER LIST */}
  <div className="space-y-3 overflow-y-auto pb-20 h-[65vh]">

    {filtered.length === 0 && !loading && (
      <p className="text-center text-gray-500">No customer found</p>
    )}

    {filtered.map((customer) => (
      <CustomerCard key={customer._id} customer={customer} />
    ))}

  </div>
</div>



    );
};

export default Dashboard;
