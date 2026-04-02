import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import MainLayout from "./layouts/MainLayout";
import ProtectedRoutes from "./Components/ProtectedRoutes";

import Login from "./pages/Login";
import SignUp from "./pages/Sign_up";

// Buyer Pages
import BuyerDashboard from "./pages/Buyer_Dashboard";
import SearchResultPage from "./pages/searchResult_page";
import Profile from "./pages/profile";
import Medicines from "./pages/Medicines";
import PrescriptionPage from "./pages/Prescription";
import Cart from "./pages/Cart";

// Seller Pages
import SellerDashboard from "./pages/Seller_Dashboard";
import Customers from "./pages/Customers";

export default function App() {
  return (
    <>
      <Routes>
        {/* Public Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        {/* Buyer Routes (Protected) */}
        <Route element={<ProtectedRoutes allowedRoles={["buyer"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<BuyerDashboard />} />
            <Route path="/medicines" element={<Medicines />} />
            <Route path="/search" element={<SearchResultPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/prescription" element={<PrescriptionPage />} />
            <Route path="/profile" element={<Profile />} />
          </Route>
        </Route>

        {/* Seller Routes (Protected) */}
        <Route element={<ProtectedRoutes allowedRoles={["seller"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/seller/dashboard" element={<SellerDashboard />} />
            <Route path="/seller/inventory" element={<div style={{padding: '24px'}}><h2>Inventory Management</h2><p>Coming Soon</p></div>} />
            <Route path="/seller/customers" element={<Customers />} />
            <Route path="/seller/sales" element={<div style={{padding: '24px'}}><h2>Sales Tracking</h2><p>Coming Soon</p></div>} />
            <Route path="/seller/low-stock" element={<div style={{padding: '24px'}}><h2>Low Stock Alerts</h2><p>Coming Soon</p></div>} />
            <Route path="/seller/notifications" element={<div style={{padding: '24px'}}><h2>Notifications</h2></div>} />
          </Route>
        </Route>

        {/* Admin Routes (Protected) */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<div style={{padding: '24px'}}><h1>Super Admin Dashboard</h1><p>Platform statistics and controls will live here.</p></div>} />
            <Route path="/admin/pharmacies" element={<div style={{padding: '24px'}}><h2>Pharmacy Approvals</h2><p>Coming Soon</p></div>} />
            <Route path="/admin/users" element={<div style={{padding: '24px'}}><h2>User Management</h2><p>Coming Soon</p></div>} />
          </Route>
        </Route>

        {/* Catch-all redirect to sign-up for new/unauthenticated users */}
        <Route path="*" element={<Navigate to="/sign-up" replace />} />
      </Routes>
    </>
  );
}
