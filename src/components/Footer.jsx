import { Link } from "react-router-dom"
import styles from "./Footer.module.css"

const Footer = () => (
  <footer className={styles.footer}>
    <div className={`container ${styles.inner}`}>
      <Link to="/" className={styles.brand}>
        Moovice
      </Link>

      <nav className={styles.links}>
        <Link to="/movies">Movies</Link>
        <Link to="/tv">TV Shows</Link>
        <Link to="/trending">Trending</Link>
        <Link to="/favorites">Favorites</Link>
      </nav>
    </div>
  </footer>
)

export default Footer
