import { useRef } from "react"
import { Link } from "react-router-dom"
import styles from "./Row.module.css"
import { ChevronLeft, ChevronRight } from "./Icons"

const Row = ({ title, children, viewAllTo }) => {
  const trackRef = useRef(null)

  const scrollBy = (direction) => {
    const track = trackRef.current
    if (!track) return
    track.scrollBy({ left: direction * track.clientWidth * 0.85, behavior: "smooth" })
  }

  return (
    <section className={styles.row}>
      <div className={`container ${styles.head}`}>
        <h3>{title}</h3>
        {viewAllTo && (
          <Link to={viewAllTo} className={styles.viewAll}>
            View all
          </Link>
        )}
      </div>

      <div className={styles.wrapper}>
        <button
          className={`${styles.nav} ${styles.left}`}
          onClick={() => scrollBy(-1)}
          aria-label="Scroll left"
        >
          <ChevronLeft />
        </button>

        <div className={`container ${styles.track}`} ref={trackRef}>
          {children}
        </div>

        <button
          className={`${styles.nav} ${styles.right}`}
          onClick={() => scrollBy(1)}
          aria-label="Scroll right"
        >
          <ChevronRight />
        </button>
      </div>
    </section>
  )
}

export default Row
