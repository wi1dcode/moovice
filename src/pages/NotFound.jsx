import { Link } from "react-router-dom"
import styles from "./NotFound.module.css"
import { CompassIcon } from "../components/Icons"

const NotFound = () => (
  <div className={styles.page}>
    <div className={styles.glow} />
    <span className={styles.icon}>
      <CompassIcon />
    </span>
    <h1>404</h1>
    <p>This page drifted off the map. Let's get you back on track.</p>
    <Link to="/" className={styles.home}>
      Back to Home
    </Link>
  </div>
)

export default NotFound
