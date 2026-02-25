import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ExtendModal } from '../components/ExtendModal';

export function RentalsPage() {
  const { rentals, extend, returnBook, addToast } = useApp();
  const [extTarget, setExtTarget] = useState(null);
  const [filter, setFilter] = useState("all");

  const shown = filter==="all" ? rentals : rentals.filter(r => r.status===filter);
  const counts = { active:0, overdue:0, returned:0 };
  rentals.forEach(r => counts[r.status] = (counts[r.status]||0) + 1);

  return (
    <div className="rentals-page page">
      <div className="container">
        <h2 className="section-title">Mis Alquileres</h2>
        <p className="section-subtitle">Historial y gestión de tus préstamos</p>

        <div className="rentals-stats">
          {[
            { label:"Total", value:rentals.length, color:"var(--amber-dark)" },
            { label:"En curso", value:counts.active||0, color:"var(--sage)" },
            { label:"Vencidos", value:counts.overdue||0, color:"var(--rust)" },
            { label:"Devueltos", value:counts.returned||0, color:"#999" },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-card__value" style={{ color:s.color }}>{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="filters" style={{ borderRadius:"var(--radius-lg) var(--radius-lg) 0 0", marginBottom:0 }}>
          {["all","active","overdue","returned"].map(f => (
            <button key={f} className={`filters__chip${filter===f?" filters__chip--active":""}`} onClick={() => setFilter(f)}>
              {{all:"Todos",active:"En curso",overdue:"Vencidos",returned:"Devueltos"}[f]}
            </button>
          ))}
        </div>

        {shown.length===0
          ? <div style={{ background:"#fff", borderRadius:"0 0 var(--radius-lg) var(--radius-lg)", padding:"3.5rem 2rem", textAlign:"center", opacity:0.45 }}>
              <div style={{ fontSize:"2.2rem", marginBottom:"0.6rem" }}>📭</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"1rem" }}>No hay alquileres en esta categoría</div>
            </div>
          : <div style={{ overflowX:"auto" }}>
              <table className="rental-table">
                <thead>
                  <tr><th>Libro</th><th>Lector</th><th>Alquilado</th><th>Devolución</th><th>Estado</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                  {shown.map(r => (
                    <tr key={r.id}>
                      <td><strong style={{ fontFamily:"var(--font-display)" }}>{r.bookTitle}</strong><br /><span style={{ fontSize:"0.78rem", opacity:0.55 }}>{r.bookAuthor}</span></td>
                      <td>{r.userName}</td>
                      <td>{new Date(r.rentedAt).toLocaleDateString("es-ES")}</td>
                      <td style={{ color:r.status==="overdue"?"var(--rust)":"inherit", fontWeight:r.status==="overdue"?600:400 }}>{new Date(r.dueDate).toLocaleDateString("es-ES")}</td>
                      <td><span className={`status-badge status-badge--${r.status}`}>{{active:"Activo",overdue:"Vencido",returned:"Devuelto"}[r.status]}</span></td>
                      <td>
                        {r.status!=="returned" && (
                          <div style={{ display:"flex", gap:"0.4rem" }}>
                            <button className="btn btn--outline btn--sm" onClick={() => setExtTarget(r)}>Extender</button>
                            <button className="btn btn--ghost btn--sm" onClick={() => { returnBook(r.id); addToast(`"${r.bookTitle}" devuelto`, "info"); }}>Devolver</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>
      {extTarget && <ExtendModal rental={extTarget} onClose={() => setExtTarget(null)} onConfirm={days => { extend(extTarget.id, days); addToast(`Plazo extendido ${days} días`,"success"); setExtTarget(null); }} />}
    </div>
  );
}
