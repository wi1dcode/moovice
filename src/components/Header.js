import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <nav className="navbar navbar-expand-lg  navbar-dark bg-dark">
        <Link to={`/`} className="navbar-brand" href="#">
          Moovice
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item active">
              <Link to={`/weekly`} className="nav-link" href="#">
                Weekly
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/popular`} className="nav-link" href="#">
                Popular
              </Link>
            </li>
            <li className="nav-item">
              <Link to={`/favorites`} className="nav-link" href="#">
                Favorites
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  )
}

export default Header
