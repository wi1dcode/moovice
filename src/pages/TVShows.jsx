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
  { value: "first_air_date.desc", label: "Newest" },
]

const TVShows = () => {
  const [params, setParams] = useSearchParams()
  const genre = params.get("genre") ? Number(params.get("genre")) : null
  const [sortBy, setSortBy] = useState("popularity.desc")
  const [genres, setGenres] = useState([])
  const [shows, setShows] = useState([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    document.title = "TV Shows — Moovice"
    tmdb.genresTV().then((data) => setGenres(data.genres))
  }, [])

  useEffect(() => {
    setPage(1)
    setShows([])
    setLoading(true)
    tmdb.discoverTV({ genre, sortBy, page: 1 }).then((data) => {
      setShows(data.results)
      setLoading(false)
    })
  }, [genre, sortBy])

  const loadMore = () => {
    const nextPage = page + 1
    setLoading(true)
    tmdb.discoverTV({ genre, sortBy, page: nextPage }).then((data) => {
      setShows((current) => [...current, ...data.results])
      setPage(nextPage)
      setLoading(false)
    })
  }

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1>TV Shows</h1>
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
        {shows.map((show) => (
          <MovieCard key={show.id} item={{ ...show, media_type: "tv" }} />
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

export default TVShows
