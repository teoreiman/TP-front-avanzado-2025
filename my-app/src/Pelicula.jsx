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
    <div
      style={{
        fontFamily: "Inter, Arial, sans-serif",
        minHeight: "100vh",
        background: "#00143A",
        padding: "60px 20px",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "900px",
          padding: "40px",
          borderRadius: "12px",
          background: "#002865",
          boxShadow: "0 8px 30px rgba(0,0,0,0.4)",
          color: "white",
          border: "3px solid #F7C325",
        }}
      >
        <h1
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontSize: "36px",
            fontWeight: "700",
            letterSpacing: "1px",
            color: "#F7C325",
          }}
        >
          Buscador de peliculas reiman
        </h1>

        <div
          style={{
            display: "flex",
            gap: "12px",
            marginBottom: "30px",
          }}
        >
          <input
            type="text"
            placeholder="Buscar película..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{
              flex: 1,
              padding: "14px",
              borderRadius: "8px",
              border: "2px solid #F7C325",
              background: "#001E4D",
              color: "white",
              fontSize: "16px",
              outline: "none",
            }}
          />
          <button
            onClick={searchMovies}
            style={{
              padding: "14px 24px",
              background: "#F7C325",
              color: "#00143A",
              border: "none",
              borderRadius: "8px",
              fontSize: "17px",
              cursor: "pointer",
              fontWeight: "700",
              boxShadow: "0 4px 12px rgba(247,195,37,0.4)",
              transition: "0.2s",
            }}
          >
            Buscar
          </button>
        </div>

        {loading && (
          <p style={{ textAlign: "center", fontSize: "18px" }}>Cargando...</p>
        )}

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "20px",
          }}
        >
          {!loading && movies.length === 0 && (
            <p
              style={{
                gridColumn: "1/-1",
                textAlign: "center",
                color: "#F7C325",
                fontSize: "18px",
                opacity: 0.75,
              }}
            >
              No hay resultados.
            </p>
          )}

          {movies.map((movie) => (
            <div
              key={movie.imdbID}
              style={{
                background: "#003891",
                borderRadius: "10px",
                overflow: "hidden",
                border: "2px solid #F7C325",
                boxShadow: "0 6px 20px rgba(0,0,0,0.3)",
                transition: "transform 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.04)")}
              onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
            >
              {movie.Poster !== "N/A" ? (
                <img
                  src={movie.Poster}
                  alt={movie.Title}
                  style={{
                    width: "100%",
                    height: "260px",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: "260px",
                    background: "#001E4D",
                  }}
                ></div>
              )}

              <div style={{ padding: "12px" }}>
                <h3
                  style={{
                    margin: 0,
                    fontSize: "16px",
                    fontWeight: "700",
                  }}
                >
                  {movie.Title}
                </h3>
                <p
                  style={{
                    margin: 0,
                    marginTop: "6px",
                    opacity: 0.8,
                    fontSize: "14px",
                  }}
                >
                  {movie.Year}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
