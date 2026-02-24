export function BookFilters({
                                category,
                                language,
                                onCategoryChange,
                                onLanguageChange,
                                categories,
                                languages,
                            }) {
    return (
        <div className="filters">
            <select
                className="filters__select"
                value={category}
                onChange={(e) => onCategoryChange(e.target.value)}
            >
                <option value="">Todas las categorías</option>
                {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                ))}
            </select>

            <select
                className="filters__select"
                value={language}
                onChange={(e) => onLanguageChange(e.target.value)}
            >
                <option value="">Todos los idiomas</option>
                {languages.map((l) => (
                    <option key={l} value={l}>{l}</option>
                ))}
            </select>
        </div>
    );
}