import { useEffect, useState } from "react"
import { useSearchParams } from "react-router-dom"
import { tmdb } from "../api/tmdb"
import MovieCard from "../components/MovieCard"
import GenreChips from "../components/GenreChips"
import { RowSkeleton } from "../components/Skeletons"
import styles from "./Browse.module.css"

const sortOptions = [
  { value: "popularity.desc", label: "Most Popular" },
  { value: "vote_average.desc", label: "Top Rated" },
  { value: "primary_release_date.desc", label: "Newest" },
  { value: "revenue.desc", label: "Highest Grossing" },
]

const Movies = () => {
  const [params, setParams] = useSearchParams()
  const genre = params.get("genre") ? Number(params.get("genre")) : null
  const [sortBy, setSortBy] = useState("popularity.desc")
  const [genres, setGenres] = useState([])
  const [movies, setMovies] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "Movies — Moovice"
    tmdb.genresMovie().then((data) => setGenres(data.genres))
  }, [])

  useEffect(() => {
    setPage(1)
    setMovies([])
    setLoading(true)
    tmdb.discoverMovies({ genre, sortBy, page: 1 }).then((data) => {
      setMovies(data.results)
      setLoading(false)
    })
  }, [genre, sortBy])

  const loadMore = () => {
    const nextPage = page + 1
    setLoading(true)
    tmdb.discoverMovies({ genre, sortBy, page: nextPage }).then((data) => {
      setMovies((current) => [...current, ...data.results])
      setPage(nextPage)
      setLoading(false)
    })
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1>Movies</h1>
        <select
          className={styles.select}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          {sortOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <GenreChips
        genres={genres}
        activeId={genre}
        onSelect={(id) => setParams(id ? { genre: id } : {})}
      />

      <div className={styles.grid}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} item={{ ...movie, media_type: "movie" }} />
        ))}
      </div>

      {loading && <RowSkeleton count={8} />}

      {!loading && (
        <button className={styles.more} onClick={loadMore}>
          Load More
        </button>
      )}
    </div>
  )
}

export default Movies
