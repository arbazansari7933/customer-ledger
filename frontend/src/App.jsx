import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import Signup from "./pages/Signup";
import Login from "./pages/Login";

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



        {/* Redirect base route */}
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </BrowserRouter>
  );
}
