import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

import AboutApp from "./pages/AboutApp";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import PurchaseCalculator from "./pages/PurchaseCalculator";
import StickerGenerator from "./pages/StickerGenerator";
import AddStock from "./pages/AddStock";

import ProtectedRoute from "./components/ProtectedRoute";

import MainDashboard from "./pages/MainDashboard";
import Dashboard from "./pages/customers/Dashboard";
import AddCustomer from "./pages/customers/AddCustomer";
import CustomerDetails from "./pages/customers/CustomerDetails";
import AddTransaction from "./pages/customers/AddTransaction";
import EditCustomer from "./pages/customers/EditCustomer";
import TransactionDetails from "./pages/customers/TransactionDetails";
import EditTransaction from "./pages/customers/EditTransaction";

import WholesalerDashboard from "./pages/wholesalers/WholesalerDashboard";
import AddWholesaler from "./pages/wholesalers/AddWholesaler";
import WholesalerDetails from "./pages/wholesalers/WholesalerDetails";
import EditWholesaler from "./pages/wholesalers/EditWholesaler";
import AddTransactionWholesaler from "./pages/wholesalers/AddTransactionWholesaler";
import TransactionDetailsWholesaler from "./pages/wholesalers/TransactionDetailsWholesaler";
import EditTransactionWholesaler from "./pages/wholesalers/EditTransactionWholesaler";

import BillsDashboard from "./pages/bills/BillsDashboard";
import BillDetails from "./pages/bills/BillDetails";
import AddBill from "./pages/bills/AddBill";
import BillPrint from "./pages/bills/BillPrint";
import EditBill from "./pages/bills/EditBill";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Protected pages */}
        <Route path="/" element={<ProtectedRoute><MainDashboard /></ProtectedRoute>} />
        <Route path="/customers" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/add-customer" element={<ProtectedRoute><AddCustomer /></ProtectedRoute>} />
        <Route path="/customer-details/:id" element={<ProtectedRoute><CustomerDetails /></ProtectedRoute>} />
        <Route path="/customer/:id/add-transaction" element={<ProtectedRoute><AddTransaction /></ProtectedRoute>} />
        <Route path="/customer/:id/edit-customer" element={<ProtectedRoute><EditCustomer /></ProtectedRoute>} />
        <Route path="/transaction-detail/:transactionId" element={<ProtectedRoute><TransactionDetails></TransactionDetails></ProtectedRoute>} />
        <Route path="/transaction-detail/edit/:transactionId" element={<ProtectedRoute><EditTransaction /></ProtectedRoute>} />

        <Route path="/wholesalers" element={<ProtectedRoute><WholesalerDashboard /></ProtectedRoute>} />
        <Route path="/add-wholesaler" element={<ProtectedRoute><AddWholesaler /></ProtectedRoute>} />
        <Route path="/wholesaler-details/:id" element={<ProtectedRoute><WholesalerDetails /></ProtectedRoute>} />
        <Route path="/wholesaler/:id/edit-wholesaler" element={<ProtectedRoute><EditWholesaler /></ProtectedRoute>} />
        <Route path="/wholesaler/:id/add-transaction" element={<ProtectedRoute><AddTransactionWholesaler /></ProtectedRoute>} />
        <Route path="/wholesaler/transaction-detail/:transactionId" element={<ProtectedRoute><TransactionDetailsWholesaler></TransactionDetailsWholesaler></ProtectedRoute>} />
        <Route path="wholesaler/transaction-detail/edit/:transactionId" element={<ProtectedRoute><EditTransactionWholesaler /></ProtectedRoute>} />

        <Route path="/bills" element={<ProtectedRoute><BillsDashboard/></ProtectedRoute>} />
        <Route path="/bill/:id" element={<ProtectedRoute><BillDetails /></ProtectedRoute>} />
        <Route path="/add-bill" element={<ProtectedRoute><AddBill /></ProtectedRoute>} />
        <Route path="/bill-print/:id" element={<ProtectedRoute><BillPrint /></ProtectedRoute>} />
        <Route path="/bill/edit/:id" element={<ProtectedRoute><EditBill /></ProtectedRoute>} />

        <Route path="/about" element={<ProtectedRoute><AboutApp /></ProtectedRoute>} />
        <Route path="/reports" element={<ProtectedRoute><Reports /></ProtectedRoute>} />
        <Route path="/settings" element={<ProtectedRoute><Settings /></ProtectedRoute>} />
        <Route path="/purchase-calculator" element={<PurchaseCalculator />} />
        <Route path="/stickers" element={<ProtectedRoute><StickerGenerator/></ProtectedRoute>} />
        <Route path="/addstock" element={<ProtectedRoute><AddStock/></ProtectedRoute>} />


        {/* Redirect base route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
