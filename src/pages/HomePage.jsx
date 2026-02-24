import { Link } from "react-router-dom";
import { BookGrid } from "../components/BookGrid";

export function HomePage({ books }) {
    const top = books.slice(0, 4);

    return (
        <div>
            <div className="card" style={{ marginBottom: 14 }}>
                <h2 style={{ margin: 0 }}>Bienvenido a la Biblioteca</h2>
                <p style={{ marginTop: 8, color: "#444" }}>
                    Explora el catálogo, alquila libros y gestiona tus alquileres.
                </p>
                <Link className="book-card__btn" to="/catalog">Ir al Catálogo</Link>
            </div>

            <h3 style={{ margin: "10px 0" }}>Recomendados</h3>
            <BookGrid books={top} />
        </div>
    );
}