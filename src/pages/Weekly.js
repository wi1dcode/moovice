import { useEffect, useState } from "react"
import moment from "moment"
import Card from "../components/Card"

const Weekly = () => {
  const [movies, setMovies] = useState([])
  const week = moment().subtract(7, "d").format("YYYY-MM-DD")
  const date = moment().format("YYYY-MM-DD")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const request = await fetch(
      `http://api.themoviedb.org/3/discover/movie?primary_release_date.gte=${week}&primary_release_date.lte=${date}&api_key=fea42b1e836ac59816b8332e564dbb41`
    )

    const response = await request.json()

    setMovies(response.results)
  }

  if (!movies) {
    return <p>loading...</p>
  }

  return (
    <div className="d-flex justify-content-around align-items-start flex-wrap flex-row margintop">
      <div>
        {movies.map((movie) => {
          return (
            <Card
              id={movie.id}
              key={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              date={movie.release_date}
              description={movie.overview}
              movie={movie}
            />
          )
        })}
      </div>
    </div>
  )
}

export default Weekly
