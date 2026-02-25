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
            <h2 className="m-0 mb-2.5">Mis alquileres</h2>

            <div className="grid gap-3">
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