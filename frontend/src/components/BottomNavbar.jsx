import { Link, useLocation } from "react-router-dom";
import { Home, Users, PlusCircle, FileText, BarChart3 } from "lucide-react";
export default function BottomNavbar() {
  const location = useLocation();

const navItems = [
  { to: "/", icon: Home, label: "Home" },
  { to: "/customers", icon: Users, label: "Customers" },
  { to: "/add-bill", icon: PlusCircle, label: "Bill" },   // better icon
  { to: "/bills", icon: FileText, label: "Bills" },       // list icon
  { to: "/reports", icon: BarChart3, label: "Reports" },  // correct match
];

  return (
    <div className="fixed bottom-0 left-0 w-full bg-white border-t shadow-md z-50">

      <div className="flex justify-around items-center py-2">

        {navItems.map((item, index) => {
          const isActive = location.pathname === item.to;
          const Icon = item.icon;

          return (
            <Link
              key={index}
              to={item.to}
              className={`flex flex-col items-center text-xs ${
                isActive ? "text-green-600" : "text-gray-500"
              }`}
            >
              <Icon size={22} />
              <span>{item.label}</span>
            </Link>
          );
        })}

      </div>
    </div>
  );
}