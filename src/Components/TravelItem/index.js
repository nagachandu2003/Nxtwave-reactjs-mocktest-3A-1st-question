import './index.css'

const TravelItem = props => {
  const {itemDetails} = props
  const {name, imageUrl, description} = itemDetails
  return (
    <li className="list-item1">
      <img className="image-url" src={imageUrl} alt={name} />
      <div className="p1">
        <h1 className="heading1">{name}</h1>
        <p className="par1">{description}</p>
      </div>
    </li>
  )
}
export default TravelItem
