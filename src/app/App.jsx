import { useState, useEffect, useCallback } from "react";
import { AppContext } from '../context/AppContext';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { Toast } from '../components/Toast';
import { CatalogPage } from '../pages/CatalogPage';
import { BookDetailPage } from '../pages/BookDetailPage';
import { RentalsPage } from '../pages/RentalsPage';
import { AboutPage } from '../pages/AboutPage';
import { AdminPage } from '../pages/AdminPage';
import '../styles/App.css';

export default function App() {
  const [page, setPage] = useState({ name: "catalog" });
  const [rentals, setRentals] = useLocalStorage("bib_rentals_v3", []);
  const [toasts, setToasts] = useState([]);

  useEffect(() => {
    const now = new Date();
    setRentals(prev => prev.map(r =>
      r.status === "active" && new Date(r.dueDate) < now ? { ...r, status: "overdue" } : r
    ));
  }, []);

  const addToast = useCallback((message, type = "info") => {
    const id = Date.now();
    setToasts(p => [...p, { id, message, type }]);
    setTimeout(() => setToasts(p => p.filter(t => t.id !== id)), 3500);
  }, []);

  const removeToast = useCallback(id => setToasts(p => p.filter(t => t.id !== id)), []);

  const rent = useCallback(({ book, days, name, dueDate }) => {
    setRentals(p => [{
      id: `r-${Date.now()}`,
      bookId: book.id, bookTitle: book.title, bookAuthor: book.author,
      userName: name,
      rentedAt: new Date().toISOString(),
      dueDate: dueDate.toISOString(),
      status: "active",
    }, ...p]);
  }, [setRentals]);

  const extend = useCallback((id, days) => {
    setRentals(p => p.map(r => {
      if (r.id !== id) return r;
      const d = new Date(r.dueDate); d.setDate(d.getDate() + days);
      return { ...r, dueDate: d.toISOString(), status: "active" };
    }));
  }, [setRentals]);

  const returnBook = useCallback(id => {
    setRentals(p => p.map(r => r.id === id ? { ...r, status: "returned" } : r));
  }, [setRentals]);

  const ctx = { page, setPage, rentals, rent, extend, returnBook, addToast };

  const renderPage = () => {
    switch (page.name) {
      case "catalog": return <CatalogPage />;
      case "detail": return <BookDetailPage />;
      case "rentals": return <RentalsPage />;
      case "about": return <AboutPage />;
      case "admin": return <AdminPage />;
      default: return <CatalogPage />;
    }
  };

  return (
    <AppContext.Provider value={ctx}>
      <div className="app-root">
        <Navbar />
        <main>{renderPage()}</main>
        <Footer />
        <Toast toasts={toasts} remove={removeToast} />
      </div>
    </AppContext.Provider>
  );
}
