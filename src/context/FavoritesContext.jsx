import { createContext, useContext, useEffect, useMemo, useState } from "react"

const STORAGE_KEY = "moovice_favorites"
const FavoritesContext = createContext(null)

const loadFavorites = () => {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState(loadFavorites)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = (id, mediaType) =>
    favorites.some((item) => item.id === id && item.mediaType === mediaType)

  const toggleFavorite = (item) => {
    setFavorites((current) => {
      const exists = current.some(
        (fav) => fav.id === item.id && fav.mediaType === item.mediaType
      )

      if (exists) {
        return current.filter(
          (fav) => !(fav.id === item.id && fav.mediaType === item.mediaType)
        )
      }

      return [item, ...current]
    })
  }

  const value = useMemo(
    () => ({ favorites, isFavorite, toggleFavorite }),
    [favorites]
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}

export const useFavorites = () => useContext(FavoritesContext)
