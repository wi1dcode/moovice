const API_KEY = "5182998fc607727a49a213dc263db521"
const BASE_URL = "https://api.themoviedb.org/3"
export const IMAGE_URL = "https://image.tmdb.org/t/p"

export const posterUrl = (path, size = "w342") =>
  path ? `${IMAGE_URL}/${size}${path}` : null

export const backdropUrl = (path, size = "w1280") =>
  path ? `${IMAGE_URL}/${size}${path}` : null

export const profileUrl = (path, size = "w185") =>
  path ? `${IMAGE_URL}/${size}${path}` : null

const request = async (endpoint, params = {}) => {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.set("api_key", API_KEY)
  url.searchParams.set("language", "en-US")

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== "") {
      url.searchParams.set(key, value)
    }
  })

  const response = await fetch(url.toString())

  if (!response.ok) {
    throw new Error(`TMDB request failed: ${response.status}`)
  }

  return response.json()
}

export const tmdb = {
  trending: (mediaType = "all", timeWindow = "week", page = 1) =>
    request(`/trending/${mediaType}/${timeWindow}`, { page }),

  movieList: (list, page = 1) =>
    request(`/movie/${list}`, { page }),

  tvList: (list, page = 1) =>
    request(`/tv/${list}`, { page }),

  movieDetails: (id) =>
    request(`/movie/${id}`, {
      append_to_response: "credits,videos,similar,recommendations,images,reviews,keywords",
    }),

  tvDetails: (id) =>
    request(`/tv/${id}`, {
      append_to_response: "credits,videos,similar,recommendations,images,reviews,keywords",
    }),

  seasonDetails: (tvId, seasonNumber) =>
    request(`/tv/${tvId}/season/${seasonNumber}`),

  personDetails: (id) =>
    request(`/person/${id}`, {
      append_to_response: "combined_credits,images",
    }),

  discoverMovies: ({ genre, sortBy = "popularity.desc", year, page = 1 } = {}) =>
    request("/discover/movie", {
      with_genres: genre,
      sort_by: sortBy,
      primary_release_year: year,
      page,
    }),

  discoverTV: ({ genre, sortBy = "popularity.desc", page = 1 } = {}) =>
    request("/discover/tv", {
      with_genres: genre,
      sort_by: sortBy,
      page,
    }),

  genresMovie: () => request("/genre/movie/list"),
  genresTV: () => request("/genre/tv/list"),

  searchMulti: (query, page = 1) =>
    request("/search/multi", { query, page, include_adult: false }),

  searchMovies: (query, page = 1) =>
    request("/search/movie", { query, page, include_adult: false }),
}
