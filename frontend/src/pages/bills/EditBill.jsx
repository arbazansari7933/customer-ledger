import { useState, useEffect } from "react";
import api from "../../utils/api";
import { useNavigate, useParams } from "react-router-dom";

export default function EditBill() {

  const navigate = useNavigate();
  const { id } = useParams();

  const [customer, setCustomer] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const [items, setItems] = useState([
    { itemName: "", qty: 1, mrp: 0, discount: 0 }
  ]);

  const [paid, setPaid] = useState(0);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const fetchBill = async () => {
      try {
        const res = await api.get(`/bills/${id}`);
        const bill = res.data.bill;

        setCustomer({
          name: bill.name,
          phone: bill.phone,
          address: bill.address
        });

        setItems(bill.items);
        setPaid(bill.paid);

      } catch (error) {
        console.log("Error fetching bill");
      } finally {
        setLoading(false);
      }
    };

    fetchBill();
  }, [id]);

  const handleCustomerChange = (e) => {
    setCustomer({
      ...customer,
      [e.target.name]: e.target.value
    });
  };

  const handleItemChange = (index, e) => {
    const updated = [...items];
    updated[index][e.target.name] = e.target.value;
    setItems(updated);
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

  const handleSubmit = async (e) => {
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

      setIsSubmitting(true);

      await api.put(`/bills/${id}`, billData);

      navigate(`/bill/${id}`);

    } catch (error) {
      console.log(error.response?.data?.message || "Error updating bill");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return <p className="p-4 text-center">Loading...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">

      <div className="max-w-xl mx-auto">

        <h1 className="text-2xl font-semibold text-gray-800 mb-4">
          Edit Bill
        </h1>

        <form onSubmit={handleSubmit}>

          {/* Customer */}
          <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

            <p className="font-semibold text-gray-700">Customer Info</p>

            <input
              type="text"
              name="name"
              value={customer.name}
              onChange={handleCustomerChange}
              placeholder="Customer Name"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="text"
              name="phone"
              value={customer.phone}
              onChange={handleCustomerChange}
              placeholder="Phone"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            <input
              type="text"
              name="address"
              value={customer.address}
              onChange={handleCustomerChange}
              placeholder="Address"
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

          </div>


          {/* Items */}
          <div className="bg-white rounded-xl shadow p-4 mb-4">

            <p className="font-semibold text-gray-700 mb-3">Items</p>

            <div className="grid grid-cols-6 gap-2 text-xs font-semibold text-gray-500 mb-2">
              <p>Item</p>
              <p>Qty</p>
              <p>MRP</p>
              <p>Disc</p>
              <p>Rate</p>
              <p>Amt</p>
            </div>

            {items.map((item, index) => {

              const rate = calculateRate(item.mrp, item.discount);
              const amount = calculateAmount(item.qty, rate);

              return (
                <div key={index} className="grid grid-cols-6 gap-2 mb-3">

                  <input
                    name="itemName"
                    value={item.itemName}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm"
                  />

                  <input
                    name="qty"
                    type="number"
                    value={item.qty}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm"
                  />

                  <input
                    name="mrp"
                    type="number"
                    value={item.mrp}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm"
                  />

                  <input
                    name="discount"
                    type="number"
                    value={item.discount}
                    onChange={(e) => handleItemChange(index, e)}
                    className="border border-gray-300 rounded-lg p-2 text-sm"
                  />

                  <div className="flex items-center text-sm">
                    ₹{rate.toFixed(0)}
                  </div>

                  <div className="flex items-center font-semibold">
                    ₹{amount.toFixed(0)}
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


          {/* Summary */}
          <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

            <div className="flex justify-between">
              <p>Total</p>
              <p className="font-semibold">₹{total.toFixed(0)}</p>
            </div>

            <p>Paid</p>

            <input
              type="number"
              value={paid}
              onChange={(e) => setPaid(Number(e.target.value))}
              className="w-full h-11 px-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            />

            <div className="flex justify-between">
              <p>Due</p>
              <p className="font-semibold text-red-600">
                ₹{due.toFixed(0)}
              </p>
            </div>

          </div>

          <button
            disabled={isSubmitting}
            className="w-full py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg font-medium"
          >
            Update Bill
          </button>

        </form>

      </div>
    </div>
  );
}