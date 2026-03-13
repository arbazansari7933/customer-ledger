export default function ItemCard({ item }) {
  return (
    <div className="border-b px-3 py-2 text-[12px] flex justify-between items-center">

      <span className="w-[20%] truncate font-medium">
        {item.itemName}
      </span>

      <span className="w-[10%] text-center">
        {item.qty}
      </span>

      <span className="w-[15%] text-center">
        ₹{item.mrp.toFixed(0)}
      </span>

      <span className="w-[15%] text-center text-green-600">
        -{item.discount.toFixed(0)}%
      </span>

      <span className="w-[15%] text-center">
        ₹{item.finalRate.toFixed(0)}
      </span>

      <span className="w-[15%] text-right font-semibold">
        ₹{item.amount.toFixed(0)}
      </span>

    </div>
  );
}
