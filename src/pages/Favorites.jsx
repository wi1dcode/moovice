import { useEffect } from "react"
import { Link } from "react-router-dom"
import MovieCard from "../components/MovieCard"
import { useFavorites } from "../context/FavoritesContext"
import styles from "./Browse.module.css"

const Favorites = () => {
  const { favorites } = useFavorites()

  useEffect(() => {
    document.title = "Favorites — Moovice"
  }, [])

  return (
    <div className={`container ${styles.page}`}>
      <div className={styles.head}>
        <h1>Your Favorites</h1>
      </div>

      {favorites.length === 0 ? (
        <p className={styles.empty}>
          Nothing saved yet. Browse{" "}
          <Link to="/movies" className={styles.emptyLink}>
            movies
          </Link>{" "}
          or{" "}
          <Link to="/tv" className={styles.emptyLink}>
            TV shows
          </Link>{" "}
          and tap the heart icon to add them here.
        </p>
      ) : (
        <div className={styles.grid}>
          {favorites.map((item) => (
            <MovieCard
              key={`${item.id}-${item.mediaType}`}
              item={{
                id: item.id,
                media_type: item.mediaType,
                title: item.title,
                name: item.title,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                release_date: item.release_date,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}

export default Favorites
