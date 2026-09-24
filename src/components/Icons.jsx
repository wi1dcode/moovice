export const SearchIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" {...props}>
    <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
    <path d="M20 20L16.5 16.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const CloseIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" {...props}>
    <path d="M6 6L18 18M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const MenuIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" {...props}>
    <path d="M4 7H20M4 12H20M4 17H20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" {...props}>
    <path d="M7 5.5V18.5L18.5 12L7 5.5Z" fill="currentColor" />
  </svg>
)

export const StarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...props}>
    <path
      d="M12 3L14.6 9.2L21.3 9.8L16.2 14.2L17.8 20.8L12 17.2L6.2 20.8L7.8 14.2L2.7 9.8L9.4 9.2L12 3Z"
      fill="currentColor"
    />
  </svg>
)

export const HeartIcon = ({ filled, ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" {...props}>
    <path
      d="M12 20.5C12 20.5 3.5 15.2 3.5 9.3C3.5 6.4 5.8 4.2 8.6 4.2C10.2 4.2 11.3 4.9 12 5.8C12.7 4.9 13.8 4.2 15.4 4.2C18.2 4.2 20.5 6.4 20.5 9.3C20.5 15.2 12 20.5 12 20.5Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)

export const ChevronLeft = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" {...props}>
    <path d="M15 5L8 12L15 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ChevronRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" {...props}>
    <path d="M9 5L16 12L9 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const ClockIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M12 7V12L15.5 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const CalendarIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="16" height="16" {...props}>
    <rect x="3.5" y="5" width="17" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M3.5 10H20.5" stroke="currentColor" strokeWidth="2" />
    <path d="M8 3V6.5M16 3V6.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

export const ArrowUpIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" {...props}>
    <path d="M12 19V5M12 5L6 11M12 5L18 11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const FilmIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 4V20M16 4V20M3 9H8M3 15H8M16 9H21M16 15H21" stroke="currentColor" strokeWidth="2" />
  </svg>
)

export const TvIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" {...props}>
    <rect x="3" y="6" width="18" height="13" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M8 21H16M9 3L12 6L15 3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

export const FireIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" {...props}>
    <path
      d="M12 2.5C12 2.5 7 7 7 12.5C7 15.5 9 17 9 17C9 17 8 15 9 13C9.5 15.5 11 16.5 11 16.5C10.5 15 11 13 12 12C11.5 14 12.5 15.5 13.5 16C14.5 16.5 15 18 14.5 19C17 18 17 15 17 13.5C17 9 14 6.5 14 6.5C14.3 8 13.5 9 13.5 9C13.7 6 12 2.5 12 2.5Z"
      fill="currentColor"
    />
  </svg>
)

export const CompassIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" width="22" height="22" {...props}>
    <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
    <path d="M15 9L13 13L9 15L11 11L15 9Z" fill="currentColor" />
  </svg>
)

export const BookmarkIcon = ({ filled, ...props }) => (
  <svg viewBox="0 0 24 24" fill="none" width="20" height="20" {...props}>
    <path
      d="M6 3.5H18V21L12 17L6 21V3.5Z"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
  </svg>
)
