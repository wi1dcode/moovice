import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { tmdb, backdropUrl, posterUrl } from "../api/tmdb"
import RatingRing from "../components/RatingRing"
import PersonCard from "../components/PersonCard"
import Row from "../components/Row"
import MovieCard from "../components/MovieCard"
import TrailerModal from "../components/TrailerModal"
import { DetailsSkeleton } from "../components/Skeletons"
import { PlayIcon, HeartIcon, ClockIcon, CalendarIcon } from "../components/Icons"
import { formatDate, formatRuntime, formatMoney } from "../utils/format"
import { useFavorites } from "../context/FavoritesContext"
import styles from "./Details.module.css"

const MovieDetails = () => {
  const { id } = useParams()
  const [movie, setMovie] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    setMovie(null)
    window.scrollTo(0, 0)
    tmdb.movieDetails(id).then((data) => {
      setMovie(data)
      document.title = `${data.title} — Moovice`
    })
  }, [id])

  if (!movie) return <div className="container"><DetailsSkeleton /></div>

  const trailer = movie.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )
  const director = movie.credits?.crew?.find((person) => person.job === "Director")
  const cast = movie.credits?.cast?.slice(0, 12) || []
  const similar = movie.similar?.results?.slice(0, 12) || []
  const recommendations = movie.recommendations?.results?.slice(0, 12) || []
  const favorite = isFavorite(movie.id, "movie")

  return (
    <div>
      <div
        className={styles.backdrop}
        style={{ backgroundImage: `url(${backdropUrl(movie.backdrop_path, "w1280")})` }}
      >
        <div className={styles.backdropScrim} />
      </div>

      <div className={`container ${styles.body}`}>
        <img
          className={styles.poster}
          src={posterUrl(movie.poster_path, "w500")}
          alt={movie.title}
        />

        <div className={styles.info}>
          <h1>{movie.title}</h1>
          {movie.tagline && <p className={styles.tagline}>{movie.tagline}</p>}

          <div className={styles.genres}>
            {movie.genres.map((genre) => (
              <Link key={genre.id} to={`/movies?genre=${genre.id}`} className={styles.genre}>
                {genre.name}
              </Link>
            ))}
          </div>

          <div className={styles.meta}>
            <RatingRing score={movie.vote_average} size={54} />
            <span className={styles.metaItem}>
              <CalendarIcon /> {formatDate(movie.release_date)}
            </span>
            {movie.runtime > 0 && (
              <span className={styles.metaItem}>
                <ClockIcon /> {formatRuntime(movie.runtime)}
              </span>
            )}
          </div>

          <div className={styles.actions}>
            {trailer && (
              <button className={styles.play} onClick={() => setShowTrailer(true)}>
                <PlayIcon /> Watch Trailer
              </button>
            )}
            <button
              className={`${styles.favorite} ${favorite ? styles.active : ""}`}
              onClick={() =>
                toggleFavorite({
                  id: movie.id,
                  mediaType: "movie",
                  title: movie.title,
                  poster_path: movie.poster_path,
                  vote_average: movie.vote_average,
                  release_date: movie.release_date,
                })
              }
            >
              <HeartIcon filled={favorite} />
              {favorite ? "In Favorites" : "Add to Favorites"}
            </button>
          </div>

          <h3 className={styles.sectionTitle}>Overview</h3>
          <p className={styles.overview}>{movie.overview}</p>

          <div className={styles.factGrid}>
            <div>
              <span>Status</span>
              <strong>{movie.status}</strong>
            </div>
            <div>
              <span>Original Language</span>
              <strong>{movie.original_language?.toUpperCase()}</strong>
            </div>
            <div>
              <span>Budget</span>
              <strong>{formatMoney(movie.budget)}</strong>
            </div>
            <div>
              <span>Revenue</span>
              <strong>{formatMoney(movie.revenue)}</strong>
            </div>
            {director && (
              <div>
                <span>Director</span>
                <strong>{director.name}</strong>
              </div>
            )}
          </div>
        </div>
      </div>

      {cast.length > 0 && (
        <Row title="Top Cast">
          {cast.map((person) => (
            <PersonCard key={person.id} person={person} />
          ))}
        </Row>
      )}

      {recommendations.length > 0 && (
        <Row title="Recommended For You">
          {recommendations.map((item) => (
            <MovieCard key={item.id} item={{ ...item, media_type: "movie" }} />
          ))}
        </Row>
      )}

      {similar.length > 0 && (
        <Row title="More Like This">
          {similar.map((item) => (
            <MovieCard key={item.id} item={{ ...item, media_type: "movie" }} />
          ))}
        </Row>
      )}

      {showTrailer && (
        <TrailerModal videoKey={trailer.key} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  )
}

export default MovieDetails
