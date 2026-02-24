export function EmptyState({ title = "Sin resultados", text = "No hay elementos para mostrar." }) {
    return (
        <div className="empty">
            <div style={{ fontWeight: 900, marginBottom: 6 }}>{title}</div>
            <div>{text}</div>
        </div>
    );
}