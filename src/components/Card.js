const Card = (props) => {
 
  const handleClickAddToFavorites = (currentId) => {
    let favorites = []

    if (localStorage.favoriteIds) {
      const localStorageIds = localStorage.getItem("favoriteIds")
      favorites = JSON.parse(localStorageIds)
    } else {
      favorites = []
    }

    const checkId = favorites.find((id) => {
      return id === currentId
    })

    if (!checkId) {
      favorites.push(currentId)
    }

    const stringifiedIds = JSON.stringify(favorites)
    localStorage.setItem("favoriteIds", stringifiedIds)
  }

  return (
    <>
      <h1>{props.title}</h1>
      <img src={props.image} alt={props.title} />
      <p>{props.date}</p>
      <p>{props.description}</p>
      <button onClick={() => handleClickAddToFavorites(props.id)}>Add to favorites</button>
    </>
  )
}

export default Card
