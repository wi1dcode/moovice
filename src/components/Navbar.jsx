import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import { SearchIcon, MenuIcon, CloseIcon } from "./Icons"

const links = [
  { to: "/movies", label: "Movies" },
  { to: "/tv", label: "TV Shows" },
  { to: "/trending", label: "Trending" },
  { to: "/favorites", label: "Favorites" },
]

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [query, setQuery] = useState("")
  const navigate = useNavigate()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  const handleSearch = (event) => {
    event.preventDefault()
    if (!query.trim()) return
    navigate(`/search?q=${encodeURIComponent(query.trim())}`)
    setMenuOpen(false)
  }

  return (
    <header className={`${styles.header} ${scrolled ? styles.scrolled : ""}`}>
      <div className={`container ${styles.bar}`}>
        <Link to="/" className={styles.brand}>
          Moovice
        </Link>

        <nav className={`${styles.links} ${menuOpen ? styles.open : ""}`}>
          {links.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={styles.link}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <form className={styles.searchMobile} onSubmit={handleSearch}>
            <SearchIcon />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search movies, shows, people"
            />
          </form>
        </nav>

        <form className={styles.search} onSubmit={handleSearch}>
          <SearchIcon />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search movies, shows, people"
          />
        </form>

        <button
          className={styles.toggle}
          onClick={() => setMenuOpen((open) => !open)}
          aria-label="Toggle navigation"
        >
          {menuOpen ? <CloseIcon /> : <MenuIcon />}
        </button>
      </div>
    </header>
  )
}

export default Navbar
