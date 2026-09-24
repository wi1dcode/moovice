import { Link } from "react-router-dom"
import styles from "./MovieCard.module.css"
import RatingRing from "./RatingRing"
import { HeartIcon } from "./Icons"
import { posterUrl } from "../api/tmdb"
import { titleOf, dateOf, mediaTypeOf, formatYear } from "../utils/format"
import { useFavorites } from "../context/FavoritesContext"

const MovieCard = ({ item }) => {
  const { isFavorite, toggleFavorite } = useFavorites()
  const mediaType = mediaTypeOf(item)
  const title = titleOf(item)
  const year = formatYear(dateOf(item))
  const favorite = isFavorite(item.id, mediaType)

  const handleFavorite = (event) => {
    event.preventDefault()
    toggleFavorite({
      id: item.id,
      mediaType,
      title,
      poster_path: item.poster_path,
      vote_average: item.vote_average,
      release_date: dateOf(item),
    })
  }

  return (
    <Link to={`/${mediaType}/${item.id}`} className={styles.card}>
      <div className={styles.poster}>
        {item.poster_path ? (
          <img src={posterUrl(item.poster_path)} alt={title} loading="lazy" />
        ) : (
          <div className={styles.placeholder}>{title}</div>
        )}

        <button
          className={`${styles.favorite} ${favorite ? styles.active : ""}`}
          onClick={handleFavorite}
          aria-label="Toggle favorite"
        >
          <HeartIcon filled={favorite} />
        </button>

        <div className={styles.overlay}>
          <RatingRing score={item.vote_average} size={44} />
        </div>
      </div>

      <div className={styles.info}>
        <h4>{title}</h4>
        <span>{year || "TBA"}</span>
      </div>
    </Link>
  )
}

export default MovieCard
