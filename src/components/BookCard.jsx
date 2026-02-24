import { Link } from "react-router-dom";

export function BookCard({ book }) {
    return (
        <div className="card book-card">
            <img className="book-card__img" src={book.coverUrl} alt={book.title} />
            <div className="book-card__title">{book.title}</div>
            <div className="book-card__meta">
                <span>{book.author}</span>
                <span>•</span>
                <span>{book.year}</span>
            </div>
            <div className="book-card__meta">
                <span>{book.category}</span>
                <span>•</span>
                <span>{book.language}</span>
            </div>
            <Link className="book-card__btn book-card__btn--secondary" to={`/book/${book.id}`}>
                Ver detalle
            </Link>
        </div>
    );
}