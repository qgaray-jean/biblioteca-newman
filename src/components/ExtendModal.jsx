import React, { useState } from 'react';

export function ExtendModal({ rental, onClose, onConfirm }) {
  const [days, setDays] = useState(7);
  const nd = new Date(rental.dueDate); nd.setDate(nd.getDate() + Number(days));
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Extender plazo</h3>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <p style={{ opacity:0.65, marginBottom:"1rem", fontSize:"0.9rem" }}><strong>{rental.bookTitle}</strong></p>
        <div className="form-group" style={{ marginBottom:"1rem" }}>
          <label>Días adicionales</label>
          <select value={days} onChange={e => setDays(Number(e.target.value))}>
            <option value={7}>+7 días</option>
            <option value={14}>+14 días</option>
            <option value={21}>+21 días</option>
          </select>
        </div>
        <p style={{ fontSize:"0.825rem", opacity:0.6 }}>Nueva fecha: <strong style={{ color:"var(--amber-dark)" }}>{nd.toLocaleDateString("es-ES",{day:"2-digit",month:"long",year:"numeric"})}</strong></p>
        <div className="modal__footer">
          <button className="btn btn--ghost btn--sm" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary btn--sm" onClick={() => onConfirm(days)}>Extender</button>
        </div>
      </div>
    </div>
  );
}
