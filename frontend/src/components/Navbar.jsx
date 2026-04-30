import { Link } from "react-router-dom";
import { Settings } from "lucide-react";

export default function Navbar() {
  return (
    <div className="flex items-center justify-between px-4 py-3 bg-white shadow-sm border-b">

      {/* App Name */}
      <div>
        <h1 className="text-[20px] font-bold text-gray-800">
          KGN COLLECTION
        </h1>
        <p className="text-[11px] text-gray-500 whitespace-nowrap">
  Customer Ledger & Billing System
</p>
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-3">

        {/* Settings Icon */}
        <Link
          to="/settings"
          className="p-2 rounded-full hover:bg-gray-100 transition"
        >
          <Settings size={22} className="text-gray-600" />
        </Link>

      </div>

    </div>
  );
}