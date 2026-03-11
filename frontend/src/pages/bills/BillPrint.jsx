import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../../utils/api";
import PrintItemRow from "../../components/PrintItemRow";

import jsPDF from "jspdf";
import html2canvas from "html2canvas";

export default function BillPrint() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [bill, setBill] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(true);

  const printRef = useRef();

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

  const generatePDF = async () => {

    const element = printRef.current;

    const canvas = await html2canvas(element, {
      scale: 2
    });

    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", [80, canvas.height * 0.264583]);

    const imgWidth = 80;
    const imgHeight = canvas.height * 0.264583;

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);

    pdf.save(`bill-${id}.pdf`);
  };

  if (loading) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  if (!bill) {
    return (
      <div className="p-4 text-center text-red-500">
        {message || "Bill not found"}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center py-6">

      {/* BUTTONS */}
      <div className="flex gap-3 mb-4">

        <button
          onClick={() => navigate(-1)}
          className="bg-gray-500 text-white px-4 py-2 rounded-lg"
        >
          Back
        </button>

        <button
          onClick={generatePDF}
          className="bg-green-600 text-white px-4 py-2 rounded-lg shadow hover:bg-green-700"
        >
          Generate / Print PDF
        </button>

      </div>

      {/* RECEIPT */}
      <div
        ref={printRef}
        className="bg-white w-[220px] p-3 shadow text-[12px] font-mono leading-tight"
      >

        {/* SHOP HEADER */}
        <div className="text-center">
          <h1 className="text-lg font-bold tracking-wide">
            KGN COLLECTION
          </h1>
          <p>Complete Family Mall & Wholesale</p>
          <p>Main Road Maskedih</p>
          <p>Mob: 8298188469</p>
        </div>

        <hr className="my-2 border-dashed" />

        {/* BILL INFO */}
        <div className="space-y-1">
          <p>Bill ID: {id}</p>
          <p>Name: {bill.name}</p>
          <p>Phone: {bill.phone}</p>
          <p>Date: {new Date(bill.date).toLocaleDateString()}</p>
        </div>

        <hr className="my-2 border-dashed" />

        {/* ITEM HEADER */}
        <div className=" flex font-semibold">
          <span className="w-[25%]">Item</span>
          <span className="w-[7%] text-center">Q</span>
          <span className="w-[15%] text-center">MRP</span>
          <span className="w-[17%] text-center">Disc</span>
          <span className="w-[30%] text-center">Rate</span>
          <span className="w-[15%] text-right">Amt</span>
        </div>

        <hr className="my-1" />

        {/* ITEMS */}
        <div className="space-y-1">
          {bill?.items?.map((item) => (
            <PrintItemRow key={item._id} item={item} />
          ))}
        </div>

        <hr className="my-2 border-dashed" />

        {/* TOTAL */}
        <div className="space-y-1">

          <div className="flex justify-between">
            <span>Total</span>
            <span>₹ {Number(bill.total).toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span>Paid</span>
            <span>₹ {Number(bill.paid).toFixed(2)}</span>
          </div>

          <div className="flex justify-between font-bold">
            <span>Due</span>
            <span>₹ {Number(bill.due).toFixed(2)}</span>
          </div>

        </div>

        <hr className="my-2 border-dashed" />

        {/* FOOTER */}
        <div className="text-center mt-2">
          <p>Thank You! Visit Again</p>
        </div>
        <br />
        <br />
      </div>

    </div>
  );
}