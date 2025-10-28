import { Link, Outlet } from "react-router-dom";

export default function Layout() {
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

                    <div className="flex items-center gap-4">
                        <Link to="/register" className="hover:text-blue-200">Register</Link>
                        <Link to="/login" className="hover:text-blue-200">Login</Link>
                    </div>
                </nav>
            </header>


            <main className="max-w-5xl mx-auto p-6">
                <Outlet />
            </main>
        </>
    );
}
