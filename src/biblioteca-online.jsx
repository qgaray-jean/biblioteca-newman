import { useState, useEffect, useCallback, createContext, useContext } from "react";

// ============================================================
// ESTILOS
// ============================================================
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;0,900;1,400&family=DM+Sans:wght@300;400;500&display=swap');

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }

  :root {
    --ink: #1a1209;
    --parchment: #f5f0e8;
    --cream: #faf7f2;
    --amber: #c8860a;
    --amber-light: #f5c842;
    --amber-dark: #8b5a02;
    --rust: #b5451b;
    --sage: #4a6741;
    --mist: #e8e2d8;
    --shadow: rgba(26,18,9,0.12);
    --shadow-lg: rgba(26,18,9,0.22);
    --font-display: 'Playfair Display', Georgia, serif;
    --font-body: 'DM Sans', sans-serif;
    --radius: 4px;
    --radius-lg: 12px;
    --transition: 0.25s ease;
  }

  ::-webkit-scrollbar { width: 6px; }
  ::-webkit-scrollbar-track { background: var(--mist); }
  ::-webkit-scrollbar-thumb { background: var(--amber); border-radius: 3px; }

  .app-root {
    background: var(--cream);
    color: var(--ink);
    font-family: var(--font-body);
    min-height: 100vh;
    line-height: 1.6;
  }

  .navbar {
    background: var(--ink);
    padding: 0 1.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 60px;
    position: sticky;
    top: 0;
    z-index: 100;
    box-shadow: 0 2px 20px var(--shadow-lg);
    gap: 0.5rem;
  }

  .navbar__brand {
    font-family: var(--font-display);
    font-size: 1.4rem;
    color: var(--amber-light);
    letter-spacing: -0.02em;
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    background: none;
    border: none;
    padding: 0;
  }
  .navbar__brand span { color: #fff; }

  .navbar__links { display: flex; gap: 0.2rem; list-style: none; flex-wrap: wrap; }

  .navbar__link {
    color: rgba(255,255,255,0.65);
    font-size: 0.72rem;
    font-weight: 500;
    padding: 0.45rem 0.85rem;
    border-radius: var(--radius);
    transition: all var(--transition);
    letter-spacing: 0.04em;
    text-transform: uppercase;
    background: none;
    border: none;
    cursor: pointer;
    font-family: var(--font-body);
  }
  .navbar__link:hover { color: var(--amber-light); background: rgba(200,134,10,0.15); }
  .navbar__link--active { color: var(--amber-light) !important; background: rgba(200,134,10,0.2) !important; }

  .hero {
    background: var(--ink);
    padding: 4rem 2rem 3.5rem;
    text-align: center;
    position: relative;
    overflow: hidden;
  }
  .hero::before {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(ellipse at 50% 0%, rgba(200,134,10,0.22) 0%, transparent 70%);
    pointer-events: none;
  }
  .hero__title { font-family: var(--font-display); font-size: clamp(2rem,5vw,4rem); color: #fff; font-weight: 900; line-height: 1.1; margin-bottom: 0.875rem; }
  .hero__title em { color: var(--amber-light); font-style: italic; }
  .hero__subtitle { color: rgba(255,255,255,0.55); font-size: 1rem; max-width: 480px; margin: 0 auto 2rem; font-weight: 300; }

  .search { display: flex; gap: 0.6rem; max-width: 640px; margin: 0 auto; background: rgba(255,255,255,0.07); border: 1px solid rgba(200,134,10,0.3); border-radius: 50px; padding: 0.35rem 0.35rem 0.35rem 1.25rem; }
  .search__input { flex: 1; background: none; border: none; outline: none; color: #fff; font-family: var(--font-body); font-size: 0.9375rem; min-width: 0; }
  .search__input::placeholder { color: rgba(255,255,255,0.38); }
  .search__btn { background: var(--amber); color: #fff; border: none; border-radius: 50px; padding: 0.55rem 1.25rem; font-family: var(--font-body); font-size: 0.8125rem; font-weight: 500; cursor: pointer; transition: background var(--transition); white-space: nowrap; flex-shrink: 0; }
  .search__btn:hover { background: var(--amber-dark); }

  .filters { display: flex; gap: 0.5rem; padding: 1.25rem 1.5rem; flex-wrap: wrap; background: var(--parchment); border-bottom: 1px solid var(--mist); }
  .filters__label { font-size: 0.72rem; font-weight: 500; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.08em; align-self: center; white-space: nowrap; }
  .filters__chip { padding: 0.35rem 0.9rem; border-radius: 50px; border: 1.5px solid var(--mist); background: transparent; color: var(--ink); font-family: var(--font-body); font-size: 0.8rem; cursor: pointer; transition: all var(--transition); white-space: nowrap; }
  .filters__chip:hover { border-color: var(--amber); color: var(--amber-dark); }
  .filters__chip--active { background: var(--amber); border-color: var(--amber); color: #fff; }

  .container { max-width: 1200px; margin: 0 auto; padding: 0 1.5rem; }
  .section-title { font-family: var(--font-display); font-size: 1.75rem; font-weight: 700; margin-bottom: 0.35rem; }
  .section-subtitle { color: var(--ink); opacity: 0.5; font-size: 0.9rem; margin-bottom: 1.75rem; }

  .books-grid { display: grid; grid-template-columns: repeat(auto-fill,minmax(175px,1fr)); gap: 1.5rem; padding: 2rem 0; }

  .book-card { cursor: pointer; transition: transform var(--transition); animation: fadeUp 0.4s ease both; }
  .book-card:hover { transform: translateY(-5px); }
  .book-card__cover-wrap { position: relative; border-radius: var(--radius-lg); overflow: hidden; aspect-ratio: 2/3; background: var(--mist); box-shadow: 0 4px 18px var(--shadow); transition: box-shadow var(--transition); }
  .book-card:hover .book-card__cover-wrap { box-shadow: 0 12px 36px var(--shadow-lg); }
  .book-card__cover { width: 100%; height: 100%; object-fit: cover; display: block; }
  .book-card__badge { position: absolute; top: 8px; right: 8px; padding: 0.2rem 0.55rem; border-radius: 50px; font-size: 0.6rem; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; }
  .book-card__badge--available { background: var(--sage); color: #fff; }
  .book-card__badge--unavailable { background: var(--rust); color: #fff; }
  .book-card__info { padding: 0.75rem 0.2rem 0; }
  .book-card__title { font-family: var(--font-display); font-size: 0.9rem; font-weight: 700; line-height: 1.3; margin-bottom: 0.15rem; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
  .book-card__author { font-size: 0.78rem; opacity: 0.55; margin-bottom: 0.4rem; }
  .book-card__meta { display: flex; align-items: center; gap: 0.4rem; flex-wrap: wrap; }
  .book-card__rating { font-size: 0.78rem; font-weight: 600; color: var(--amber-dark); }
  .book-card__category { font-size: 0.65rem; background: var(--mist); padding: 0.12rem 0.45rem; border-radius: 50px; opacity: 0.7; }

  .empty { text-align: center; padding: 4rem 2rem; opacity: 0.45; grid-column: 1/-1; }
  .empty__icon { font-size: 2.5rem; margin-bottom: 0.75rem; }
  .empty__text { font-family: var(--font-display); font-size: 1.15rem; }

  .book-detail { padding: 2.5rem 0; }
  .book-detail__back { display: inline-flex; align-items: center; gap: 0.45rem; color: var(--amber-dark); font-size: 0.875rem; font-weight: 500; cursor: pointer; background: none; border: none; font-family: var(--font-body); margin-bottom: 2rem; padding: 0; transition: gap var(--transition); }
  .book-detail__back:hover { gap: 0.7rem; }
  .book-detail__layout { display: grid; grid-template-columns: 240px 1fr; gap: 2.5rem; align-items: start; }
  @media (max-width: 640px) { .book-detail__layout { grid-template-columns: 1fr; } }
  .book-detail__cover-wrap { border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 18px 50px var(--shadow-lg); aspect-ratio: 2/3; background: var(--mist); }
  .book-detail__cover-wrap img { width: 100%; height: 100%; object-fit: cover; display: block; }
  .book-detail__title { font-family: var(--font-display); font-size: clamp(1.5rem,3.5vw,2.5rem); font-weight: 900; line-height: 1.15; margin-bottom: 0.4rem; }
  .book-detail__author { font-size: 1rem; color: var(--amber-dark); font-weight: 500; margin-bottom: 1rem; }
  .book-detail__tags { display: flex; gap: 0.4rem; flex-wrap: wrap; margin-bottom: 1.25rem; }
  .tag { padding: 0.25rem 0.8rem; border-radius: 50px; font-size: 0.78rem; border: 1.5px solid var(--mist); opacity: 0.7; }
  .tag--accent { border-color: var(--amber); color: var(--amber-dark); opacity: 1; font-weight: 500; }
  .book-detail__synopsis { font-size: 0.9375rem; line-height: 1.75; opacity: 0.8; margin-bottom: 1.5rem; max-width: 600px; }
  .book-detail__isbn { display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1.5rem; padding: 1rem 1.25rem; background: var(--parchment); border-radius: var(--radius-lg); border: 1px solid var(--mist); }
  .isbn__label { font-size: 0.65rem; text-transform: uppercase; letter-spacing: 0.1em; opacity: 0.5; margin-bottom: 0.15rem; }
  .isbn__value { font-family: monospace; font-size: 0.875rem; font-weight: 600; letter-spacing: 0.04em; }
  .book-detail__avail { display: flex; align-items: center; gap: 0.75rem; margin-bottom: 1.25rem; }
  .avail-dot { width: 9px; height: 9px; border-radius: 50%; }
  .avail-dot--yes { background: var(--sage); box-shadow: 0 0 7px rgba(74,103,65,0.55); }
  .avail-dot--no { background: var(--rust); }

  .form-group { display: flex; flex-direction: column; gap: 0.35rem; flex: 1; min-width: 130px; }
  .form-group label { font-size: 0.72rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.06em; opacity: 0.6; }
  .form-group input, .form-group select { padding: 0.55rem 0.875rem; border: 1.5px solid var(--mist); border-radius: var(--radius); font-family: var(--font-body); font-size: 0.9rem; background: #fff; color: var(--ink); outline: none; transition: border-color var(--transition); }
  .form-group input:focus, .form-group select:focus { border-color: var(--amber); }

  .btn { display: inline-flex; align-items: center; gap: 0.45rem; padding: 0.65rem 1.5rem; border-radius: var(--radius); border: none; font-family: var(--font-body); font-size: 0.9rem; font-weight: 500; cursor: pointer; transition: all var(--transition); }
  .btn--primary { background: var(--amber); color: #fff; }
  .btn--primary:hover { background: var(--amber-dark); transform: translateY(-1px); }
  .btn--primary:disabled { opacity: 0.4; cursor: not-allowed; transform: none; }
  .btn--outline { background: transparent; border: 1.5px solid var(--amber); color: var(--amber-dark); }
  .btn--outline:hover { background: var(--amber); color: #fff; }
  .btn--ghost { background: var(--mist); border: none; color: var(--ink); }
  .btn--ghost:hover { background: #ddd; }
  .btn--sm { padding: 0.38rem 0.9rem; font-size: 0.78rem; }

  .reviews { margin-top: 2rem; }
  .reviews__title { font-family: var(--font-display); font-size: 1.15rem; margin-bottom: 1rem; }
  .review-card { padding: 0.875rem 1.1rem; border-left: 3px solid var(--amber); background: var(--parchment); margin-bottom: 0.75rem; border-radius: 0 var(--radius) var(--radius) 0; }
  .review-card__header { display: flex; align-items: center; gap: 0.65rem; margin-bottom: 0.3rem; }
  .review-card__user { font-weight: 600; font-size: 0.875rem; }
  .review-card__stars { color: var(--amber); font-size: 0.78rem; }
  .review-card__comment { font-size: 0.9rem; opacity: 0.72; font-style: italic; }

  .rentals-page { padding: 2.5rem 0; }
  .rentals-stats { display: grid; grid-template-columns: repeat(auto-fit,minmax(140px,1fr)); gap: 1rem; margin-bottom: 2rem; }
  .stat-card { background: var(--parchment); border: 1px solid var(--mist); border-radius: var(--radius-lg); padding: 1.1rem 1.25rem; }
  .stat-card__value { font-family: var(--font-display); font-size: 1.875rem; font-weight: 900; color: var(--amber-dark); }
  .stat-card__label { font-size: 0.75rem; opacity: 0.5; text-transform: uppercase; letter-spacing: 0.06em; margin-top: 0.2rem; }

  .rental-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 2px 14px var(--shadow); }
  .rental-table th { background: var(--ink); color: rgba(255,255,255,0.7); padding: 0.8rem 1rem; text-align: left; font-size: 0.7rem; font-weight: 500; text-transform: uppercase; letter-spacing: 0.07em; }
  .rental-table td { padding: 0.875rem 1rem; border-bottom: 1px solid var(--mist); font-size: 0.875rem; }
  .rental-table tr:last-child td { border-bottom: none; }
  .rental-table tr:hover td { background: var(--parchment); }

  .status-badge { padding: 0.22rem 0.65rem; border-radius: 50px; font-size: 0.7rem; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; }
  .status-badge--active { background: #dcf0d8; color: var(--sage); }
  .status-badge--overdue { background: #fde8e2; color: var(--rust); }
  .status-badge--returned { background: var(--mist); color: #666; }

  .about-page { padding: 3rem 0; }
  .about-hero { background: var(--ink); color: #fff; padding: 4rem 2rem; text-align: center; border-radius: var(--radius-lg); margin-bottom: 2.5rem; position: relative; overflow: hidden; }
  .about-hero::after { content: '📚'; position: absolute; font-size: 12rem; opacity: 0.04; bottom: -1.5rem; right: 1rem; line-height: 1; }
  .about-hero__title { font-family: var(--font-display); font-size: 2.5rem; font-weight: 900; color: var(--amber-light); margin-bottom: 0.875rem; }
  .about-grid { display: grid; grid-template-columns: repeat(auto-fit,minmax(260px,1fr)); gap: 1.25rem; }
  .feature-card { background: var(--parchment); border: 1px solid var(--mist); border-radius: var(--radius-lg); padding: 1.75rem; transition: transform var(--transition), box-shadow var(--transition); }
  .feature-card:hover { transform: translateY(-3px); box-shadow: 0 8px 28px var(--shadow); }
  .feature-card__icon { font-size: 1.75rem; margin-bottom: 0.875rem; }
  .feature-card__title { font-family: var(--font-display); font-size: 1.1rem; margin-bottom: 0.6rem; }
  .feature-card__text { font-size: 0.9rem; opacity: 0.68; line-height: 1.6; }

  .admin-page { padding: 2.5rem 0; }
  .admin-notice { display: flex; align-items: center; gap: 0.875rem; padding: 1rem 1.25rem; background: #fff7e6; border: 1px solid #ffd77a; border-radius: var(--radius-lg); margin-bottom: 2rem; font-size: 0.875rem; }
  .admin-table { width: 100%; border-collapse: collapse; background: #fff; border-radius: var(--radius-lg); overflow: hidden; box-shadow: 0 2px 14px var(--shadow); }
  .admin-table th { background: var(--parchment); border-bottom: 2px solid var(--mist); padding: 0.7rem 0.9rem; text-align: left; font-size: 0.7rem; text-transform: uppercase; letter-spacing: 0.07em; opacity: 0.6; }
  .admin-table td { padding: 0.8rem 0.9rem; border-bottom: 1px solid var(--mist); font-size: 0.85rem; }
  .admin-table tr:last-child td { border-bottom: none; }
  .admin-table tr:hover td { background: var(--parchment); }

  .modal-overlay { position: fixed; inset: 0; background: rgba(26,18,9,0.62); z-index: 200; display: flex; align-items: center; justify-content: center; padding: 1.5rem; backdrop-filter: blur(4px); animation: fadeIn 0.2s ease; }
  .modal { background: var(--cream); border-radius: var(--radius-lg); padding: 1.75rem; max-width: 460px; width: 100%; box-shadow: 0 28px 70px rgba(0,0,0,0.38); animation: scaleIn 0.22s ease; }
  .modal__header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 1rem; }
  .modal__title { font-family: var(--font-display); font-size: 1.3rem; }
  .modal__close { background: none; border: none; cursor: pointer; font-size: 1.15rem; opacity: 0.45; padding: 0; line-height: 1; transition: opacity var(--transition); }
  .modal__close:hover { opacity: 1; }
  .modal__footer { display: flex; gap: 0.65rem; justify-content: flex-end; margin-top: 1.25rem; padding-top: 1.25rem; border-top: 1px solid var(--mist); }

  .toast-container { position: fixed; bottom: 1.5rem; right: 1.5rem; z-index: 999; display: flex; flex-direction: column; gap: 0.6rem; }
  .toast { background: var(--ink); color: #fff; padding: 0.875rem 1.25rem; border-radius: var(--radius-lg); font-size: 0.875rem; box-shadow: 0 6px 24px rgba(0,0,0,0.28); display: flex; align-items: center; gap: 0.65rem; animation: slideIn 0.3s ease; max-width: 300px; cursor: pointer; }
  .toast--success { border-left: 4px solid var(--sage); }
  .toast--error { border-left: 4px solid var(--rust); }
  .toast--info { border-left: 4px solid var(--amber); }

  .footer { background: var(--ink); color: rgba(255,255,255,0.45); text-align: center; padding: 1.75rem; font-size: 0.8rem; margin-top: 4rem; }
  .footer span { color: var(--amber-light); }

  .notice-banner { background: #dcf0d8; border: 1px solid #a8d8a0; border-radius: var(--radius); padding: 0.75rem 1rem; font-size: 0.875rem; color: var(--sage); font-weight: 500; margin-bottom: 1rem; cursor: pointer; border: none; width: 100%; text-align: left; font-family: var(--font-body); display: block; }
  .notice-banner:hover { text-decoration: underline; }

  @keyframes fadeUp { from { opacity:0; transform:translateY(18px); } to { opacity:1; transform:translateY(0); } }
  @keyframes fadeIn { from { opacity:0; } to { opacity:1; } }
  @keyframes scaleIn { from { opacity:0; transform:scale(0.95); } to { opacity:1; transform:scale(1); } }
  @keyframes slideIn { from { opacity:0; transform:translateX(28px); } to { opacity:1; transform:translateX(0); } }
  .page { animation: fadeUp 0.32s ease both; }
`;

// ============================================================
// BASE DE DATOS MOCK
// ============================================================
const BOOKS_DB = [
  { id:1, isbn10:"0061965480", isbn13:"978-0061965487", title:"El nombre del viento", author:"Patrick Rothfuss", year:2007, category:"Fantasía", language:"Español", pages:662, cover:"https://covers.openlibrary.org/b/isbn/9780756404741-L.jpg", synopsis:"Kvothe, llamado el Asesino de Reyes, cuenta la historia de su propia vida describiendo sus aventuras como estudiante de magia en la Universidad.", rating:4.8, reviews:[{user:"Ana G.",comment:"Una obra maestra de la fantasía épica.",stars:5},{user:"Carlos M.",comment:"Personajes increíblemente ricos.",stars:5}], available:true, stock:3 },
  { id:2, isbn10:"0439023521", isbn13:"978-0439023528", title:"Los Juegos del Hambre", author:"Suzanne Collins", year:2008, category:"Ciencia Ficción", language:"Español", pages:374, cover:"https://covers.openlibrary.org/b/isbn/9780439023528-L.jpg", synopsis:"En un futuro distópico, Katniss Everdeen se enfrenta a una batalla de vida o muerte en un espectáculo televisado.", rating:4.5, reviews:[{user:"Laura P.",comment:"Imposible de soltar una vez empezado.",stars:5}], available:true, stock:2 },
  { id:3, isbn10:"0743273567", isbn13:"978-0743273565", title:"El Gran Gatsby", author:"F. Scott Fitzgerald", year:1925, category:"Clásico", language:"Español", pages:180, cover:"https://covers.openlibrary.org/b/isbn/9780743273565-L.jpg", synopsis:"Una historia del Jazz Age americano que explora el idealismo, la resistencia y el sueño americano.", rating:4.2, reviews:[{user:"Elena R.",comment:"Un clásico atemporal con prosa sublime.",stars:4}], available:true, stock:5 },
  { id:4, isbn10:"0062316095", isbn13:"978-0062316097", title:"El Alquimista", author:"Paulo Coelho", year:1988, category:"Ficción", language:"Español", pages:208, cover:"https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg", synopsis:"Un joven pastor andaluz emprende un viaje de autodescubrimiento siguiendo sus sueños hasta las pirámides de Egipto.", rating:4.3, reviews:[{user:"Sofía L.",comment:"Inspirador y filosófico a la vez.",stars:4}], available:false, stock:0 },
  { id:5, isbn10:"0316769177", isbn13:"978-0316769174", title:"El guardián entre el centeno", author:"J.D. Salinger", year:1951, category:"Clásico", language:"Español", pages:277, cover:"https://covers.openlibrary.org/b/isbn/9780316769174-L.jpg", synopsis:"Holden Caulfield narra su experiencia de varios días en Nueva York tras ser expulsado de su internado.", rating:4.0, reviews:[{user:"Marta C.",comment:"Voz narrativa única e inconfundible.",stars:4}], available:true, stock:1 },
  { id:6, isbn10:"0385490445", isbn13:"978-0385490443", title:"Neuromante", author:"William Gibson", year:1984, category:"Ciencia Ficción", language:"Español", pages:271, cover:"https://covers.openlibrary.org/b/isbn/9780385490443-L.jpg", synopsis:"El hacker Case recibe su última oportunidad de trabajar en el ciberespacio con consecuencias que cambian el mundo.", rating:4.4, reviews:[{user:"Alex B.",comment:"El padre del cyberpunk, absolutamente genial.",stars:5}], available:true, stock:2 },
  { id:7, isbn10:"0142437239", isbn13:"978-0142437230", title:"Don Quijote de la Mancha", author:"Miguel de Cervantes", year:1605, category:"Clásico", language:"Español", pages:1023, cover:"https://covers.openlibrary.org/b/isbn/9780142437230-L.jpg", synopsis:"Las aventuras del caballero andante Don Quijote y su fiel escudero Sancho Panza en la España del Siglo de Oro.", rating:4.6, reviews:[{user:"Ricardo V.",comment:"La obra cumbre de la literatura española.",stars:5}], available:true, stock:4 },
  { id:8, isbn10:"0307277674", isbn13:"978-0307277671", title:"Cien años de soledad", author:"Gabriel García Márquez", year:1967, category:"Ficción", language:"Español", pages:417, cover:"https://covers.openlibrary.org/b/isbn/9780307277671-L.jpg", synopsis:"La historia épica de la familia Buendía a lo largo de siete generaciones en el pueblo ficticio de Macondo.", rating:4.9, reviews:[{user:"Isabel F.",comment:"Realismo mágico en su máxima expresión.",stars:5},{user:"Juan A.",comment:"Lectura obligatoria para cualquier amante de la literatura.",stars:5}], available:true, stock:3 },
];

// ============================================================
// CONTEXTO
// ============================================================
const AppContext = createContext(null);
const useApp = () => useContext(AppContext);

// ============================================================
// CUSTOM HOOK: useLocalStorage
// ============================================================
function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    try { const s = localStorage.getItem(key); return s ? JSON.parse(s) : initial; }
    catch { return initial; }
  });
  const set = useCallback(v => {
    setVal(v);
    try { localStorage.setItem(key, JSON.stringify(v)); } catch {}
  }, [key]);
  return [val, set];
}

// ============================================================
// CUSTOM HOOK: useSearch
// ============================================================
function useSearch(books) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState(books);

  useEffect(() => {
    const q = query.toLowerCase();
    setResults(books.filter(b => {
      const ok = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) ||
        b.isbn10.includes(q) || b.isbn13.includes(q) || b.synopsis.toLowerCase().includes(q) ||
        b.language.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
      return ok && (category === "all" || b.category === category);
    }));
  }, [query, category, books]);

  return { query, setQuery, category, setCategory, results };
}

// ============================================================
// HELPERS
// ============================================================
function StyleInjector() {
  useEffect(() => {
    const id = "bib-css";
    if (!document.getElementById(id)) {
      const s = document.createElement("style");
      s.id = id; s.textContent = STYLES;
      document.head.appendChild(s);
    }
  }, []);
  return null;
}

function StarRating({ rating }) {
  return (
    <span style={{ color:"#c8860a", fontSize:"0.82rem" }}>
      {"★".repeat(Math.round(rating))}{"☆".repeat(5-Math.round(rating))}
      <span style={{ marginLeft:"0.3rem", opacity:0.65 }}>{rating.toFixed(1)}</span>
    </span>
  );
}

// ============================================================
// NAVBAR
// ============================================================
function Navbar() {
  const { page, setPage } = useApp();
  const links = [
    { id:"catalog", label:"Catálogo" },
    { id:"rentals", label:"Mis Alquileres" },
    { id:"about",   label:"Acerca de" },
    { id:"admin",   label:"Admin" },
  ];
  return (
    <nav className="navbar">
      <button className="navbar__brand" onClick={() => setPage({ name:"catalog" })}>
        📖 <span>Biblio</span>teca
      </button>
      <ul className="navbar__links">
        {links.map(l => (
          <li key={l.id}>
            <button
              className={`navbar__link${page.name === l.id ? " navbar__link--active" : ""}`}
              onClick={() => setPage({ name: l.id })}
            >{l.label}</button>
          </li>
        ))}
      </ul>
    </nav>
  );
}

// ============================================================
// TOAST
// ============================================================
function Toast({ toasts, remove }) {
  return (
    <div className="toast-container">
      {toasts.map(t => (
        <div key={t.id} className={`toast toast--${t.type}`} onClick={() => remove(t.id)}>
          <span>{t.type==="success"?"✓":t.type==="error"?"✗":"ℹ"}</span>
          <span>{t.message}</span>
        </div>
      ))}
    </div>
  );
}

// ============================================================
// BOOK CARD
// ============================================================
function BookCard({ book, delay=0 }) {
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

// ============================================================
// MODAL ALQUILER
// ============================================================
function RentalModal({ book, onClose, onConfirm }) {
  const [days, setDays] = useState(14);
  const [name, setName] = useState("");
  const due = new Date(); due.setDate(due.getDate() + Number(days));
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Alquilar libro</h3>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <p style={{ opacity:0.65, marginBottom:"1rem", fontStyle:"italic", fontSize:"0.9rem" }}>"{book.title}" — {book.author}</p>
        <div style={{ display:"flex", flexDirection:"column", gap:"0.875rem", marginBottom:"1rem" }}>
          <div className="form-group">
            <label>Tu nombre</label>
            <input type="text" placeholder="Nombre del lector" value={name} onChange={e => setName(e.target.value)} />
          </div>
          <div className="form-group">
            <label>Duración</label>
            <select value={days} onChange={e => setDays(Number(e.target.value))}>
              <option value={7}>7 días</option>
              <option value={14}>14 días</option>
              <option value={21}>21 días</option>
              <option value={30}>30 días</option>
            </select>
          </div>
        </div>
        <p style={{ fontSize:"0.825rem", opacity:0.6 }}>Devolución: <strong style={{ color:"var(--amber-dark)" }}>{due.toLocaleDateString("es-ES",{day:"2-digit",month:"long",year:"numeric"})}</strong></p>
        <div className="modal__footer">
          <button className="btn btn--ghost btn--sm" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary btn--sm" disabled={!name.trim()} onClick={() => onConfirm({ book, days, name, dueDate:due })}>Confirmar alquiler</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// MODAL EXTENSIÓN
// ============================================================
function ExtendModal({ rental, onClose, onConfirm }) {
  const [days, setDays] = useState(7);
  const nd = new Date(rental.dueDate); nd.setDate(nd.getDate() + Number(days));
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal__header">
          <h3 className="modal__title">Extender plazo</h3>
          <button className="modal__close" onClick={onClose}>✕</button>
        </div>
        <p style={{ opacity:0.65, marginBottom:"1rem", fontSize:"0.9rem" }}><strong>{rental.bookTitle}</strong></p>
        <div className="form-group" style={{ marginBottom:"1rem" }}>
          <label>Días adicionales</label>
          <select value={days} onChange={e => setDays(Number(e.target.value))}>
            <option value={7}>+7 días</option>
            <option value={14}>+14 días</option>
            <option value={21}>+21 días</option>
          </select>
        </div>
        <p style={{ fontSize:"0.825rem", opacity:0.6 }}>Nueva fecha: <strong style={{ color:"var(--amber-dark)" }}>{nd.toLocaleDateString("es-ES",{day:"2-digit",month:"long",year:"numeric"})}</strong></p>
        <div className="modal__footer">
          <button className="btn btn--ghost btn--sm" onClick={onClose}>Cancelar</button>
          <button className="btn btn--primary btn--sm" onClick={() => onConfirm(days)}>Extender</button>
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PÁGINA: CATÁLOGO
// ============================================================
function CatalogPage() {
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

// ============================================================
// PÁGINA: DETALLE DE LIBRO
// ============================================================
function BookDetailPage() {
  const { page, setPage, rentals, rent, addToast } = useApp();
  const book = BOOKS_DB.find(b => b.id === page.bookId);
  const [modal, setModal] = useState(false);

  useEffect(() => { try { window.scrollTo(0,0); } catch {} }, [page.bookId]);

  if (!book) return (
    <div className="container page" style={{ padding:"4rem 1.5rem", textAlign:"center" }}>
      <div style={{ fontSize:"2.5rem", marginBottom:"0.75rem" }}>😕</div>
      <h2 className="section-title">Libro no encontrado</h2>
      <button className="btn btn--primary" style={{ marginTop:"1.25rem" }} onClick={() => setPage({ name:"catalog" })}>Volver al catálogo</button>
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
        <button className="book-detail__back" onClick={() => setPage({ name:"catalog" })}>← Volver al catálogo</button>
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
              ? <button className="notice-banner" onClick={() => setPage({ name:"rentals" })}>✓ Ya tienes este libro alquilado — Ver mis alquileres →</button>
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

// ============================================================
// PÁGINA: MIS ALQUILERES
// ============================================================
function RentalsPage() {
  const { rentals, extend, returnBook, addToast } = useApp();
  const [extTarget, setExtTarget] = useState(null);
  const [filter, setFilter] = useState("all");

  const shown = filter==="all" ? rentals : rentals.filter(r => r.status===filter);
  const counts = { active:0, overdue:0, returned:0 };
  rentals.forEach(r => counts[r.status] = (counts[r.status]||0) + 1);

  return (
    <div className="rentals-page page">
      <div className="container">
        <h2 className="section-title">Mis Alquileres</h2>
        <p className="section-subtitle">Historial y gestión de tus préstamos</p>

        <div className="rentals-stats">
          {[
            { label:"Total", value:rentals.length, color:"var(--amber-dark)" },
            { label:"En curso", value:counts.active||0, color:"var(--sage)" },
            { label:"Vencidos", value:counts.overdue||0, color:"var(--rust)" },
            { label:"Devueltos", value:counts.returned||0, color:"#999" },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-card__value" style={{ color:s.color }}>{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="filters" style={{ borderRadius:"var(--radius-lg) var(--radius-lg) 0 0", marginBottom:0 }}>
          {["all","active","overdue","returned"].map(f => (
            <button key={f} className={`filters__chip${filter===f?" filters__chip--active":""}`} onClick={() => setFilter(f)}>
              {{all:"Todos",active:"En curso",overdue:"Vencidos",returned:"Devueltos"}[f]}
            </button>
          ))}
        </div>

        {shown.length===0
          ? <div style={{ background:"#fff", borderRadius:"0 0 var(--radius-lg) var(--radius-lg)", padding:"3.5rem 2rem", textAlign:"center", opacity:0.45 }}>
              <div style={{ fontSize:"2.2rem", marginBottom:"0.6rem" }}>📭</div>
              <div style={{ fontFamily:"var(--font-display)", fontSize:"1rem" }}>No hay alquileres en esta categoría</div>
            </div>
          : <div style={{ overflowX:"auto" }}>
              <table className="rental-table">
                <thead>
                  <tr><th>Libro</th><th>Lector</th><th>Alquilado</th><th>Devolución</th><th>Estado</th><th>Acciones</th></tr>
                </thead>
                <tbody>
                  {shown.map(r => (
                    <tr key={r.id}>
                      <td><strong style={{ fontFamily:"var(--font-display)" }}>{r.bookTitle}</strong><br /><span style={{ fontSize:"0.78rem", opacity:0.55 }}>{r.bookAuthor}</span></td>
                      <td>{r.userName}</td>
                      <td>{new Date(r.rentedAt).toLocaleDateString("es-ES")}</td>
                      <td style={{ color:r.status==="overdue"?"var(--rust)":"inherit", fontWeight:r.status==="overdue"?600:400 }}>{new Date(r.dueDate).toLocaleDateString("es-ES")}</td>
                      <td><span className={`status-badge status-badge--${r.status}`}>{{active:"Activo",overdue:"Vencido",returned:"Devuelto"}[r.status]}</span></td>
                      <td>
                        {r.status!=="returned" && (
                          <div style={{ display:"flex", gap:"0.4rem" }}>
                            <button className="btn btn--outline btn--sm" onClick={() => setExtTarget(r)}>Extender</button>
                            <button className="btn btn--ghost btn--sm" onClick={() => { returnBook(r.id); addToast(`"${r.bookTitle}" devuelto`, "info"); }}>Devolver</button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
        }
      </div>
      {extTarget && <ExtendModal rental={extTarget} onClose={() => setExtTarget(null)} onConfirm={days => { extend(extTarget.id, days); addToast(`Plazo extendido ${days} días`,"success"); setExtTarget(null); }} />}
    </div>
  );
}

// ============================================================
// PÁGINA: ACERCA DE
// ============================================================
function AboutPage() {
  const features = [
    { icon:"📚", title:"Catálogo Extenso", text:"Accede a libros de todas las categorías: clásicos, ciencia ficción, fantasía, historia y mucho más." },
    { icon:"⏱️", title:"Alquiler Flexible", text:"Alquila libros por 7, 14, 21 o 30 días y extiende el plazo cuando lo necesites." },
    { icon:"🔍", title:"Búsqueda Inteligente", text:"Encuentra cualquier libro por título, autor, ISBN, categoría, idioma o descripción." },
    { icon:"⭐", title:"Reseñas y Valoraciones", text:"Consulta opiniones de otros lectores antes de elegir tu próximo libro." },
    { icon:"📱", title:"Acceso Universal", text:"Disponible en cualquier dispositivo, en cualquier momento y lugar." },
    { icon:"🔒", title:"Sin Registro Obligatorio", text:"Navega y alquila de forma anónima. Tu privacidad es nuestra prioridad." },
  ];
  return (
    <div className="about-page page">
      <div className="container">
        <div className="about-hero">
          <h1 className="about-hero__title">Nuestra Biblioteca</h1>
          <p style={{ color:"rgba(255,255,255,0.6)", maxWidth:"460px", margin:"0 auto", fontSize:"1rem" }}>
            Una plataforma moderna para conectar lectores con el conocimiento. Miles de libros, un solo lugar.
          </p>
        </div>
        <h2 className="section-title">¿Qué ofrecemos?</h2>
        <p className="section-subtitle">Todo lo que necesitas para disfrutar de la lectura</p>
        <div className="about-grid">
          {features.map(f => (
            <div className="feature-card" key={f.title}>
              <div className="feature-card__icon">{f.icon}</div>
              <h3 className="feature-card__title">{f.title}</h3>
              <p className="feature-card__text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ============================================================
// PÁGINA: ADMIN
// ============================================================
function AdminPage() {
  const { rentals } = useApp();
  const [search, setSearch] = useState("");
  const filtered = BOOKS_DB.filter(b =>
    b.title.toLowerCase().includes(search.toLowerCase()) ||
    b.author.toLowerCase().includes(search.toLowerCase()) ||
    b.isbn13.includes(search)
  );
  const activeFor = id => rentals.filter(r => r.bookId===id && r.status==="active").length;

  return (
    <div className="admin-page page">
      <div className="container">
        <h2 className="section-title">Panel de Administración</h2>
        <p className="section-subtitle">Gestión interna de la biblioteca</p>

        <div className="admin-notice">
          <span style={{ fontSize:"1.25rem" }}>⚠️</span>
          <div><strong>Área restringida</strong> — Sección destinada a la gestión y administración.</div>
        </div>

        <div className="rentals-stats">
          {[
            { label:"Libros", value:BOOKS_DB.length, color:"var(--amber-dark)" },
            { label:"Disponibles", value:BOOKS_DB.filter(b=>b.available).length, color:"var(--sage)" },
            { label:"Alquileres activos", value:rentals.filter(r=>r.status==="active").length, color:"var(--amber-dark)" },
            { label:"Total alquileres", value:rentals.length, color:"#666" },
          ].map(s => (
            <div className="stat-card" key={s.label}>
              <div className="stat-card__value" style={{ color:s.color }}>{s.value}</div>
              <div className="stat-card__label">{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", marginBottom:"1rem", gap:"1rem", flexWrap:"wrap" }}>
          <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.2rem" }}>Inventario</h3>
          <input type="text" placeholder="Filtrar…" value={search} onChange={e => setSearch(e.target.value)}
            style={{ padding:"0.5rem 0.875rem", border:"1.5px solid var(--mist)", borderRadius:"var(--radius)", fontFamily:"var(--font-body)", outline:"none", minWidth:"200px" }} />
        </div>

        <div style={{ overflowX:"auto", marginBottom:"2rem" }}>
          <table className="admin-table">
            <thead>
              <tr><th>Título</th><th>Autor</th><th>Categoría</th><th>Año</th><th>ISBN-13</th><th>Stock</th><th>Alquilados</th><th>Estado</th></tr>
            </thead>
            <tbody>
              {filtered.map(b => (
                <tr key={b.id}>
                  <td><strong style={{ fontFamily:"var(--font-display)" }}>{b.title}</strong></td>
                  <td>{b.author}</td>
                  <td>{b.category}</td>
                  <td>{b.year}</td>
                  <td><code style={{ fontSize:"0.78rem", background:"var(--mist)", padding:"0.1rem 0.4rem", borderRadius:"3px" }}>{b.isbn13}</code></td>
                  <td>{b.stock}</td>
                  <td>{activeFor(b.id)}</td>
                  <td><span className={`status-badge status-badge--${b.available?"active":"returned"}`}>{b.available?"Disponible":"Agotado"}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {rentals.length > 0 && (
          <>
            <h3 style={{ fontFamily:"var(--font-display)", fontSize:"1.2rem", marginBottom:"1rem" }}>Últimos alquileres</h3>
            <div style={{ overflowX:"auto" }}>
              <table className="rental-table">
                <thead><tr><th>Libro</th><th>Lector</th><th>Alquilado</th><th>Devolución</th><th>Estado</th></tr></thead>
                <tbody>
                  {[...rentals].sort((a,b) => new Date(b.rentedAt)-new Date(a.rentedAt)).slice(0,10).map(r => (
                    <tr key={r.id}>
                      <td><strong style={{ fontFamily:"var(--font-display)" }}>{r.bookTitle}</strong></td>
                      <td>{r.userName}</td>
                      <td>{new Date(r.rentedAt).toLocaleDateString("es-ES")}</td>
                      <td>{new Date(r.dueDate).toLocaleDateString("es-ES")}</td>
                      <td><span className={`status-badge status-badge--${r.status}`}>{{active:"Activo",overdue:"Vencido",returned:"Devuelto"}[r.status]}</span></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

// ============================================================
// FOOTER
// ============================================================
function Footer() {
  return (
    <footer className="footer">
      <p>© 2025 <span>Biblioteca Online</span> — Construida con React, CSS3 y ♥</p>
    </footer>
  );
}

// ============================================================
// APP
// ============================================================
export default function App() {
  // ROUTER basado en estado (funciona en cualquier sandbox)
  const [page, setPage] = useState({ name:"catalog" });

  // Alquileres persistidos
  const [rentals, setRentals] = useLocalStorage("bib_rentals_v3", []);

  // Toasts
  const [toasts, setToasts] = useState([]);

  // Marcar vencidos al montar
  useEffect(() => {
    const now = new Date();
    setRentals(prev => prev.map(r =>
      r.status==="active" && new Date(r.dueDate) < now ? { ...r, status:"overdue" } : r
    ));
  }, []);

  const addToast = useCallback((message, type="info") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id!==id)), 3500);
  }, []);

  const removeToast = useCallback(id => setToasts(p => p.filter(t => t.id!==id)), []);

  const rent = useCallback(({ book, days, name, dueDate }) => {
    setRentals(p => [{
      id:`r-${Date.now()}`,
      bookId:book.id, bookTitle:book.title, bookAuthor:book.author,
      userName:name,
      rentedAt:new Date().toISOString(),
      dueDate:dueDate.toISOString(),
      status:"active",
    }, ...p]);
  }, [setRentals]);

  const extend = useCallback((id, days) => {
    setRentals(p => p.map(r => {
      if (r.id!==id) return r;
      const d = new Date(r.dueDate); d.setDate(d.getDate()+days);
      return { ...r, dueDate:d.toISOString(), status:"active" };
    }));
  }, [setRentals]);

  const returnBook = useCallback(id => {
    setRentals(p => p.map(r => r.id===id ? { ...r, status:"returned" } : r));
  }, [setRentals]);

  const ctx = { page, setPage, rentals, rent, extend, returnBook, addToast };

  const renderPage = () => {
    switch(page.name) {
      case "catalog": return <CatalogPage />;
      case "detail":  return <BookDetailPage />;
      case "rentals": return <RentalsPage />;
      case "about":   return <AboutPage />;
      case "admin":   return <AdminPage />;
      default:        return <CatalogPage />;
    }
  };

  return (
    <AppContext.Provider value={ctx}>
      <StyleInjector />
      <div className="app-root">
        <Navbar />
        <main>{renderPage()}</main>
        <Footer />
        <Toast toasts={toasts} remove={removeToast} />
      </div>
    </AppContext.Provider>
  );
}
