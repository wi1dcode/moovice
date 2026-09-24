import { useEffect } from "react"
import styles from "./TrailerModal.module.css"
import { CloseIcon } from "./Icons"

const TrailerModal = ({ videoKey, onClose }) => {
  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") onClose()
    }
    document.addEventListener("keydown", onKeyDown)
    document.body.style.overflow = "hidden"
    return () => {
      document.removeEventListener("keydown", onKeyDown)
      document.body.style.overflow = ""
    }
  }, [onClose])

  if (!videoKey) return null

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.frame} onClick={(event) => event.stopPropagation()}>
        <button className={styles.close} onClick={onClose} aria-label="Close trailer">
          <CloseIcon />
        </button>
        <iframe
          src={`https://www.youtube.com/embed/${videoKey}?autoplay=1`}
          title="Trailer"
          allow="autoplay; encrypted-media; picture-in-picture"
          allowFullScreen
        />
      </div>
    </div>
  )
}

export default TrailerModal
