import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { BOOKS_DB } from '../data/books';
import { StarRating } from '../components/StarRating';
import { RentalModal } from '../components/RentalModal';

export function BookDetailPage({ rentals, rent, addToast }) {
  const { bookId } = useParams();
  const navigate = useNavigate();
  const book = BOOKS_DB.find(b => b.id === Number(bookId));
  const [modal, setModal] = useState(false);

  useEffect(() => { try { window.scrollTo(0,0); } catch {} }, [bookId]);

  if (!book) return (
    <div className="container page" style={{ padding:"4rem 1.5rem", textAlign:"center" }}>
      <div style={{ fontSize:"2.5rem", marginBottom:"0.75rem" }}>😕</div>
      <h2 className="section-title">Libro no encontrado</h2>
      <button className="btn btn--primary" style={{ marginTop:"1.25rem" }} onClick={() => navigate('/')}>Volver al catálogo</button>
    </div>
  );

  const alreadyRented = rentals.some(r => r.bookId === book.id && r.status === "active");

  const handleConfirm = data => {
    rent(data);
    setModal(false);
    addToast(`"${data.book.title}" alquilado con éxito`, "success");
  };

  return (
    <div className="book-detail page">
      <div className="container">
        <button className="book-detail__back" onClick={() => navigate('/')}>← Volver al catálogo</button>
        <div className="book-detail__layout">
          <div>
            <div className="book-detail__cover-wrap">
              <img src={book.cover} alt={book.title}
                onError={e => { e.target.src=`https://placehold.co/240x360/1a1209/f5c842?text=${encodeURIComponent(book.title.slice(0,10))}`; }} />
            </div>
          </div>
          <div>
            <h1 className="book-detail__title">{book.title}</h1>
            <p className="book-detail__author">{book.author}</p>
            <div className="book-detail__tags">
              <span className="tag tag--accent">{book.category}</span>
              <span className="tag">{book.language}</span>
              <span className="tag">{book.year}</span>
              <span className="tag">{book.pages} págs.</span>
            </div>
            <StarRating rating={book.rating} />
            <p className="book-detail__synopsis" style={{ marginTop:"1rem" }}>{book.synopsis}</p>
            <div className="book-detail__isbn">
              <div><div className="isbn__label">ISBN-10</div><div className="isbn__value">{book.isbn10}</div></div>
              <div><div className="isbn__label">ISBN-13</div><div className="isbn__value">{book.isbn13}</div></div>
            </div>
            <div className="book-detail__avail">
              <div className={`avail-dot avail-dot--${book.available?"yes":"no"}`} />
              <span style={{ fontSize:"0.9rem", fontWeight:500 }}>{book.available?`Disponible (${book.stock} copias)`:"No disponible"}</span>
            </div>
            {alreadyRented
              ? <button className="notice-banner" onClick={() => navigate('/rentals')}>✓ Ya tienes este libro alquilado — Ver mis alquileres →</button>
              : <button className="btn btn--primary" disabled={!book.available} onClick={() => setModal(true)}>{book.available?"📖 Alquilar este libro":"No disponible"}</button>
            }
            <div className="reviews">
              <h3 className="reviews__title">Reseñas ({book.reviews.length})</h3>
              {book.reviews.map((r,i) => (
                <div key={i} className="review-card">
                  <div className="review-card__header"><span className="review-card__user">{r.user}</span><span className="review-card__stars">{"★".repeat(r.stars)}</span></div>
                  <p className="review-card__comment">"{r.comment}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      {modal && <RentalModal book={book} onClose={() => setModal(false)} onConfirm={handleConfirm} />}
    </div>
  );
}
