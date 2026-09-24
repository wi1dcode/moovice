import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { tmdb } from "../api/tmdb"
import MovieCard from "../components/MovieCard"
import PersonCard from "../components/PersonCard"
import { RowSkeleton } from "../components/Skeletons"
import styles from "./Search.module.css"

const filters = [
  { key: "all", label: "All" },
  { key: "movie", label: "Movies" },
  { key: "tv", label: "TV Shows" },
  { key: "person", label: "People" },
]

const Search = () => {
  const [params] = useSearchParams()
  const query = params.get("q") || ""
  const [results, setResults] = useState(null)
  const [filter, setFilter] = useState("all")

  useEffect(() => {
    setResults(null)
    setFilter("all")
    document.title = `Search "${query}" — Moovice`

    if (!query) {
      setResults([])
      return
    }

    tmdb.searchMulti(query).then((data) => {
      setResults(data.results.filter((item) => item.media_type !== "collection"))
    })
  }, [query])

  const visible = results
    ? filter === "all"
      ? results
      : results.filter((item) => item.media_type === filter)
    : null

  return (
    <div className={`container ${styles.page}`}>
      <h1>
        {query ? (
          <>
            Results for <span>“{query}”</span>
          </>
        ) : (
          "Search Moovice"
        )}
      </h1>

      <div className={styles.filters}>
        {filters.map((item) => (
          <button
            key={item.key}
            className={`${styles.filter} ${filter === item.key ? styles.active : ""}`}
            onClick={() => setFilter(item.key)}
          >
            {item.label}
          </button>
        ))}
      </div>

      {!results && <RowSkeleton count={8} />}

      {results && visible.length === 0 && (
        <p className={styles.empty}>
          {query ? "No results found. Try a different search." : "Start typing to search for movies, TV shows and people."}
        </p>
      )}

      <div className={styles.grid}>
        {visible?.map((item) =>
          item.media_type === "person" ? (
            <PersonCard key={`${item.id}-person`} person={item} role="Actor" />
          ) : (
            <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
          )
        )}
      </div>
    </div>
  )
}

export default Search
