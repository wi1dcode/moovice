import { Link } from "react-router-dom"

const Header = () => {
  return (
    <header>
      <nav class="navbar navbar-expand-lg  navbar-dark bg-dark">
        <Link to={`/`} class="navbar-brand" href="#">
          Moovice
        </Link>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item active">
              <Link to={`/weekly`} class="nav-link" href="#">
                Weekly
              </Link>
            </li>
            <li class="nav-item">
              <Link to={`/popular`} class="nav-link" href="#">
                Popular
              </Link>
            </li>
            <li class="nav-item">
              <Link to={`/favorites`} class="nav-link" href="#">
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
