import { getUser } from "./services/authorize";
import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
    const isAuthenticated = getUser();

  return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
} 

export default AdminRoute;