import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Orders from "./pages/Orders";
import NewOrder from "./pages/NewOrder";
import AuthContextProvider from "./context/AuthContext";
import PrivateRoute from "./components/PrivateRoute";
import AllItems from "./pages/AllItems";
import LandingPage from "./pages/LandingPage";
import "./style.css";
import Success from "./pages/Success";
import Dashboard from "./pages/Dashboard";
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
          <Route path="/success" element={<Success />} />
          <Route path="/login" element={<Login />} />
          <Route
            element={<NewOrder />}
            path="/neworder/:restaurantID/:tableID"
          />
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
            path="/allItems"
            element={
              <PrivateRoute>
                <AllItems></AllItems>
              </PrivateRoute>
            }
          />
          <Route
            path="/statistics"
            element={
              <PrivateRoute>
                <Dashboard/>
              </PrivateRoute>
            }
          />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  );
}

export default App;
