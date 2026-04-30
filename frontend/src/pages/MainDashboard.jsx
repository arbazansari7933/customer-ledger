import Navbar from "../components/Navbar";
import BottomNavbar from "../components/BottomNavbar";
import DashboardCard from "../components/DashboardCard";

import {
  Users,
  Store,
  Receipt,
  BarChart3,
  Package,
  Tag,
  Calculator,
} from "lucide-react";

export default function MainDashboard() {

  const cards = [
  { to: "/customers", icon: Users, label: "Customers", color: "blue" },
  { to: "/wholesalers", icon: Store, label: "Wholesalers", color: "purple" },
  { to: "/bills", icon: Receipt, label: "Bills", color: "green" },
  { to: "/reports", icon: BarChart3, label: "Reports", color: "yellow" },
  { to: "/stocks", icon: Package, label: "Stocks", color: "pink" },
  { to: "/stickers", icon: Tag, label: "Stickers", color: "orange" },
  { to: "/purchase-calculator", icon: Calculator, label: "Purchase", color: "gray" },
];

  return (
    <div className="min-h-screen bg-gray-100 pb-16">

      {/* 🔥 Navbar */}
      <Navbar />

      {/* 🔥 Main Content */}
      <div className="p-4 grid grid-cols-2 gap-4">
        {cards.map((card, index) => (
          <DashboardCard key={index} {...card} />
        ))}
      </div>

      {/* 🔥 Bottom Navbar */}
      <BottomNavbar />
    </div>
  );
}