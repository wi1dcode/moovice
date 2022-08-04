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
      <div className="d-flex justify-content-around align-items-start flex-wrap flex-row margintop">
        {popular.results.map((movie) => {
          return (
            <div>
              <Card
                id={movie.id}
                title={movie.title}
                image={`https://image.tmdb.org/t/p/w300/${movie.poster_path}`}
                date={movie.release_date}
                description={movie.overview}
                movie={movie}
              />
            </div>
          )
        })}
      </div>
    </>
  )
}

export default Popular
