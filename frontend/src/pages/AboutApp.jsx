import { useNavigate } from "react-router-dom";

export default function AboutApp() {

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 p-4">

  {/* Back */}
  <button
    onClick={() => navigate(-1)}
    className="text-green-600 text-sm hover:underline mb-4"
  >
    ← Back
  </button>

  {/* Header */}
  <div className="bg-white rounded-xl shadow p-4 mb-4">
    <h1 className="text-xl font-semibold text-gray-800">
      About This App
    </h1>
    <p className="text-sm text-gray-500">
      KGN Collection • Smart POS & Inventory System
    </p>
  </div>

  {/* About */}
  <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-3">

    <p className="text-gray-700 text-sm leading-relaxed">
      This application is designed for 
      <span className="font-semibold"> KGN Collection </span>
      to manage daily shop operations in a fast, organized, and digital way.
    </p>

    <p className="text-gray-700 text-sm leading-relaxed">
      It replaces traditional notebook-based management by combining 
      billing, inventory, and customer credit tracking into a single system.
    </p>

    <p className="text-gray-700 text-sm leading-relaxed">
      The system is optimized for real shop usage with a focus on speed,
      simplicity, and minimal manual work.
    </p>

  </div>

  {/* Core Features */}
  <div className="bg-white rounded-xl shadow p-4 mb-4">

    <h2 className="font-semibold text-gray-800 mb-2">
      Core Features
    </h2>

    <ul className="text-sm text-gray-700 space-y-2">

      <li>• POS-based billing with QR scanning</li>
      <li>• Manual + scan-based product addition in billing</li>
      <li>• Automatic stock deduction after bill creation</li>
      <li>• Category-based inventory management</li>
      <li>• Add stock with QR sticker generation & printing</li>
      <li>• Smart product search (name, price)</li>

    </ul>

  </div>

  {/* Inventory & Stock */}
  <div className="bg-white rounded-xl shadow p-4 mb-4">

    <h2 className="font-semibold text-gray-800 mb-2">
      Inventory System
    </h2>

    <ul className="text-sm text-gray-700 space-y-2">

      <li>• Track products category-wise</li>
      <li>• View total stock count and total stock value</li>
      <li>• Low stock awareness through visual indicators</li>
      <li>• Real-time updates after billing</li>

    </ul>

  </div>

  {/* Customer Ledger */}
  <div className="bg-white rounded-xl shadow p-4 mb-4">

    <h2 className="font-semibold text-gray-800 mb-2">
      Customer Ledger
    </h2>

    <ul className="text-sm text-gray-700 space-y-2">

      <li>• Track customer dues (Udhar system)</li>
      <li>• Record payments and transactions</li>
      <li>• Maintain complete customer history</li>

    </ul>

  </div>

  {/* Reports */}
  <div className="bg-white rounded-xl shadow p-4 mb-4">

    <h2 className="font-semibold text-gray-800 mb-2">
      Reports & Insights
    </h2>

    <ul className="text-sm text-gray-700 space-y-2">

      <li>• Daily sales summary</li>
      <li>• Total due and collected payments</li>
      <li>• Bill history and tracking</li>
      <li>• Customer and transaction overview</li>

    </ul>

  </div>

  {/* Tech */}
  <div className="bg-white rounded-xl shadow p-4 mb-4">

    <h2 className="font-semibold text-gray-800 mb-2">
      Technology Used
    </h2>

    <ul className="text-sm text-gray-700 space-y-2">

      <li>• Frontend: React + Tailwind CSS</li>
      <li>• Backend: Node.js + Express</li>
      <li>• Database: MongoDB</li>
      <li>• QR/Barcode: html5-qrcode</li>

    </ul>

  </div>

  {/* Purpose */}
  <div className="bg-white rounded-xl shadow p-4 mb-4 space-y-2">

    <h2 className="font-semibold text-gray-800">
      Purpose
    </h2>

    <p className="text-gray-700 text-sm leading-relaxed">
      The goal of this app is to simplify shop management, reduce manual errors,
      and provide quick access to important business data.
    </p>

    <p className="text-gray-700 text-sm leading-relaxed">
      It is built for real-world usage with focus on speed, clarity,
      and ease of use for daily operations.
    </p>

  </div>

  {/* Footer */}
  <div className="text-center text-xs text-gray-500 mt-6 space-y-1">
    <p>Built for KGN Collection</p>
    <p className="text-gray-400">Developed by Arbaz Ansari</p>
  </div>

</div>
  );
}