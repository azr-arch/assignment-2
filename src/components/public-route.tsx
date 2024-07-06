import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }: { children: React.ReactNode }) => {
    const user = localStorage.getItem("user");

    // If user is already logged in then redirect them to '/dashboard' route
    if (user) {
        return <Navigate to={"/dashboard"} replace />;
    }

    return <>{children}</>;
};
