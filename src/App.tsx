import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from "./components/login";
import { PublicRoute } from "./components/public-route";
import { PrivateRoute } from "./components/private-route";
import { Dashboard } from "./components/dashboard";
import { NotFound } from "./components/not-found";

function App() {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <PublicRoute>
                                <Login />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/dashboard"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />

                    <Route path="/*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </>
    );
}

export default App;
