import { RentalCard } from "../components/RentalCard";
import { EmptyState } from "../components/EmptyState";

export function RentalsPage({ rentals, books, onExtendRental }) {
    if (rentals.length === 0) {
        return (
            <EmptyState
                title="Aún no tienes alquileres"
                text="Ve al catálogo, entra al detalle y alquila un libro."
            />
        );
    }

    return (
        <div>
            <h2 style={{ margin: "0 0 10px" }}>Mis alquileres</h2>

            <div style={{ display: "grid", gap: 12 }}>
                {rentals.map((r) => {
                    const book = books.find((b) => b.id === r.bookId);
                    return (
                        <RentalCard
                            key={r.rentalId}
                            rental={r}
                            book={book}
                            onExtend={onExtendRental}
                        />
                    );
                })}
            </div>
        </div>
    );
}