import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import PasswordReset from "./pages/PasswordReset";
import AdminDashboard from "./pages/AdminDashboard";
import AdminOrderDetails from "./pages/AdminOrderDetails";
import AdminProductDetails from "./pages/AdminProductDetails";
import AdminCustomer from "./pages/AdminCustomer";
import ProductListPage from "./pages/ProductList";
import ProductDetailPage from "./pages/ProductDetailPage";
import AddToCart from "./pages/AddToCart";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<PasswordReset />} />
        <Route path="/admin/*" element={<AdminDashboard />} />
        <Route path="/admin/orders" element={<AdminOrderDetails />} />
        <Route path="/admin/products" element={<AdminProductDetails />} />
        <Route path="/admin/customers" element={<AdminCustomer />} />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products/*" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<AddToCart />} />
      </Routes>
    </Router>
  );
}
