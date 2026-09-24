export const formatDate = (dateString) => {
  if (!dateString) return "TBA"
  const date = new Date(dateString)
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
}

export const formatYear = (dateString) => {
  if (!dateString) return ""
  return dateString.slice(0, 4)
}

export const formatRuntime = (minutes) => {
  if (!minutes) return ""
  const hours = Math.floor(minutes / 60)
  const remaining = minutes % 60
  return hours > 0 ? `${hours}h ${remaining}m` : `${remaining}m`
}

export const formatMoney = (amount) => {
  if (!amount) return "N/A"
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(amount)
}

export const formatVoteCount = (count) => {
  if (!count) return "0"
  if (count >= 1000) return `${(count / 1000).toFixed(1)}k`
  return `${count}`
}

export const ratingTone = (score) => {
  if (score >= 7) return "high"
  if (score >= 5) return "mid"
  return "low"
}

export const titleOf = (item) => item.title || item.name || "Untitled"

export const dateOf = (item) => item.release_date || item.first_air_date || ""

export const mediaTypeOf = (item) =>
  item.media_type || (item.first_air_date ? "tv" : "movie")

export const truncate = (text, length = 160) => {
  if (!text) return ""
  if (text.length <= length) return text
  return `${text.slice(0, length).trim()}…`
}
