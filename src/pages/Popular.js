import { useEffect, useState } from "react"
import React, { Component } from "react"
import Card from "../components/Card"

const Popular = () => {
  const [popular, setPopular] = useState(null)

  useEffect(() => {
    fetchPopular(2)
  }, [])

  const fetchPopular = async (ID) => {
    const request = await fetch(
      `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5182998fc607727a49a213dc263db521`
    )
    const response = await request.json()
    setPopular(response)
  }

  if (!popular) {
    return <p>Loading...</p>
  }

  return (
    <>
      {popular.results.map((movie) => {
        return (
          <div>
            <Card
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
              date={movie.release_date}
              description={movie.overview}
            />
            <h1>Popular page</h1>
          </div>
        )
      })}
    </>
  )
}

export default Popular

// adult: false
// backdrop_path: "/p1F51Lvj3sMopG948F5HsBbl43C.jpg"
// genre_ids: (3) [28, 12, 14]
// id: 616037
// original_language: "en"
// original_title: "Thor: Love and Thunder"
// overview: "After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now inexplicably wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late."
// popularity: 13162.608
// poster_path: "/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg"
// release_date: "2022-07-06"
// title: "Thor: Love and Thunder"
// video: false
// vote_average: 6.7
// vote_count: 1554
