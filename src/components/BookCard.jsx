import { Link } from "react-router-dom";

export function BookCard({ book }) {
    return (
        <div className="book-card">
            <img className="book-card__img" src={book.coverUrl} alt={book.title} />
            <h3 className="book-card__title">{book.title}</h3>
            <div className="book-card__meta">
                <span>{book.author}</span>
                <span>•</span>
                <span>{book.year}</span>
            </div>
            <div className="book-card__meta">
                <span className="font-bold">{book.category}</span>
                <span>•</span>
                <span>{book.language}</span>
            </div>
            <Link className="btn btn--secondary book-card__btn" to={`/book/${book.id}`}>
                Ver detalle
            </Link>
        </div>
    );
}