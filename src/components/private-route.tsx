import { Navigate } from "react-router-dom";

export const PrivateRoute = ({ children }: { children: React.ReactNode }) => {
    const user = localStorage.getItem("user");

    // If user is not logged in then redirect them to '/' route
    if (!user) {
        return <Navigate to={"/?redirect=/dashboard"} replace />;
    }

    return <>{children}</>;
};
