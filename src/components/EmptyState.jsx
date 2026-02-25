export function EmptyState({ title = "Sin resultados", text = "No hay elementos para mostrar." }) {
    return (
        <div className="empty">
            <div className="font-black mb-1.5">{title}</div>
            <div>{text}</div>
        </div>
    );
}