import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

export default function StickerGenerator() {

  const navigate = useNavigate();
  const stickerRef = useRef();

  const [product, setProduct] = useState("");
  const [design, setDesign] = useState("");
  const [rate, setRate] = useState();
  const [extra, setExtra] = useState();
  const [layout, setLayout] = useState(1);

  const mrp = rate + (rate * extra / 100);

  const barcode = "";

  const downloadSticker = async () => {

    const element = stickerRef.current;

    const canvas = await html2canvas(element, { scale: 3 });

    const imgData = canvas.toDataURL("image/png");

  

const stickerWidth = 60;
const stickerHeight = 40;

const pageHeight = stickerHeight * layout;

const pdf = new jsPDF({
  orientation: "portrait",
  unit: "mm",
  format: [stickerWidth, pageHeight]
});

let positions = [];

for (let i = 0; i < layout; i++) {
  positions.push([0, i * stickerHeight]);
}

positions.forEach(pos => {
  pdf.addImage(imgData, "PNG", pos[0], pos[1], stickerWidth, stickerHeight);
});
    pdf.save("stickers.pdf");
  };

  return (

    <div className="min-h-screen bg-gray-100 p-4">

      <button
        onClick={() => navigate("/")}
        className="text-green-600 text-sm hover:underline mb-4"
      >
        ← Back
      </button>

      <div className="max-w-xl mx-auto">

        <h1 className="text-xl font-semibold text-gray-800 mb-4">
          Sticker Generator
        </h1>

        {/* INPUT */}
        <div className="bg-white rounded-xl shadow p-4 space-y-3 mb-6">

          <input
            type="text"
            placeholder="Product Name"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="text"
            placeholder="Design"
            value={design}
            onChange={(e) => setDesign(e.target.value)}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="number"
            placeholder="Rate"
            value={rate}
            onChange={(e) => setRate(Number(e.target.value))}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          <input
            type="number"
            placeholder="Extra %"
            value={extra}
            onChange={(e) => setExtra(Number(e.target.value))}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          />

          {/* LAYOUT */}
          <select
            value={layout}
            onChange={(e) => setLayout(Number(e.target.value))}
            className="w-full h-11 px-3 border border-gray-300 rounded-lg"
          >
            <option value={1}>1 Sticker</option>
            <option value={2}>2 Stickers</option>
            <option value={4}>4 Stickers</option>
            <option value={6}>6 Sticker</option>
            <option value={8}>8 Sticker</option>
          </select>

        </div>

        {/* PREVIEW */}
        <div className="bg-white rounded-xl shadow p-6 flex justify-center mb-4">

          <div
            ref={stickerRef}
            className="border w-[240px] p-1.5 text-center bg-white"
          >

            <h2 className="font-bold text-xl tracking-wide leading-none -mt-1">
  KGN COLLECTION
</h2>

            {/* <hr className="my-1" /> */}

            <p className="text-[15px]">
              Product : {product || "-----"}
            </p>

            <p className="text-xs">
              Design : {design || "-----"}
            </p>

            <div className="my-0.25">

              <span className="text-xs">MRP: </span>

              <span className="text-lg font-bold">
                ₹{mrp.toFixed(0)}
              </span>

            </div>

            {/* Fake barcode */}
            <div className="mt-2">

              <div className="flex justify-center space-x-[2px] h-8 mb-0.25">
                {Array.from({ length: 40 }).map((_, i) => (
                  <div
                    key={i}
                    className={`bg-black ${Math.random() > 0.5 ? "w-[2px]" : "w-[1px]"
                      }`}
                  />
                ))}
              </div>

              <p className="text-[10px] tracking-widest">
                {barcode}
              </p>

            </div>

          </div>

        </div>

        {/* DOWNLOAD */}
        <button
          onClick={downloadSticker}
          className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow"
        >
          Download Sticker PDF
        </button>

      </div>

    </div>
  );
}