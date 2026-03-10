import { useState } from "react";
import api from "../../uitls/api";
import { useNavigate } from "react-router-dom";
export default function AddBill() {
  const navigate = useNavigate();  
  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [items, setItems] = useState([
    { itemName: "", qty: 1, mrp: 0, discount: 0 }
  ]);

  const [paid, setPaid] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handleSubmit = (e) => {
    e.preventDefault();

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
      const res= api.post("/bills", billData);
      setIsSubmitting(true);
      navigate(`/bills`);
      console.log("Bill Created:", res.data);
    } catch (error) {
      console.log(error.response?.data?.message || "Error creating bill");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      <div className="max-w-xl mx-auto">

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Create Bill
        </h1>

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

            <p className="font-semibold text-gray-700 mb-3">Items</p>

            {items.map((item, index) => {

              const rate = calculateRate(item.mrp, item.discount);
              const amount = calculateAmount(item.qty, rate);

              return (
                <div key={index} className="grid grid-cols-6 gap-2 mb-3">

                  <input
                    name="itemName"
                    placeholder="Item"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  />

                  <input
                    name="qty"
                    type="number"
                    placeholder="Qty"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  />

                  <input
                    name="mrp"
                    type="number"
                    placeholder="MRP"
                    value={item.mrp}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  />

                  <input
                    name="discount"
                    type="number"
                    placeholder="Disc %"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-green-400 outline-none"
                  />

                  <div className="flex items-center text-sm text-gray-700">
                    ₹{rate.toFixed(2)}
                  </div>

                  <div className="flex items-center font-semibold text-gray-800">
                    ₹{amount.toFixed(2)}
                  </div>

                </div>
              );
            })}

            <button
              type="button"
              onClick={addItem}
              className="mt-2 text-green-600 text-sm hover:underline"
            >
              + Add Item
            </button>

          </div>

          {/* Payment Section */}
          <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

            <p className="font-semibold text-gray-700">Summary</p>

            <div className="flex justify-between text-gray-600">
              <p>Total</p>
              <p className="font-semibold text-gray-800">
                ₹{total.toFixed(2)}
              </p>
            </div>
            <p>Paid</p>
            <input
              type="number"
              placeholder="Paid Amount"
              value={paid}
              onChange={(e) => setPaid(Number(e.target.value))}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-green-400 outline-none"
            />

            <div className="flex justify-between">
              <p className="text-gray-600">Due</p>
              <p className="font-semibold text-red-600">
                ₹{due.toFixed(2)}
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
    </div>
  );
}