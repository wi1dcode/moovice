import styles from "./RatingRing.module.css"
import { ratingTone } from "../utils/format"

const RatingRing = ({ score = 0, size = 48 }) => {
  const percent = Math.round(score * 10)
  const radius = 18
  const circumference = 2 * Math.PI * radius
  const offset = circumference - (percent / 100) * circumference
  const tone = ratingTone(score)

  return (
    <div
      className={`${styles.ring} ${styles[tone]}`}
      style={{ width: size, height: size }}
    >
      <svg viewBox="0 0 40 40">
        <circle cx="20" cy="20" r={radius} className={styles.track} />
        <circle
          cx="20"
          cy="20"
          r={radius}
          className={styles.progress}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <span className={styles.value}>{percent}</span>
    </div>
  )
}

export default RatingRing
