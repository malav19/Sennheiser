import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";

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
import UserProfile from "./pages/UserProfile";
import AboutUS from "./pages/AboutUs";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
export default function App() {
  const [userType, setUserType] = useState();

  useEffect(() => {
    const storedUserData = JSON.parse(
      localStorage.getItem(process.env.REACT_APP_LOCALHOST_KEY)
    );
    console.log("user type in app jsx", userType);
    setUserType(storedUserData.userType);
  });

  return userType ? (
    <Router>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/forgot-password" element={<PasswordReset />} />
        <Route
          path="/admin/*"
          element={
            userType === "admin" ? (
              <AdminDashboard />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/orders"
          element={
            userType === "admin" ? (
              <AdminOrderDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/products"
          element={
            userType === "admin" ? (
              <AdminProductDetails />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route
          path="/admin/customers"
          element={
            userType === "admin" ? (
              <AdminCustomer />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />
        <Route path="/" element={<Dashboard />} />
        <Route path="/products/*" element={<ProductListPage />} />
        <Route path="/product/:productId" element={<ProductDetailPage />} />
        <Route path="/cart" element={<AddToCart />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/about" element={<AboutUS />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  ) : (
    <h2>Loading...</h2>
  );
}
