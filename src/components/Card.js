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

      <div className="card">
        <img src={props.image} className="card-img-top" alt={props.title} />
        <div className="card-body">
          <h5 className="card-title">{props.title}</h5>
          <p className="card-text">
          {props.description}
          </p>
          <p>{props.date}</p>
          <button type="button" className="btn btn-dark" onClick={() => handleClickAddToFavorites(props.id)}>Add to favorites</button>
        </div>
      </div>
    </>
  )
}

export default Card
