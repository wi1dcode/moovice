import { useEffect, useState } from "react"
import Card from "../components/Card"

const Favorites = () => {
  const [favoriteMovies, setFavoriteMovies] = useState([])

  useEffect(() => {
    let favoriteIdsArray

    if (localStorage.favoriteIds) {
      const localStorageIds = localStorage.getItem("favoriteIds")
      favoriteIdsArray = JSON.parse(localStorageIds)

      const favorite = [...favoriteMovies]

      favoriteIdsArray.map((id) => {
        fetchFavs(id, favorite)
      })
    }
  }, [])

  const fetchFavs = async (id, favorite) => {
    const request = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=5182998fc607727a49a213dc263db521`
    )
    const response = await request.json()

    favorite.push(response)
    setFavoriteMovies(favorite)
  }

  if (!favoriteMovies) {
    return <p>Loading...</p>
  }

  return (
    <>
      <h1>Favorites page</h1>
      {favoriteMovies.map((movie) => {
        return (
          <Card
            key={movie.title}
            movie={movie}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
            date={movie.release_date}
            description={movie.overview}
          />
        )
      })}
    </>
  )
}

export default Favorites
