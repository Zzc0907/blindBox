import { Outlet, useLocation } from "react-router-dom";
import Navbar from "./Navbar";

function Layout() {
    const location = useLocation();
    const hideNavbar = location.pathname === "/login" || location.pathname === "/register";

    return (
        <>
            {!hideNavbar && <Navbar />}
            <main className="p-4">
                <Outlet />
            </main>
        </>
    );
}

export default Layout;
