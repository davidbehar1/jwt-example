import { ReactNode } from "react";
import { Route, Navigate } from "react-router-dom";

export const PrivateRoute = ({ element, authed, path }: { element: ReactNode, authed: boolean, path: string }) => {
    return (
        <Route
            path={path}
            element={authed === true
                ? element
                : <Navigate to={{ pathname: '/login' }} />
            }
        />
    )
}