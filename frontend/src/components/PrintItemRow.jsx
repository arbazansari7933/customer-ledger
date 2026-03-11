export default function PrintItemRow({ item }) {
  return (
    <div className="flex text-[9px] leading-tight">
      <span className="w-[25%] ">
        {item.itemName}
      </span>

      <span className="w-[7%] text-center">
        {item.qty}
      </span>

      <span className="w-[15%] text-center">
        {item.mrp.toFixed(2)}
      </span>

      <span className="w-[15%] text-center">
        {item.discount}%
      </span>

      <span className="w-[30%] text-center">
        {item.finalRate.toFixed(2)}
      </span>

      <span className="w-[15%] text-right font-semibold">
        {item.amount.toFixed(2)}
      </span>
    </div>
  );
}
