import { useState } from "react";
import api from "../../utils/api";
import { useNavigate } from "react-router-dom";
import Scanner from "../../components/Scanner"; // adjust path
import { useRef } from "react";
import BottomNavbar from "../../components/BottomNavbar";



export default function AddBill() {
  const lastScanRef = useRef("");

  const navigate = useNavigate();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [items, setItems] = useState([]);

  const [mode, setMode] = useState("scan");

  const [paid, setPaid] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const beepRef = useRef(new Audio("/beep.mp3"));

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };


  const handleItemChange = (index, e) => {
    const updatedItems = [...items];
    updatedItems[index][e.target.name] = e.target.value;
    setItems(updatedItems);
  };

  const addItem = () => {
    setItems([
      ...items,
      { itemName: "", qty: 1, mrp: 0, discount: 0 }
    ]);
  };
  // remove
  const removeItem = (index) => {
  setItems((prev) => prev.filter((_, i) => i !== index));
};

  const calculateRate = (mrp, discount) => {
    return mrp - (mrp * discount / 100);
  };

  const calculateAmount = (qty, rate) => {
    return qty * rate;
  };

  const total = items.reduce((sum, item) => {
    const rate = calculateRate(Number(item.mrp), Number(item.discount));
    const amount = calculateAmount(Number(item.qty), rate);
    return sum + amount;
  }, 0);

  const due = total - paid;

  // filling the item section
  const addToCart = (product) => {
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product._id
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, qty: item.qty + 1 }
            : item
        );
      }

      const finalRate =
        product.price - (product.price * product.discount) / 100;

      return [
        ...prev,
        {
          productId: product._id,
          itemName: product.name,
          mrp: product.price,
          discount: product.discount,
          qty: 1
        },
      ];
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (isSubmitting) return;

    const processedItems = items.map(item => {
      const rate = calculateRate(Number(item.mrp), Number(item.discount));
      const amount = calculateAmount(Number(item.qty), rate);

      return {
        ...item,
        finalRate: rate,
        amount
      };
    });

    const billData = {
      ...customer,
      items: processedItems,
      total,
      paid,
      due
    };

    try {
      setIsSubmitting(true);

      const res = await api.post("/bills", billData);

      console.log("Bill Created:", res.data);

      navigate("/bills");

    } catch (error) {
      console.log(error.response?.data?.message || "Error creating bill");
    } finally {
      setIsSubmitting(false);
    }
  };
  // fetching details from scanner 
  const scanLockRef = useRef(false);

  const handleScan = async (code) => {
  if (scanLockRef.current) return;
  scanLockRef.current = true;

  try {
    const res = await api.get(`/products/${code}`);
    addToCart(res.data.product);

    //  PLAY BEEP
    beepRef.current.currentTime = 0;
    beepRef.current.play().catch(() => {});

  } catch {
    alert("Product not found");
  }

  setTimeout(() => {
    scanLockRef.current = false;
  }, 800);
};

  return (

<div className="min-h-screen bg-gray-100 px-4 py-6 pb-20">

      <div className="max-w-xl mx-auto">


        <div className="flex items-center justify-between mb-4">

          <h1 className="text-2xl font-semibold text-gray-800">
            Create Bill
          </h1>

          {/* Toggle */}
          <div
            onClick={() =>
              setMode(mode === "scan" ? "manual" : "scan")
            }
            className="relative w-48 h-12 bg-green-500 rounded-full overflow-hidden cursor-pointer"
          >
            {/* Slider */}
            <div
              className={`absolute top-0 left-0 h-full w-1/2 bg-white rounded-full shadow-md transition-transform duration-300
        ${mode === "scan" ? "translate-x-full" : ""}
      `}
            />

            {/* Text */}
            <div className="relative z-10 grid grid-cols-2 h-full text-sm font-semibold">
              <span
                className={`flex items-center justify-center
          ${mode === "manual" ? "text-green-600" : "text-white"}
        `}
              >
                Manual
              </span>

              <span
                className={`flex items-center justify-center
          ${mode === "scan" ? "text-green-600" : "text-white"}
        `}
              >
                Scan
              </span>
            </div>
          </div>

        </div>

        <form onSubmit={handleSubmit}>

          {/* Customer Section */}
          <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

            <p className="font-semibold text-gray-700">Customer Info</p>

            <input
              type="text"
              name="name"
              placeholder="Customer Name"
              value={customer.name}
              onChange={handleCustomerChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="text"
              name="phone"
              placeholder="Phone"
              value={customer.phone}
              onChange={handleCustomerChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="text"
              name="address"
              placeholder="Address"
              value={customer.address}
              onChange={handleCustomerChange}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            />

          </div>

          {/* Items Section */}
          <div className="bg-white rounded-xl shadow p-4 mb-4">

           <p className="font-semibold text-gray-800 mb-3">Scan Product</p>

{mode === "scan" && (
  <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 mb-4">

    {/* HEADER */}
    <div className="flex justify-between items-center mb-3">
      <p className="text-sm text-gray-600">
        📷 Align QR code inside the box
      </p>

      
    </div>

    {/* SCANNER BOX */}
    <div className="rounded-lg overflow-hidden border border-gray-300">
      <Scanner onScanSuccess={handleScan} />
    </div>

  </div>
)}
<br></br>
            {/* Header Row */}
            <div className="grid grid-cols-[1.5fr_0.8fr_1.2fr_0.8fr_1fr_1fr_0.5fr]  mb-2 text-xs font-semibold text-gray-500 border-b pb-2">
              <div className="px-2">Item</div>
              <div className="text-center px-2">Qty</div>
              <div className="text-center px-2">MRP</div>
              <div className="text-center px-2">Disc%</div>
              <div className="text-center px-2">Rate</div>
              <div className="text-right px-2">Amount</div>
              <div></div>
            </div>

            

            {items.map((item, index) => {

              const rate = calculateRate(item.mrp, item.discount);
              const amount = calculateAmount(item.qty, rate);

              return (
                <div key={index} className="grid grid-cols-[1.3fr_0.6fr_1.1fr_0.3fr_1fr_1fr_0.4fr] gap-1 mb-2 items-center text-xs">

                  {mode === "manual" ? (
                    <input
                      name="itemName"
                      value={item.itemName}
                      onChange={(e) => handleItemChange(index, e)}
className="border p-2 text-xs w-full max-w-[90px] rounded-lg"
                 />
                  ) : (
<div
  title={item.itemName}
  className="text-sm px-2 truncate whitespace-nowrap overflow-hidden max-w-[90px]"
>
  {item.itemName}
</div>               )}

                  <input
                    name="qty"
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                    //disabled={mode === "scan"}
                    className="border border-gray-300 rounded-lg p-2 text-xs text-center  max-w-[25px]"
                  />

                  <input
                    name="mrp"
                    type="number"
                    value={item.mrp}
                    onChange={(e) => handleItemChange(index, e)}
                   // disabled={mode === "scan"}
className="border border-gray-300 rounded-lg p-2 text-xs text-center w-[50px]"                 />

                  <input
                    name="discount"
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, e)}
                    //disabled={mode === "scan"}
className="border border-gray-300 rounded-lg p-2 text-xs text-center max-w-[35px]"
                  />

                  <div className="text-center text-xs text-gray-700 font-mono">
                    ₹{rate.toFixed(0)}
                  </div>

                  <div className="text-center font-semibold text-sm text-gray-800 font-mono">
                    ₹{amount.toFixed(0)}
                  </div>
                  <button
  type="button"
  onClick={() => removeItem(index)}
  className="text-red-500 hover:text-red-700 text-sm"
>
  ✕
</button>

                </div>
                
              );
              
            })}

            {mode === "manual" && (
              <button
                type="button"
                onClick={addItem}
                className="mt-2 text-green-600 text-sm hover:underline"
              >
                + Add Item
              </button>
            )}

          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

            <p className="font-semibold text-gray-700">Summary</p>

            <div className="flex justify-between text-gray-600">
              <p>Total</p>
              <p className="font-semibold text-gray-800">
                ₹{total.toFixed(0)}
              </p>
            </div>
            <div className="flex justify-between text-gray-600 ">
              <p>Paid</p>

              <input
                type="number"
                placeholder="Paid Amount"
                value={paid}
                onChange={(e) => setPaid(Number(e.target.value))}
                className="w-3s0 h-8 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
              />
            </div>

            <div className="flex justify-between">
              <p className="text-gray-600">Due</p>
              <p className="font-semibold text-red-600">
                ₹{due.toFixed(0)}
              </p>
            </div>

          </div>

          <button
            disabled={isSubmitting}
            type="submit"
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium shadow transition"
          >
            Create Bill
          </button>

        </form>

      </div>
      <BottomNavbar />
    </div>
  );
}