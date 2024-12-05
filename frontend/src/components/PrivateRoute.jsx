import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";
import PrivateHeader from "./PrivateHeader";

export default function PrivateRoute({ children }) {
  const { isAuth, logout } = useContext(AuthContext);

  if (isAuth) {
    return (
      <>
        <PrivateHeader logout={logout}></PrivateHeader>

        <div className="">{children}</div>
      </>
    );
  }

  return <Navigate to="/login" />;
}
