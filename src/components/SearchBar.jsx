export function SearchBar({ value, onChange, placeholder = "Buscar por título, autor, categoría o ISBN..." }) {
    return (
        <div className="my-4">
            <input
                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-color"
                style={{ borderColor: 'var(--border-color)', backgroundColor: 'var(--surface-color)' }}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
            />
        </div>
    );
}