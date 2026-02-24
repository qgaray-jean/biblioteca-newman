import { NavLink } from "react-router-dom";

export function Navbar() {
    const linkClass = ({ isActive }) =>
        "navbar__link" + (isActive ? " navbar__link--active" : "");

    return (
        <header className="navbar">
            <div className="container mx-auto flex items-center justify-between gap-4 py-3.5">
                <div className="navbar__brand">📚 Biblioteca Online</div>
                <nav className="flex flex-wrap gap-3">
                    <NavLink to="/" className={linkClass}>Inicio</NavLink>
                    <NavLink to="/catalog" className={linkClass}>Catálogo</NavLink>
                    <NavLink to="/rentals" className={linkClass}>Mis alquileres</NavLink>
                    <NavLink to="/admin" className={linkClass}>Admin</NavLink>
                </nav>
            </div>
        </header>
    );
}
