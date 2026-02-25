import { NavLink } from "react-router-dom";

export function Navbar() {
    const linkClass = ({ isActive }) =>
        "navbar__link" + (isActive ? " navbar__link--active" : "");

    return (
        <header className="navbar">
            <div className="navbar__inner">
                <div className="navbar__brand">📚 Biblioteca Newman</div>
                <nav className="navbar__links">
                    <NavLink to="/" className={linkClass}>
                        Inicio
                    </NavLink>
                    <NavLink to="/catalog" className={linkClass}>
                        Catálogo
                    </NavLink>
                    <NavLink to="/rentals" className={linkClass}>
                        Mis alquileres
                    </NavLink>
                    <NavLink to="/admin" className={linkClass}>
                        Admin
                    </NavLink>
                </nav>
            </div>
        </header>
    );
}
