export function RentalCard({ rental, book, onExtend }) {
    return (
        <div className="card">
            <div className="font-black">{book?.title ?? "Libro"}</div>
            <div className="text-gray-600 mt-1.5">
                Vence: <b>{new Date(rental.dueDate).toLocaleDateString()}</b> • Extensiones: {rental.extensionsCount}
            </div>

            <div className="mt-2.5 flex gap-2.5 flex-wrap">
                <button className="btn btn--primary" onClick={() => onExtend(rental.rentalId)}>
                    Extender 7 días
                </button>
            </div>
        </div>
    );
}