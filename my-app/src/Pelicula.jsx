import { useState } from "react";

export default function Pelicula() {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  async function searchMovies() {
    if (!query.trim()) return;

    setLoading(true);

    const res = await fetch(
      `https://www.omdbapi.com/?apikey=4a3b711b&s=${query}`
    );
    const data = await res.json();

    setMovies(data.Search || []);
    setLoading(false);
  }

  return (
    <div style={{ padding: 20 }}>
      <h1>Buscador de Películas</h1>

      <div style={{ display: "flex", gap: 10 }}>
        <input
          type="text"
          placeholder="Buscar película..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
        <button onClick={searchMovies}>Buscar</button>
      </div>

      {loading && <p>Cargando...</p>}

      <div style={{ marginTop: 20 }}>
        {movies.length === 0 && !loading && <p>No hay resultados.</p>}

        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            style={{
              background: "#832d2dff",
              padding: 10,
              borderRadius: 8,
              marginBottom: 10,
            }}
          >
            <strong>{movie.Title}</strong> ({movie.Year})
          </div>
        ))}
      </div>
    </div>
  );
}
