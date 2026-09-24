import { useState } from "react"
import { Link } from "react-router-dom"
import styles from "./Hero.module.css"
import RatingRing from "./RatingRing"
import TrailerModal from "./TrailerModal"
import { PlayIcon, HeartIcon, CalendarIcon } from "./Icons"
import { backdropUrl } from "../api/tmdb"
import { titleOf, dateOf, mediaTypeOf, formatYear, truncate } from "../utils/format"
import { useFavorites } from "../context/FavoritesContext"

const Hero = ({ item, trailerKey }) => {
  const [showTrailer, setShowTrailer] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  if (!item) return null

  const mediaType = mediaTypeOf(item)
  const title = titleOf(item)
  const favorite = isFavorite(item.id, mediaType)

  return (
    <section
      className={styles.hero}
      style={{ backgroundImage: `url(${backdropUrl(item.backdrop_path, "w1280")})` }}
    >
      <div className={styles.scrim} />

      <div className={`container ${styles.content}`}>
        <span className={styles.tag}>Featured {mediaType === "tv" ? "Series" : "Film"}</span>
        <h1>{title}</h1>

        <div className={styles.meta}>
          <RatingRing score={item.vote_average} size={40} />
          <span className={styles.metaItem}>
            <CalendarIcon /> {formatYear(dateOf(item))}
          </span>
        </div>

        <p>{truncate(item.overview, 220)}</p>

        <div className={styles.actions}>
          {trailerKey && (
            <button className={styles.play} onClick={() => setShowTrailer(true)}>
              <PlayIcon /> Watch Trailer
            </button>
          )}
          <Link to={`/${mediaType}/${item.id}`} className={styles.details}>
            View Details
          </Link>
          <button
            className={`${styles.favorite} ${favorite ? styles.active : ""}`}
            onClick={() =>
              toggleFavorite({
                id: item.id,
                mediaType,
                title,
                poster_path: item.poster_path,
                vote_average: item.vote_average,
                release_date: dateOf(item),
              })
            }
            aria-label="Toggle favorite"
          >
            <HeartIcon filled={favorite} />
          </button>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal videoKey={trailerKey} onClose={() => setShowTrailer(false)} />
      )}
    </section>
  )
}

export default Hero
