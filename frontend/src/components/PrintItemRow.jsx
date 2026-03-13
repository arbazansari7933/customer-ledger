export default function PrintItemRow({ item }) {
  return (
    <div className="flex text-[9px] leading-tight">
      <span className="w-[25%] ">
        {item.itemName}
      </span>

      <span className="w-[15%] text-center">
        {item.qty}
      </span>

      <span className="w-[15%] text-center">
        {item.mrp.toFixed(0)}
      </span>

      <span className="w-[15%] text-center">
        {item.discount}%
      </span>

      <span className="w-[15%] text-center">
        {item.finalRate.toFixed(0)}
      </span>

      <span className="w-[15%] text-right font-semibold">
        {item.amount.toFixed(0)}
      </span>
    </div>
  );
}
