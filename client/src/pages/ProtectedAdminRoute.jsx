import { useAppContext } from "../context/appContext";
import { Navigate } from "react-router-dom";

function ProtectedAdminRoute({ children }) {
  const { user } = useAppContext();
  if (user.role !== "admin") {
    return <Navigate to="/" />;
  }
  return children;
}

export default ProtectedAdminRoute;
