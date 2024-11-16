import React from "react";
import { BrowserRouter, Route, Router, Routes } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import NewItem from "./pages/NewItem";
import "./style.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/neworder" element={<NewOrder />} />
        <Route path="/newitem" element={<NewItem />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
