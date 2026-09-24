import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { tmdb, backdropUrl, posterUrl } from "../api/tmdb"
import RatingRing from "../components/RatingRing"
import PersonCard from "../components/PersonCard"
import Row from "../components/Row"
import MovieCard from "../components/MovieCard"
import TrailerModal from "../components/TrailerModal"
import { DetailsSkeleton } from "../components/Skeletons"
import { PlayIcon, HeartIcon, CalendarIcon, TvIcon } from "../components/Icons"
import { formatDate } from "../utils/format"
import { useFavorites } from "../context/FavoritesContext"
import styles from "./Details.module.css"

const TVDetails = () => {
  const { id } = useParams()
  const [show, setShow] = useState(null)
  const [showTrailer, setShowTrailer] = useState(false)
  const { isFavorite, toggleFavorite } = useFavorites()

  useEffect(() => {
    setShow(null)
    window.scrollTo(0, 0)
    tmdb.tvDetails(id).then((data) => {
      setShow(data)
      document.title = `${data.name} — Moovice`
    })
  }, [id])

  if (!show) return <div className="container"><DetailsSkeleton /></div>

  const trailer = show.videos?.results?.find(
    (video) => video.type === "Trailer" && video.site === "YouTube"
  )
  const creator = show.created_by?.[0]
  const cast = show.credits?.cast?.slice(0, 12) || []
  const similar = show.similar?.results?.slice(0, 12) || []
  const recommendations = show.recommendations?.results?.slice(0, 12) || []
  const favorite = isFavorite(show.id, "tv")

  return (
    <div>
      <div
        className={styles.backdrop}
        style={{ backgroundImage: `url(${backdropUrl(show.backdrop_path, "w1280")})` }}
      >
        <div className={styles.backdropScrim} />
      </div>

      <div className={`container ${styles.body}`}>
        <img
          className={styles.poster}
          src={posterUrl(show.poster_path, "w500")}
          alt={show.name}
        />

        <div className={styles.info}>
          <h1>{show.name}</h1>
          {show.tagline && <p className={styles.tagline}>{show.tagline}</p>}

          <div className={styles.genres}>
            {show.genres.map((genre) => (
              <Link key={genre.id} to={`/tv?genre=${genre.id}`} className={styles.genre}>
                {genre.name}
              </Link>
            ))}
          </div>

          <div className={styles.meta}>
            <RatingRing score={show.vote_average} size={54} />
            <span className={styles.metaItem}>
              <CalendarIcon /> {formatDate(show.first_air_date)}
            </span>
            <span className={styles.metaItem}>
              <TvIcon /> {show.number_of_seasons} Season
              {show.number_of_seasons !== 1 ? "s" : ""}
            </span>
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
                  id: show.id,
                  mediaType: "tv",
                  title: show.name,
                  poster_path: show.poster_path,
                  vote_average: show.vote_average,
                  release_date: show.first_air_date,
                })
              }
            >
              <HeartIcon filled={favorite} />
              {favorite ? "In Favorites" : "Add to Favorites"}
            </button>
          </div>

          <h3 className={styles.sectionTitle}>Overview</h3>
          <p className={styles.overview}>{show.overview}</p>

          <div className={styles.factGrid}>
            <div>
              <span>Status</span>
              <strong>{show.status}</strong>
            </div>
            <div>
              <span>Original Language</span>
              <strong>{show.original_language?.toUpperCase()}</strong>
            </div>
            <div>
              <span>Episodes</span>
              <strong>{show.number_of_episodes}</strong>
            </div>
            <div>
              <span>Networks</span>
              <strong>{show.networks?.[0]?.name || "N/A"}</strong>
            </div>
            {creator && (
              <div>
                <span>Creator</span>
                <strong>{creator.name}</strong>
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
            <MovieCard key={item.id} item={{ ...item, media_type: "tv" }} />
          ))}
        </Row>
      )}

      {similar.length > 0 && (
        <Row title="More Like This">
          {similar.map((item) => (
            <MovieCard key={item.id} item={{ ...item, media_type: "tv" }} />
          ))}
        </Row>
      )}

      {showTrailer && (
        <TrailerModal videoKey={trailer.key} onClose={() => setShowTrailer(false)} />
      )}
    </div>
  )
}

export default TVDetails
