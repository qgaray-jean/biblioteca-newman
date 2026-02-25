import React from 'react';
import { useApp } from '../context/AppContext';

export function Navbar() {
  const { page, setPage } = useApp();
  const links = [
    { id:"catalog", label:"Catálogo" },
    { id:"rentals", label:"Mis Alquileres" },
    { id:"about",   label:"Acerca de" },
    { id:"admin",   label:"Admin" },
  ];
  return (
    <nav className="navbar">
      <button className="navbar__brand" onClick={() => setPage({ name:"catalog" })}>
        📖 <span>Biblioteca</span> Newman
      </button>
      <ul className="navbar__links">
        {links.map(l => (
          <li key={l.id}>
            <button
              className={`navbar__link${page.name === l.id ? " navbar__link--active" : ""}`}
              onClick={() => setPage({ name: l.id })}
            >{l.label}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}
