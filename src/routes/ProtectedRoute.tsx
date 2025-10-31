import { useUserInfoQuery } from "@/redux/api/auth/auth.api";
import { Navigate, useLocation } from "react-router";
import { Loader2 } from "lucide-react";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { data: userInfo, isLoading, isError } = useUserInfoQuery({});
  const location = useLocation();

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // If not authenticated, redirect to login
  if (isError || !userInfo?.data) {
    return <Navigate to="/jolrong-login" state={{ from: location }} replace />;
  }

  // If authenticated, render children
  return <>{children}</>;
};

export default ProtectedRoute;