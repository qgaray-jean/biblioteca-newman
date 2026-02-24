import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";

import { Layout } from "../components/Layout";
import { Modal } from "../components/Modal";

import { HomePage } from "../pages/HomePage";
import { CatalogPage } from "../pages/CatalogPage";
import { BookDetailPage } from "../pages/BookDetailPage";
import { RentalsPage } from "../pages/RentalsPage";
import { AdminPage } from "../pages/AdminPage";

import { BOOKS_MOCK } from "../data/books.mock";
import { useDebounce } from "../hooks/useDebounce";

function addDays(date, days) {
    const d = new Date(date);
    d.setDate(d.getDate() + days);
    return d.toISOString();
}

export default function App() {
    // "BD" mock en memoria
    const [books, setBooks] = useState([]);
    const [rentals, setRentals] = useState([]);

    // Buscador + filtros
    const [search, setSearch] = useState("");
    const debouncedSearch = useDebounce(search, 300);

    const [category, setCategory] = useState("");
    const [language, setLanguage] = useState("");

    // Modal alquiler
    const [rentModal, setRentModal] = useState({ open: false, bookId: null });

    // useEffect: carga inicial mock
    useEffect(() => {
        setBooks(BOOKS_MOCK);
    }, []);

    const categories = useMemo(() => {
        return Array.from(new Set(books.map((b) => b.category))).sort();
    }, [books]);

    const languages = useMemo(() => {
        return Array.from(new Set(books.map((b) => b.language))).sort();
    }, [books]);

    // useMemo: filtrado (puede ir en useEffect, pero así es más limpio)
    const filteredBooks = useMemo(() => {
        const q = debouncedSearch.trim().toLowerCase();

        return books.filter((b) => {
            const matchesQuery =
                !q ||
                b.title.toLowerCase().includes(q) ||
                b.author.toLowerCase().includes(q) ||
                b.category.toLowerCase().includes(q) ||
                b.isbn10.toLowerCase().includes(q) ||
                b.isbn13.toLowerCase().includes(q);

            const matchesCategory = !category || b.category === category;
            const matchesLanguage = !language || b.language === language;

            return matchesQuery && matchesCategory && matchesLanguage;
        });
    }, [books, debouncedSearch, category, language]);

    // Tarea 1: Alquilar libro
    const openRentModal = (bookId) => {
        setRentModal({ open: true, bookId });
    };

    const confirmRent = () => {
        const bookId = rentModal.bookId;
        if (!bookId) return;

        // Evitar duplicar alquiler activo del mismo libro (simple)
        const alreadyActive = rentals.some((r) => r.bookId === bookId);
        if (alreadyActive) {
            setRentModal({ open: false, bookId: null });
            return;
        }

        const now = new Date().toISOString();
        const due = addDays(now, 14); // 14 días por defecto

        const rental = {
            rentalId: crypto.randomUUID(),
            bookId,
            startDate: now,
            dueDate: due,
            extensionsCount: 0,
            status: "ACTIVE",
        };

        setRentals((prev) => [rental, ...prev]);
        setRentModal({ open: false, bookId: null });
    };

    // Tarea 2: Extender alquiler
    const extendRental = (rentalId) => {
        setRentals((prev) =>
            prev.map((r) => {
                if (r.rentalId !== rentalId) return r;
                if (r.extensionsCount >= 2) return r; // máximo 2 extensiones
                return {
                    ...r,
                    dueDate: addDays(r.dueDate, 7),
                    extensionsCount: r.extensionsCount + 1,
                };
            })
        );
    };

    // Admin: agregar libro mock
    const addBook = ({ title, author }) => {
        const newBook = {
            id: crypto.randomUUID(),
            title,
            author,
            year: new Date().getFullYear(),
            isbn10: "0000000000",
            isbn13: "0000000000000",
            category: "General",
            language: "ES",
            rating: 4.0,
            coverUrl: "https://via.placeholder.com/400x600.png?text=Nuevo+Libro",
            synopsis: "Libro agregado desde la vista Admin (mock).",
        };

        setBooks((prev) => [newBook, ...prev]);
    };

    const modalBook = rentModal.bookId ? books.find((b) => b.id === rentModal.bookId) : null;

    return (
        <Layout>
            {rentModal.open && (
                <Modal
                    title="Confirmar alquiler"
                    text={
                        modalBook
                            ? `¿Deseas alquilar "${modalBook.title}" por 14 días?`
                            : "¿Deseas alquilar este libro?"
                    }
                    onCancel={() => setRentModal({ open: false, bookId: null })}
                    onConfirm={confirmRent}
                    confirmText="Alquilar"
                />
            )}

            <Routes>
                <Route path="/" element={<HomePage books={books} />} />

                <Route
                    path="/catalog"
                    element={
                        <CatalogPage
                            search={search}
                            onSearchChange={setSearch}
                            category={category}
                            language={language}
                            onCategoryChange={setCategory}
                            onLanguageChange={setLanguage}
                            categories={categories}
                            languages={languages}
                            filteredBooks={filteredBooks}
                        />
                    }
                />

                <Route
                    path="/book/:id"
                    element={<BookDetailPage books={books} onRentClick={openRentModal} />}
                />

                <Route
                    path="/rentals"
                    element={<RentalsPage rentals={rentals} books={books} onExtendRental={extendRental} />}
                />

                <Route path="/admin" element={<AdminPage onAddBook={addBook} />} />

                <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
        </Layout>
    );
}