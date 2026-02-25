import React from 'react';
import { NavLink } from 'react-router-dom';

export function Navbar() {
  const links = [
    { to: "/", label: "Catálogo" },
    { to: "/rentals", label: "Mis Alquileres" },
    { to: "/about", label: "Acerca de" },
    { to: "/admin", label: "Admin" },
  ];

  return (
    <nav className="navbar">
      <NavLink className="navbar__brand" to="/">
        📖 <span>Biblioteca</span> Newman
      </NavLink>
      <ul className="navbar__links">
        {links.map(l => (
          <li key={l.to}>
            <NavLink
              to={l.to}
              className={({ isActive }) => `navbar__link${isActive ? " navbar__link--active" : ""}`}
            >
              {l.label}
            </NavLink>
          </li>
        ))}
      </ul>
    </nav>
  );
}
