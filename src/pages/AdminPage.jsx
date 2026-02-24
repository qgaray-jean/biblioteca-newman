import { useState } from "react";

export function AdminPage({ onAddBook }) {
    const [title, setTitle] = useState("");
    const [author, setAuthor] = useState("");

    const submit = (e) => {
        e.preventDefault();
        if (!title.trim() || !author.trim()) return;

        onAddBook({
            title: title.trim(),
            author: author.trim(),
        });

        setTitle("");
        setAuthor("");
    };

    return (
        <div>
            <h2 style={{ margin: "0 0 10px" }}>Admin (Mock)</h2>
            <div className="card">
                <form onSubmit={submit} style={{ display: "grid", gap: 10 }}>
                    <input
                        className="search__input"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Título"
                    />
                    <input
                        className="search__input"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        placeholder="Autor"
                    />
                    <button className="btn btn--primary" type="submit">
                        Agregar libro (mock)
                    </button>
                </form>
            </div>
            <p style={{ color: "#555", marginTop: 10 }}>
                Esto agrega un libro al estado en memoria (sin backend), tal como pide el mock.
            </p>
        </div>
    );
}