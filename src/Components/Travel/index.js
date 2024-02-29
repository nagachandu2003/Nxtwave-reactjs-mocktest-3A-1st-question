import {Component} from 'react'
import Loader from 'react-loader-spinner'
import TravelItem from '../TravelItem'

import './index.css'

const apiStatus = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class Travel extends Component {
  state = {itemsList: [], apiState: apiStatus.initial}

  componentDidMount() {
    this.getItems()
  }

  getItems = async () => {
    this.setState({apiState: apiStatus.loading})
    const response = await fetch('https://apis.ccbp.in/tg/packages')
    if (response.ok === true) {
      const {packages} = await response.json()
      const finalData = packages.map(ele => ({
        id: ele.id,
        name: ele.name,
        imageUrl: ele.image_url,
        description: ele.description,
      }))
      this.setState({apiState: apiStatus.success, itemsList: finalData})
    } else this.setState({apiState: apiStatus.failure})
  }

  renderLoader = () => (
    <div data-testid="loader">
      <Loader type="TailSpin" color="#00BFFF" height={50} width={50} />
    </div>
  )

  renderTravelItems = () => {
    const {itemsList} = this.state
    return (
      <ul className="list-container1">
        {itemsList.map(ele => (
          <TravelItem key={ele.id} itemDetails={ele} />
        ))}
      </ul>
    )
  }

  renderViews = () => {
    const {apiState} = this.state
    switch (apiState) {
      case apiStatus.success:
        return this.renderTravelItems()
      case apiStatus.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="bg-container">
        <h1 className="main-heading">Travel Guide</h1>
        {this.renderViews()}
      </div>
    )
  }
}
export default Travel
