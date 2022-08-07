import Card from "../components/Card"
import { useEffect, useState } from "react"

const Home = () => {
  const [latest, setLatest] = useState([])
  const [topRated, setTopRated] = useState([])
  const [nowPlaying, setNowPlaying] = useState([])
  const [upcoming, setUpcoming] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const requestLatest = await fetch(
      `https://api.themoviedb.org/3/movie/latest?api_key=5182998fc607727a49a213dc263db521&language=en-US`
    )
    const responseLatest = await requestLatest.json()

    setLatest(responseLatest.results)

    const requestTopRated = await fetch(
      `https://api.themoviedb.org/3/movie/top_rated?api_key=5182998fc607727a49a213dc263db521&page=1`
    )
    const responseTopRated = await requestTopRated.json()

    setTopRated(responseTopRated.results)

    const requestNowPlaying = await fetch(
      `https://api.themoviedb.org/3/movie/now_playing?api_key=5182998fc607727a49a213dc263db521&page=1`
    )
    const responseNowPlaying = await requestNowPlaying.json()

    setNowPlaying(responseNowPlaying.results)

    const requestUpcoming = await fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=5182998fc607727a49a213dc263db521&page=1`
    )
    const responseUpcoming = await requestUpcoming.json()

    setUpcoming(responseUpcoming.results)
  }

  return (
    <>
      {/* latest */}
      <section className="margintop">
        <h3 className="text-center text-light">Top Rated</h3>
        <article className="d-flex justify-content-around align-items-start flex-wrap flex-row margintop">
          {!topRated ? (
            <p>loading...</p>
          ) : (
            topRated.map((movie) => {
              return (
                <Card
                  id={movie.id}
                  title={movie.title}
                  image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  date={movie.release_date}
                  description={movie.overview}
                />
              )
            })
          )}
        </article>
      </section>

      <section className="margintop">
        <h3 className="text-center text-light">Now playing</h3>
        <article className="d-flex justify-content-around align-items-start flex-wrap flex-row margintop">
          {!nowPlaying ? (
            <p>loading...</p>
          ) : (
            nowPlaying.map((movie) => {
              return (
                <Card
                  id={movie.id}
                  title={movie.title}
                  image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  date={movie.release_date}
                  description={movie.overview}
                />
              )
            })
          )}
        </article>
      </section>

      <section className="margintop">
        <h3 className="text-center text-light">Upcoming</h3>
        <article className="d-flex justify-content-around align-items-start flex-wrap flex-row margintop">
          {!nowPlaying ? (
            <p>loading...</p>
          ) : (
            upcoming.map((movie) => {
              return (
                <Card
                  id={movie.id}
                  title={movie.title}
                  image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                  date={movie.release_date}
                  description={movie.overview}
                />
              )
            })
          )}
        </article>
      </section>
    </>
  )
}

export default Home
