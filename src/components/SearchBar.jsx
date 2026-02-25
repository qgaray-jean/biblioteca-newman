export function SearchBar({
    value,
    onChange,
    placeholder = "Buscar por título, autor, categoría o ISBN...",
}) {
    return (
        <div className="search">
            <input
                className="search__input"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}
