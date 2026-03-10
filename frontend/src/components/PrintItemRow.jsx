export default function PrintItemRow({ item }) {
  return (
    <div className="flex text-xs leading-tight">
      <span className="w-[35%] truncate">
        {item.itemName}
      </span>

      <span className="w-[10%] text-center">
        {item.qty}
      </span>

      <span className="w-[15%] text-center">
        {item.mrp}
      </span>

      <span className="w-[10%] text-center">
        {item.discount}%
      </span>

      <span className="w-[15%] text-center">
        {item.finalRate}
      </span>

      <span className="w-[15%] text-right font-semibold">
        {item.amount}
      </span>
    </div>
  );
}
