import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import NewItem from "./pages/NewItem";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import TableManager from "./pages/TableManager";
import "./style.css";

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={<NewOrder></NewOrder>}
            path="/neworder/:restaurantID"
          />
          {/* Rutas protegidas */}
          <Route
            path="/orders"
            element={
              <PrivateRoute>
                <Orders></Orders>
              </PrivateRoute>
            }
          />
          <Route
            path="/newitem"
            element={
              <PrivateRoute>
                <NewItem></NewItem>
              </PrivateRoute>
            }
          />
          <Route
            path="/tables"
            element={
              <PrivateRoute>
                <TableManager></TableManager>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
