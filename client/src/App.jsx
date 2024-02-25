<<<<<<< HEAD
=======
// App.jsx

>>>>>>> 808dd19a (Committing untracked files before switching branches)
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
<<<<<<< HEAD
=======
import PasswordReset from "./pages/PasswordReset";
>>>>>>> 808dd19a (Committing untracked files before switching branches)

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
>>>>>>> 808dd19a (Committing untracked files before switching branches)
      </Routes>
    </BrowserRouter>
  );
}
