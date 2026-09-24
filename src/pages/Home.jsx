import { useEffect, useState } from "react"
import Hero from "../components/Hero"
import Row from "../components/Row"
import MovieCard from "../components/MovieCard"
import { RowSkeleton, HeroSkeleton } from "../components/Skeletons"
import { tmdb } from "../api/tmdb"
import styles from "./Home.module.css"

const Home = () => {
  const [featured, setFeatured] = useState(null)
  const [trailerKey, setTrailerKey] = useState(null)
  const [sections, setSections] = useState(null)

  useEffect(() => {
    document.title = "Moovice — Discover Movies & TV Shows"
    loadHero()
    loadSections()
  }, [])

  const loadHero = async () => {
    const trending = await tmdb.trending("all", "day")
    const candidates = trending.results.filter((item) => item.backdrop_path)
    const pick = candidates[Math.floor(Math.random() * Math.min(candidates.length, 6))]
    setFeatured(pick)

    if (pick) {
      const details =
        pick.media_type === "tv"
          ? await tmdb.tvDetails(pick.id)
          : await tmdb.movieDetails(pick.id)
      const trailer = details.videos?.results?.find(
        (video) => video.type === "Trailer" && video.site === "YouTube"
      )
      setTrailerKey(trailer?.key || null)
    }
  }

  const loadSections = async () => {
    const [trendingWeek, popular, topRated, nowPlaying, upcoming, popularTV, topRatedTV] =
      await Promise.all([
        tmdb.trending("all", "week"),
        tmdb.movieList("popular"),
        tmdb.movieList("top_rated"),
        tmdb.movieList("now_playing"),
        tmdb.movieList("upcoming"),
        tmdb.tvList("popular"),
        tmdb.tvList("top_rated"),
      ])

    setSections({
      trendingWeek: trendingWeek.results,
      popular: popular.results,
      topRated: topRated.results,
      nowPlaying: nowPlaying.results,
      upcoming: upcoming.results,
      popularTV: popularTV.results,
      topRatedTV: topRatedTV.results,
    })
  }

  return (
    <div className={styles.page}>
      {featured ? <Hero item={featured} trailerKey={trailerKey} /> : <HeroSkeleton />}

      <div className={styles.rows}>
        {sections ? (
          <>
            <Row title="Trending This Week" viewAllTo="/trending">
              {sections.trendingWeek.map((item) => (
                <MovieCard key={`${item.id}-${item.media_type}`} item={item} />
              ))}
            </Row>

            <Row title="Popular Movies" viewAllTo="/movies">
              {sections.popular.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </Row>

            <Row title="Popular TV Shows" viewAllTo="/tv">
              {sections.popularTV.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </Row>

            <Row title="Top Rated Movies" viewAllTo="/movies">
              {sections.topRated.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </Row>

            <Row title="Now Playing">
              {sections.nowPlaying.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </Row>

            <Row title="Top Rated TV Shows" viewAllTo="/tv">
              {sections.topRatedTV.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </Row>

            <Row title="Upcoming">
              {sections.upcoming.map((item) => (
                <MovieCard key={item.id} item={item} />
              ))}
            </Row>
          </>
        ) : (
          <>
            <div className="container">
              <RowSkeleton />
            </div>
            <div className="container">
              <RowSkeleton />
            </div>
          </>
        )}
      </div>
    </div>
  )
}

export default Home
