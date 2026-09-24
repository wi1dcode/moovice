import styles from "./GenreChips.module.css"

const GenreChips = ({ genres, activeId, onSelect }) => (
  <div className={styles.chips}>
    <button
      className={`${styles.chip} ${!activeId ? styles.active : ""}`}
      onClick={() => onSelect(null)}
    >
      All
    </button>
    {genres.map((genre) => (
      <button
        key={genre.id}
        className={`${styles.chip} ${activeId === genre.id ? styles.active : ""}`}
        onClick={() => onSelect(genre.id)}
      >
        {genre.name}
      </button>
    ))}
  </div>
)

export default GenreChips
