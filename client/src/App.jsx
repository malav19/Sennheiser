<<<<<<< HEAD
=======
// App.jsx

>>>>>>> master
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
=======
import PasswordReset from "./pages/PasswordReset";
>>>>>>> master

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
<<<<<<< HEAD
        <Route path="/" element={<Dashboard/>} />
=======
        <Route path="/forgot-password" element={<PasswordReset />} />
        <Route path="/" element={<Dashboard />} />
>>>>>>> master
      </Routes>
    </BrowserRouter>
  );
}
