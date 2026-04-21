import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import api from "../utils/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AddStock() {

  const { register, handleSubmit, reset } = useForm();

  const [qr, setQr] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);
  const [printCount, setPrintCount] = useState(1);

  const stickerRef = useRef();

  // 🔹 Submit Stock
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/product", {
        ...data,
        price: Number(data.price),
        discount: Number(data.discount || 0),
        gst: Number(data.gst || 0),
        quantity: Number(data.quantity),
      });

      setQr(res.data.qr);
      setProduct(res.data.product);
      setQuantity(res.data.quantity);

      reset();

      alert("Stock added successfully");

    } catch (err) {
      console.log(err.response?.data || err.message);
      alert("Error adding stock");
    }
  };

  // 🔹 Print Stickers (PDF)
  const downloadSticker = async () => {
    const element = stickerRef.current;

    const canvas = await html2canvas(element, { scale: 3 });
    const imgData = canvas.toDataURL("image/png");

    const stickerWidth = 60;
    const stickerHeight = 40;

    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [stickerWidth, stickerHeight * printCount],
    });

    for (let i = 0; i < printCount; i++) {
      pdf.addImage(
        imgData,
        "PNG",
        0,
        i * stickerHeight,
        stickerWidth,
        stickerHeight
      );
    }

    pdf.save("stickers.pdf");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">

      <div className="max-w-md mx-auto bg-white p-4 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-4">
          Add Stock
        </h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">

          <input
            {...register("name", { required: true })}
            placeholder="Product Name"
            className="w-full border p-2 rounded"
          />

          <input
            {...register("category")}
            placeholder="Category"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            {...register("price", { required: true })}
            placeholder="Price"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            {...register("discount")}
            placeholder="Discount %"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            {...register("gst")}
            placeholder="GST %"
            className="w-full border p-2 rounded"
          />

          <input
            type="number"
            {...register("quantity", { required: true })}
            placeholder="Quantity"
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-green-600 text-white p-2 rounded">
            Add Stock
          </button>

        </form>

      </div>

      {/* 🔥 STICKER PREVIEW */}
      {qr && product && (
        <div className="mt-6 flex flex-col items-center">

          {/* Selector */}
          <select
            value={printCount}
            onChange={(e) => setPrintCount(Number(e.target.value))}
            className="mb-4 border p-2 rounded"
          >
            <option value={1}>1 Sticker</option>
            <option value={2}>2 Stickers</option>
            <option value={4}>4 Stickers</option>
            <option value={6}>6 Stickers</option>
            <option value={8}>8 Stickers</option>
          </select>

          {/* Sticker Preview */}
          <div className="bg-white rounded-xl shadow p-6 flex justify-center mb-4">

            <div
              ref={stickerRef}
              className="border w-[240px] p-2 text-center bg-white"
            >
              <h2 className="font-bold text-lg">
                KGN COLLECTION
              </h2>

              <p className="text-sm">
                {product.name}
              </p>

              <p className="font-bold text-lg">
                ₹{product.price}
              </p>

              <div className="flex justify-center mt-2">
                <img src={qr} alt="QR" className="w-24" />
              </div>
            </div>

          </div>

          {/* Print Button */}
          <button
            onClick={downloadSticker}
            className="bg-blue-600 text-white px-6 py-2 rounded"
          >
            Download Stickers PDF
          </button>

        </div>
      )}

    </div>
  );
}