import { Link } from "react-router-dom"
import styles from "./PersonCard.module.css"
import { profileUrl } from "../api/tmdb"

const PersonCard = ({ person, role }) => (
  <Link to={`/person/${person.id}`} className={styles.card}>
    <div className={styles.photo}>
      {person.profile_path ? (
        <img src={profileUrl(person.profile_path)} alt={person.name} loading="lazy" />
      ) : (
        <div className={styles.placeholder}>{person.name}</div>
      )}
    </div>
    <h5>{person.name}</h5>
    <span>{role || person.character || person.job}</span>
  </Link>
)

export default PersonCard
