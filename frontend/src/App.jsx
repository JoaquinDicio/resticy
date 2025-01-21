import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import TableManager from "./pages/TableManager";
import AllItems from "./pages/AllItems";
import LandingPage from "./pages/LandingPage";
import "./style.css";


//Animaciones en toda la app
import AOS from 'aos';
import 'aos/dist/aos.css';

AOS.init({
  duration: 700,
  delay: 100,
  once: false,
});

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route element={<NewOrder />} path="/neworder/:restaurantID" />
          <Route element={<LandingPage />} path="/" />

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
            path="/tables"
            element={
              <PrivateRoute>
                <TableManager></TableManager>
              </PrivateRoute>
            }
          />
          <Route
            path="/allItems"
            element={
              <PrivateRoute>
                <AllItems></AllItems>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
