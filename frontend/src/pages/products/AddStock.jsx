import { useState, useRef } from "react";
import { useForm } from "react-hook-form";
import api from "../../utils/api";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function AddStock() {

  const { register, handleSubmit, reset } = useForm();

  const [qr, setQr] = useState("");
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(0);

  const stickerRef = useRef();

  // 🔹 Submit Stock
  const onSubmit = async (data) => {
    try {
      const res = await api.post("/products", {
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

  //Print Stickers (PDF)
  const downloadSticker = async () => {
    const element = stickerRef.current;

    const canvas = await html2canvas(element, {
      scale: 6,
      backgroundColor: "#ffffff",
      useCORS: true,
      width: element.offsetWidth,
      height: element.offsetHeight,
    });

    const imgData = canvas.toDataURL("image/png");

    const labelWidth = 58;
    const labelHeight = 40;

    const pdf = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: [labelWidth, labelHeight],
    });

    pdf.addImage(imgData, "PNG", 0, 0, labelWidth, labelHeight);

    pdf.save(`${product.name}.pdf`);
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

          <select
            {...register("category", { required: true })}
            className="w-full border p-2 rounded"
          >
            <option value="">Select Category</option>
            <option value="Jeans">Jeans</option>
            <option value="Shirt">Shirt</option>
            <option value="Trouser">Trouser</option>
            <option value="Tshirt">T-Shirt</option>
            <option value="Saree">Saree</option>
            <option value="Frock">Frock</option>
            <option value="Suit">Suit</option>
          </select>

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


          {/* Sticker Preview */}
          <div className="bg-white rounded-xl shadow p-6 flex justify-center mb-4">
            <div
              ref={stickerRef}
              style={{
                width: "58mm",
                height: "40mm",
                background: "#fff",
                // border: "1px solid black",
                paddingTop: "0.5mm",
                paddingLeft: "3mm",
                paddingRight: "3mm",
                paddingBottom: "3mm",
                boxSizing: "border-box",
                display: "flex",
                flexDirection: "column",
              }}
            >
              {/* Shop Name */}
              <div
                style={{
                  fontSize: "23px",
                  fontWeight: "bold",
                  textAlign: "center",
                  transform: "translateX(-4px)",
                  // borderBottom: "1px solid #000",
                  paddingBottom: "3px",
                  marginBottom: "5px",
                  lineHeight: "1",
                }}
              >
                KGN COLLECTION
              </div>

              {/* Bottom row */}
              <div
                style={{
                  display: "flex",
                  flex: 1,
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                {/* Left: product + MRP */}
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    gap: "3px",
                    height: "100%",
                    maxWidth: "30mm",
                  }}
                >
                  <div
                    style={{
                      fontSize: "13px",
                      fontWeight: "600",
                      wordBreak: "break-word",
                      lineHeight: "1.3",
                      transform: "translateY(-16px)",

                    }}
                  >
                    {product.name}
                  </div>
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      gap: "0px",
                    }}
                  >
                    <div
                      style={{
                        fontSize: "11px",
                        color: "#555",
                        lineHeight: "1",
                        transform: "translateY(-3px)",
                      }}
                    >
                      MRP
                    </div>

                    <div
                      style={{
                        fontSize: "39px",
                        fontWeight: "bold",
                        lineHeight: "0.8",
                        transform: "translateY(-6px)",
                      }}
                    >
                      ₹{product.price}
                    </div>
                  </div>
                </div>

                {/* QR */}
                <img
                  src={qr}
                  alt="QR"
                  style={{
                    width: "30mm",
                    height: "30mm",
                    objectFit: "contain",
                  }}
                />
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
      )
      }

    </div >
  );
}