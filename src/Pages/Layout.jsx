import { useContext } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { AppContext } from "../Context/AppContext";

export default function Layout() {
    const { user, token, setUser, setToken } = useContext(AppContext);
    const navigate = useNavigate();
    async function handleLogout() {
        const res = await fetch("/api/logout", {
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`
            }
        });

        if(res.ok){
            setUser(null)
            setToken(null)
            localStorage.removeItem("token");
            navigate("/");
        }
    }


    return (
        <>
            <header className="bg-blue-600 text-white shadow-md sticky top-0 z-10">
                <nav className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
                    <Link
                        to="/"
                        className="font-semibold text-lg hover:text-blue-200 transition-colors"
                    >
                        Home
                    </Link>
                    {user ? (
                        <div className="flex gap-6">
                        <div className="text-gray-200"> Wecome back! {user.name}</div>
                        <button className="hover:text-blue-200" onClick={handleLogout}>Logout</button>
                        </div>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link to="/register" className="hover:text-blue-200">Register</Link>
                            <Link to="/login" className="hover:text-blue-200">Login</Link>
                        </div>
                    )
                    }
                </nav>
            </header>


            <main className="max-w-5xl mx-auto p-6">
                <Outlet />
            </main>
        </>
    );
}
