export function RentalCard({ rental, book, onExtend }) {
    return (
        <div className="card">
            <div style={{ fontWeight: 900 }}>{book?.title ?? "Libro"}</div>
            <div style={{ color: "#555", marginTop: 6 }}>
                Vence: <b>{new Date(rental.dueDate).toLocaleDateString()}</b> • Extensiones: {rental.extensionsCount}
            </div>

            <div style={{ marginTop: 10, display: "flex", gap: 10, flexWrap: "wrap" }}>
                <button className="btn btn--primary" onClick={() => onExtend(rental.rentalId)}>
                    Extender 7 días
                </button>
            </div>
        </div>
    );
}