export default function ItemCard({ item }) {
  return (
    <div className="border-b px-3 py-2 text-sm flex justify-between items-center">

      <span className="w-[20%] truncate font-medium">
        {item.itemName}
      </span>

      <span className="w-[10%] text-center">
        {item.qty}
      </span>

      <span className="w-[15%] text-center">
        ₹{item.mrp}
      </span>

      <span className="w-[15%] text-center text-green-600">
        -{item.discount}%
      </span>

      <span className="w-[15%] text-center">
        ₹{item.finalRate}
      </span>

      <span className="w-[15%] text-right font-semibold">
        ₹{item.amount}
      </span>

    </div>
  );
}
