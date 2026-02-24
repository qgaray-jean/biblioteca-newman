import { useParams, Link } from "react-router-dom";
import { EmptyState } from "../components/EmptyState";

export function BookDetailPage({ books, onRentClick }) {
    const { id } = useParams();
    const book = books.find((b) => b.id === id);

    if (!book) return <EmptyState title="Libro no encontrado" text="Revisa el catálogo." />;

    return (
        <div>
            <Link to="/catalog" style={{ color: "#444" }}>← Volver al catálogo</Link>

            <div className="card" style={{ marginTop: 12 }}>
                <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
                    <img
                        src={book.coverUrl}
                        alt={book.title}
                        style={{ width: 220, height: 300, objectFit: "cover", borderRadius: 14, border: "1px solid #eee" }}
                    />
                    <div style={{ flex: 1, minWidth: 260 }}>
                        <h2 style={{ margin: "0 0 8px" }}>{book.title}</h2>
                        <div style={{ color: "#555" }}>
                            <div><b>Autor:</b> {book.author}</div>
                            <div><b>Año:</b> {book.year}</div>
                            <div><b>Categoría:</b> {book.category}</div>
                            <div><b>Idioma:</b> {book.language}</div>
                            <div><b>ISBN10:</b> {book.isbn10}</div>
                            <div><b>ISBN13:</b> {book.isbn13}</div>
                        </div>

                        <p style={{ marginTop: 12, color: "#444" }}>{book.synopsis}</p>

                        <button className="btn btn--primary" onClick={() => onRentClick(book.id)}>
                            Alquilar libro
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}