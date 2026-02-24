import { BookCard } from "./BookCard";

export function BookGrid({ books }) {
    return (
        <div className="grid">
            {books.map((b) => (
                <BookCard key={b.id} book={b} />
            ))}
        </div>
    );
}