export function Modal({ title, text, onCancel, onConfirm, confirmText = "Confirmar" }) {
    return (
        <div className="modal" role="dialog" aria-modal="true">
            <div className="modal__panel">
                <h3 className="modal__title">{title}</h3>
                <p className="modal__text">{text}</p>
                <div className="modal__actions">
                    <button className="btn btn--ghost" onClick={onCancel}>Cancelar</button>
                    <button className="btn btn--primary" onClick={onConfirm}>{confirmText}</button>
                </div>
            </div>
        </div>
    );
}