import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { useSearch } from '../hooks/useSearch';
import { BOOKS_DB } from '../data/books';
import { BookCard } from '../components/BookCard';
import { RentalModal } from '../components/RentalModal';

export function CatalogPage() {
  const { rent, addToast } = useApp();
  const { query, setQuery, category, setCategory, results } = useSearch(BOOKS_DB);
  const [modalBook, setModalBook] = useState(null);
  const cats = ["all", ...new Set(BOOKS_DB.map(b => b.category))];

  const handleConfirm = data => {
    rent(data);
    setModalBook(null);
    addToast(`"${data.book.title}" alquilado con éxito`, "success");
  };

  return (
    <div className="page">
      <div className="hero">
        <h1 className="hero__title">Tu biblioteca,<br /><em>siempre contigo</em></h1>
        <p className="hero__subtitle">Miles de libros disponibles. Alquila, lee y devuelve cuando quieras.</p>
        <div className="search">
          <input className="search__input" type="text" placeholder="Buscar por título, autor, ISBN, categoría…" value={query} onChange={e => setQuery(e.target.value)} />
          <button className="search__btn">🔍 Buscar</button>
        </div>
      </div>
      <div className="filters">
        <span className="filters__label">Categoría:</span>
        {cats.map(c => (
          <button key={c} className={`filters__chip${category===c?" filters__chip--active":""}`} onClick={() => setCategory(c)}>
            {c==="all"?"Todas":c}
          </button>
        ))}
      </div>
      <div className="container">
        <div style={{ paddingTop:"2rem" }}>
          <h2 className="section-title">{query||category!=="all"?"Resultados":"Colección completa"}</h2>
          <p className="section-subtitle">{results.length} libro{results.length!==1?"s":""} encontrado{results.length!==1?"s":""}</p>
        </div>
        <div className="books-grid">
          {results.length===0
            ? <div className="empty"><div className="empty__icon">📚</div><div className="empty__text">Sin resultados</div></div>
            : results.map((b,i) => <BookCard key={b.id} book={b} delay={i*40} />)
          }
        </div>
      </div>
      {modalBook && <RentalModal book={modalBook} onClose={() => setModalBook(null)} onConfirm={handleConfirm} />}
    </div>
  );
}
