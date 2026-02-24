import { Link } from "react-router-dom";

export function BookCard({ book }) {
    return (
        <div className="flex flex-col gap-2.5 p-3 rounded-lg shadow-md" style={{ backgroundColor: 'var(--surface-color)', borderColor: 'var(--border-color)', borderWidth: '1px' }}>
            <img className="w-full h-56 object-cover rounded-md border" style={{ borderColor: 'var(--border-color)' }} src={book.coverUrl} alt={book.title} />
            <h3 className="font-serif font-bold text-lg leading-tight" style={{ color: 'var(--accent-color)' }}>{book.title}</h3>
            <div className="text-sm flex items-center gap-2" style={{ color: '#776B5D' }}>
                <span>{book.author}</span>
                <span>•</span>
                <span>{book.year}</span>
            </div>
            <div className="text-sm flex items-center gap-2" style={{ color: '#776B5D' }}>
                <span className="font-bold">{book.category}</span>
                <span>•</span>
                <span>{book.language}</span>
            </div>
            <Link className="btn btn--secondary mt-auto text-center" to={`/book/${book.id}`}>
                Ver detalle
            </Link>
        </div>
    );
}