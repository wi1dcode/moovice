import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { tmdb, profileUrl } from "../api/tmdb"
import Row from "../components/Row"
import MovieCard from "../components/MovieCard"
import { DetailsSkeleton } from "../components/Skeletons"
import { CalendarIcon, CompassIcon } from "../components/Icons"
import { formatDate, truncate } from "../utils/format"
import styles from "./PersonDetails.module.css"

const PersonDetails = () => {
  const { id } = useParams()
  const [person, setPerson] = useState(null)
  const [expanded, setExpanded] = useState(false)

  useEffect(() => {
    setPerson(null)
    setExpanded(false)
    window.scrollTo(0, 0)
    tmdb.personDetails(id).then((data) => {
      setPerson(data)
      document.title = `${data.name} — Moovice`
    })
  }, [id])

  if (!person) return <div className="container"><DetailsSkeleton /></div>

  const credits = (person.combined_credits?.cast || [])
    .filter((credit) => credit.poster_path)
    .sort((a, b) => (b.popularity || 0) - (a.popularity || 0))
    .slice(0, 18)

  const biography = person.biography || "No biography available."

  return (
    <div>
      <div className={`container ${styles.body}`}>
        <img
          className={styles.photo}
          src={profileUrl(person.profile_path, "w500")}
          alt={person.name}
        />

        <div className={styles.info}>
          <h1>{person.name}</h1>

          <div className={styles.meta}>
            {person.birthday && (
              <span className={styles.metaItem}>
                <CalendarIcon /> {formatDate(person.birthday)}
              </span>
            )}
            {person.place_of_birth && (
              <span className={styles.metaItem}>
                <CompassIcon /> {person.place_of_birth}
              </span>
            )}
          </div>

          <h3 className={styles.sectionTitle}>Biography</h3>
          <p className={styles.bio}>
            {expanded ? biography : truncate(biography, 500)}
          </p>
          {biography.length > 500 && (
            <button className={styles.more} onClick={() => setExpanded((value) => !value)}>
              {expanded ? "Show less" : "Read more"}
            </button>
          )}
        </div>
      </div>

      {credits.length > 0 && (
        <Row title="Known For">
          {credits.map((credit) => (
            <MovieCard key={`${credit.id}-${credit.media_type}`} item={credit} />
          ))}
        </Row>
      )}
    </div>
  )
}

export default PersonDetails
