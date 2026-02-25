import React from 'react';
import { useApp } from '../context/AppContext';
import { StarRating } from './StarRating';

export function BookCard({ book, delay=0 }) {
  const { setPage } = useApp();
  return (
    <div className="book-card" style={{ animationDelay:`${delay}ms` }} onClick={() => setPage({ name:"detail", bookId:book.id })}>
      <div className="book-card__cover-wrap">
        <img className="book-card__cover" src={book.cover} alt={book.title}
          onError={e => { e.target.src=`https://placehold.co/200x300/1a1209/f5c842?text=${encodeURIComponent(book.title.slice(0,10))}`; }} />
        <span className={`book-card__badge book-card__badge--${book.available?"available":"unavailable"}`}>
          {book.available?"Disponible":"Agotado"}
        </span>
      </div>
      <div className="book-card__info">
        <div className="book-card__title">{book.title}</div>
        <div className="book-card__author">{book.author}</div>
        <div className="book-card__meta">
          <StarRating rating={book.rating} />
          <span className="book-card__category">{book.category}</span>
        </div>
      </div>
    </div>
  );
}
