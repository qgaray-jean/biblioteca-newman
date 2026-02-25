import { useParams, Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";

export function BookDetailPage({ books, onRentClick }) {
    const { id } = useParams();
    const book = books.find((b) => b.id === id);

    if (!book) return <EmptyState title="Libro no encontrado" text="Revisa el catálogo." />;

    return (
        <div>
            <Link to="/catalog" className="text-gray-700">← Volver al catálogo</Link>

            <div className="card mt-3">
                <div className="flex gap-3.5 flex-wrap">
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        className="w-56 h-72 object-cover rounded-xl border border-gray-200"
                    />
                    <div className="flex-1 min-w-[260px]">
                        <h2 className="m-0 mb-2">{book.title}</h2>
                        <div className="text-gray-600">
                            <div><b>Autor:</b> {book.author}</div>
                            <div><b>Año:</b> {book.year}</div>
                            <div><b>Categoría:</b> {book.category}</div>
                            <div><b>Idioma:</b> {book.language}</div>
                            <div><b>ISBN10:</b> {book.isbn10}</div>
                            <div><b>ISBN13:</b> {book.isbn13}</div>
                        </div>

                        <p className="mt-3 text-gray-700">{book.synopsis}</p>

                        <button className="btn btn--primary mt-4" onClick={() => onRentClick(book.id)}>
                            Alquilar libro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}