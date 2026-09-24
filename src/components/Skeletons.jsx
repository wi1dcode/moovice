import styles from "./Skeletons.module.css"

export const CardSkeleton = () => (
  <div className={styles.card}>
    <div className={`${styles.shimmer} ${styles.poster}`} />
    <div className={`${styles.shimmer} ${styles.line}`} />
    <div className={`${styles.shimmer} ${styles.lineShort}`} />
  </div>
)

export const RowSkeleton = ({ count = 6 }) => (
  <div className={styles.row}>
    {Array.from({ length: count }).map((_, index) => (
      <CardSkeleton key={index} />
    ))}
  </div>
)

export const HeroSkeleton = () => (
  <div className={`${styles.shimmer} ${styles.hero}`} />
)

export const DetailsSkeleton = () => (
  <div className={styles.details}>
    <div className={`${styles.shimmer} ${styles.backdrop}`} />
    <div className={styles.detailsBody}>
      <div className={`${styles.shimmer} ${styles.detailsPoster}`} />
      <div className={styles.detailsInfo}>
        <div className={`${styles.shimmer} ${styles.line}`} />
        <div className={`${styles.shimmer} ${styles.lineShort}`} />
        <div className={`${styles.shimmer} ${styles.lineShort}`} />
      </div>
    </div>
  </div>
)
