import { useEffect, useState } from "react"
import { tmdb } from "../api/tmdb"
import MovieCard from "../components/MovieCard"
import { RowSkeleton } from "../components/Skeletons"
import styles from "./Trending.module.css"

const mediaTypes = [
  { value: "all", label: "All" },
  { value: "movie", label: "Movies" },
  { value: "tv", label: "TV Shows" },
]

const windows = [
  { value: "day", label: "Today" },
  { value: "week", label: "This Week" },
]

const Trending = () => {
  const [mediaType, setMediaType] = useState("all")
  const [timeWindow, setTimeWindow] = useState("week")
  const [items, setItems] = useState(null)

  useEffect(() => {
    document.title = "Trending — Moovice"
  }, [])

  useEffect(() => {
    setItems(null)
    tmdb.trending(mediaType, timeWindow).then((data) => setItems(data.results))
  }, [mediaType, timeWindow])

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1>Trending</h1>
      </div>

      <div className={styles.controls}>
        {mediaTypes.map((option) => (
          <button
            key={option.value}
            className={`${styles.toggle} ${mediaType === option.value ? styles.active : ""}`}
            onClick={() => setMediaType(option.value)}
          >
            {option.label}
          </button>
        ))}

        <span className={styles.divider} />

        {windows.map((option) => (
          <button
            key={option.value}
            className={`${styles.toggle} ${timeWindow === option.value ? styles.active : ""}`}
            onClick={() => setTimeWindow(option.value)}
          >
            {option.label}
          </button>
        ))}
      </div>

      <div className={styles.grid}>
        {items?.map((item) => (
          <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
        ))}
      </div>

      {!items && <RowSkeleton count={10} />}
    </div>
  )
}

export default Trending
