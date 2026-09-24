import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import TVShows from "./pages/TVShows"
import Trending from "./pages/Trending"
import Search from "./pages/Search"
import Favorites from "./pages/Favorites"
import MovieDetails from "./pages/MovieDetails"
import TVDetails from "./pages/TVDetails"
import PersonDetails from "./pages/PersonDetails"
import NotFound from "./pages/NotFound"

const Layout = () => {
  const location = useLocation()
  const isNotFound = ![
    "/",
    "/movies",
    "/tv",
    "/trending",
    "/search",
    "/favorites",
  ].includes(location.pathname) &&
    !location.pathname.startsWith("/movie/") &&
    !location.pathname.startsWith("/tv/") &&
    !location.pathname.startsWith("/person/")

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/tv" element={<TVShows />} />
        <Route path="/trending" element={<Trending />} />
        <Route path="/search" element={<Search />} />
        <Route path="/favorites" element={<Favorites />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
        <Route path="/tv/:id" element={<TVDetails />} />
        <Route path="/person/:id" element={<PersonDetails />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      {!isNotFound && <Footer />}
    </>
  )
}

const App = () => (
  <BrowserRouter>
    <Layout />
  </BrowserRouter>
)

export default App
