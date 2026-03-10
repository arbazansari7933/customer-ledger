import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import api from "../../uitls/api";
import PrintItemRow from "../../components/PrintItemRow";

export default function BillPrint() {
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
    <div className="min-h-screen bg-gray-200 flex justify-center py-6">

      {/* RECEIPT PAPER */}
      <div className="bg-white w-[300px] p-4 shadow text-sm">

        {/* SHOP HEADER */}
        <div className="text-center">
          <h1 className="text-xl font-bold tracking-wide">
            KGN COLLECTION
          </h1>
          <p>Complete Family Mall & Wholesale</p>
          <p>Main Road Maskedih</p>
          <p>Mob: 8298188469</p>
        </div>

        <hr className="my-2 border-dashed" />

        {/* BILL INFO */}
        <div className="text-xs space-y-1">
          <p>Bill ID: {id}</p>
          <p>Name: {bill.name}</p>
          <p>Phone: {bill.phone}</p>
          <p>
          Date: {new Date(bill.date).toLocaleDateString()}
        </p>
        </div>

        <hr className="my-2 border-dashed" />

        {/* ITEM HEADER */}
        <div className="flex text-xs font-semibold">
          <span className="w-[35%]">Item</span>
          <span className="w-[10%] text-center">Q</span>
          <span className="w-[15%] text-center">MRP</span>
          <span className="w-[10%] text-center">Disc</span>
          <span className="w-[15%] text-center">Rate</span>
          <span className="w-[15%] text-right">Amt</span>
        </div>

        <hr className="my-1" />

        <div className="space-y-2">
                  {bill?.items?.map((item) => (
                    <PrintItemRow key={item._id} item={item} />
                  ))}
        </div>

        <hr className="my-2 border-dashed" />

        {/* TOTAL SECTION */}
        <div className="text-xs space-y-1">
          <div className="flex justify-between">
            <span>Total</span>
            <span>{bill.total}</span>
          </div>

          <div className="flex justify-between">
            <span>Paid</span>
            <span>{bill.paid}</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Due</span>
            <span>{bill.due}</span>
          </div>
        </div>

        <hr className="my-2 border-dashed" />

        {/* FOOTER */}
        <div className="text-center text-xs mt-2">
          <p>Thank You! Visit Again</p>
        </div>

      </div>
    </div>
  );
}
