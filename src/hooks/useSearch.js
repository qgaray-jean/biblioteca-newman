import { useState, useEffect } from "react";

export function useSearch(books) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [results, setResults] = useState(books);

  useEffect(() => {
    const q = query.toLowerCase();
    setResults(books.filter(b => {
      const ok = !q || b.title.toLowerCase().includes(q) || b.author.toLowerCase().includes(q) ||
        b.isbn10.includes(q) || b.isbn13.includes(q) || b.synopsis.toLowerCase().includes(q) ||
        b.language.toLowerCase().includes(q) || b.category.toLowerCase().includes(q);
      return ok && (category === "all" || b.category === category);
    }));
  }, [query, category, books]);

  return { query, setQuery, category, setCategory, results };
}
