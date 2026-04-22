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
import SellerInventory from "./pages/Seller_Inventory";
import SellerSales from "./pages/Seller_Sales";
import SellerLowStock from "./pages/Seller_LowStock";
import SellerNotifications from "./pages/Seller_Notifications";
import Customers from "./pages/Customers";

// Admin Pages
import AdminDashboard from "./pages/Admin_Dashboard";

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
            <Route path="/seller/inventory" element={<SellerInventory />} />
            <Route path="/seller/customers" element={<Customers />} />
            <Route path="/seller/sales" element={<SellerSales />} />
            <Route path="/seller/low-stock" element={<SellerLowStock />} />
            <Route path="/seller/notifications" element={<SellerNotifications />} />
          </Route>
        </Route>

        {/* Admin Routes (Protected) */}
        <Route element={<ProtectedRoutes allowedRoles={["admin"]} />}>
          <Route element={<MainLayout />}>
            <Route path="/admin/dashboard" element={<AdminDashboard key="admin-dash" defaultTab="pharmacies" />} />
            <Route path="/admin/pharmacies" element={<AdminDashboard key="admin-pharm" defaultTab="pharmacies" />} />
            <Route path="/admin/users" element={<AdminDashboard key="admin-users" defaultTab="buyers" />} />
          </Route>
        </Route>

        {/* Catch-all redirect to sign-up for new/unauthenticated users */}
        <Route path="*" element={<Navigate to="/sign-up" replace />} />
      </Routes>
    </>
  );
}
