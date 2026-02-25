import React, { useState } from 'react';
import { BOOKS_DB } from '../data/books';

export function AdminPage({ rentals }) {
  const [search, setSearch] = useState("");
  const filtered = BOOKS_DB.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn13.includes(search)
  );
  const activeFor = id => rentals.filter(r => r.bookId===id && r.status==="active").length;

  return (
    <div className="admin-page page">
      <div className="container">
        <h2 className="section-title">Panel de Administración</h2>
        <p className="section-subtitle">Gestión interna de la biblioteca</p>

        <div className="admin-notice">
          <span style={{ fontSize:"1.25rem" }}>⚠️</span>
          <div><strong>Área restringida</strong> — Sección destinada a la gestión y administración.</div>
        </div>

        <div className="rentals-stats">
          {[
            { label:"Libros", value:BOOKS_DB.length, color:"var(--amber-dark)" },
            { label:"Disponibles", value:BOOKS_DB.filter(b=>b.available).length, color:"var(--sage)" },
            { label:"Alquileres activos", value:rentals.filter(r=>r.status==="active").length, color:"var(--amber-dark)" },
            { label:"Total alquileres", value:rentals.length, color:"#666" },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-card__value" style={{ color:s.color }}>{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem", gap:"1rem", flexWrap:"wrap" }}>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.2rem" }}>Inventario</h3>
          <input type="text" placeholder="Filtrar…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding:"0.5rem 0.875rem", border:"1.5px solid var(--mist)", borderRadius:"var(--radius)", fontFamily:"var(--font-body)", outline:"none", minWidth:"200px" }} />
        </div>

        <div style={{ overflowX:"auto", marginBottom:"2rem" }}>
          <table className="admin-table">
            <thead>
              <tr><th>Título</th><th>Autor</th><th>Categoría</th><th>Año</th><th>ISBN-13</th><th>Stock</th><th>Alquilados</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td><strong style={{ fontFamily:"var(--font-display)" }}>{b.title}</strong></td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{b.year}</td>
                  <td><code style={{ fontSize:"0.78rem", background:"var(--mist)", padding:"0.1rem 0.4rem", borderRadius:"3px" }}>{b.isbn13}</code></td>
                  <td>{b.stock}</td>
                  <td>{activeFor(b.id)}</td>
                  <td><span className={`status-badge status-badge--${b.available?"active":"returned"}`}>{b.available?"Disponible":"Agotado"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rentals.length > 0 && (
          <>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.2rem", marginBottom:"1rem" }}>Últimos alquileres</h3>
            <div style={{ overflowX:"auto" }}>
              <table className="rental-table">
                <thead><tr><th>Libro</th><th>Lector</th><th>Alquilado</th><th>Devolución</th><th>Estado</th></tr></thead>
                <tbody>
                  {[...rentals].sort((a,b) => new Date(b.rentedAt)-new Date(a.rentedAt)).slice(0,10).map(r => (
                    <tr key={r.id}>
                      <td><strong style={{ fontFamily:"var(--font-display)" }}>{r.bookTitle}</strong></td>
                      <td>{r.userName}</td>
                      <td>{new Date(r.rentedAt).toLocaleDateString("es-ES")}</td>
                      <td>{new Date(r.dueDate).toLocaleDateString("es-ES")}</td>
                      <td><span className={`status-badge status-badge--${r.status}`}>{{active:"Activo",overdue:"Vencido",returned:"Devuelto"}[r.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
