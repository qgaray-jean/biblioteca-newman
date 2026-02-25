import React, { useState } from 'react';

export function RentalModal({ book, onClose, onConfirm }) {
  const [days, setDays] = useState(14);
  const [name, setName] = useState("");
  const due = new Date(); due.setDate(due.getDate() + Number(days));
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Alquilar libro</h3>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <p style={{ opacity:0.65, marginBottom:"1rem", fontStyle:"italic", fontSize:"0.9rem" }}>"{book.title}" — {book.author}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem", marginBottom:"1rem" }}>
          <div className="form-group">
            <label>Tu nombre</label>
            <input type="text" placeholder="Nombre del lector" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Duración</label>
            <select value={days} onChange={e => setDays(Number(e.target.value))}>
              <option value={7}>7 días</option>
              <option value={14}>14 días</option>
              <option value={21}>21 días</option>
              <option value={30}>30 días</option>
            </select>
          </div>
        </div>
        <p style={{ fontSize:"0.825rem", opacity:0.6 }}>Devolución: <strong style={{ color:"var(--amber-dark)" }}>{due.toLocaleDateString("es-ES",{day:"2-digit",month:"long",year:"numeric"})}</strong></p>
        <div className="modal__footer">
          <button className="btn btn--ghost btn--sm" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary btn--sm" disabled={!name.trim()} onClick={() => onConfirm({ book, days, name, dueDate:due })}>Confirmar alquiler</button>
        </div>
      </div>
    </div>
  );
}
