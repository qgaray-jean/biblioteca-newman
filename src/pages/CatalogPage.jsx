import { SearchBar } from "../components/SearchBar";
import { BookFilters } from "../components/BookFilters";
import { BookGrid } from "../components/BookGrid";
import { EmptyState } from "../components/EmptyState";

export function CatalogPage({
    search,
    onSearchChange,
    category,
    language,
    onCategoryChange,
    onLanguageChange,
    categories,
    languages,
    filteredBooks,
}) {
    return (
        <div>
            <h2 className="m-0 mb-2">Catálogo</h2>

            <SearchBar value={search} onChange={onSearchChange} />

            <BookFilters
                category={category}
                language={language}
                onCategoryChange={onCategoryChange}
                onLanguageChange={onLanguageChange}
                categories={categories}
                languages={languages}
            />

            {filteredBooks.length === 0 ? (
                <EmptyState
                    title="No encontramos libros"
                    text="Prueba cambiando la búsqueda o los filtros."
                />
            ) : (
                <BookGrid books={filteredBooks} />
            )}
        </div>
    );
}
