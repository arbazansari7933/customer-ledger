import { Link } from "react-router-dom";

export default function DashboardCard({ to, icon: Icon, label, color = "gray" }) {
  const colors = {
    blue: "bg-blue-100 text-blue-600",
    purple: "bg-purple-100 text-purple-600",
    green: "bg-green-100 text-green-600",
    yellow: "bg-yellow-100 text-yellow-600",
    pink: "bg-pink-100 text-pink-600",
    orange: "bg-orange-100 text-orange-600",
    gray: "bg-gray-100 text-gray-600",
  };

  return (
    <Link
      to={to}
      className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition flex items-center gap-3"
    >
      <div className={`p-2 rounded-lg ${colors[color]}`}>
        <Icon size={20} />
      </div>

      <p className="text-gray-700 font-medium text-sm">{label}</p>
    </Link>
  );
}