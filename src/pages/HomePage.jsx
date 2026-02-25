import { Link } from "react-router-dom";
import { BookGrid } from "../components/BookGrid";

export function HomePage({ books }) {
    const top = books.slice(0, 4);

    return (
        <div>
            <div className="card mb-3.5">
                <h2 className="m-0">Bienvenido a la Biblioteca</h2>
                <p className="mt-2 text-gray-700">
                    Explora el catálogo, alquila libros y gestiona tus alquileres.
                </p>
                <Link className="btn btn--primary mt-4" to="/catalog">
                    Ir al Catálogo
                </Link>
            </div>

            <h3 className="my-2.5">Recomendados</h3>
            <BookGrid books={top} />
        </div>
    );
}