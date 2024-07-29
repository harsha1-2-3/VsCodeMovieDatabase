import { Component } from 'react'
import Slider from 'react-slick'
import Header from '../Header'
import MovieItem from '../MovieItem'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.css'

const settings = {
  dots: false,
  slidesToShow: 7,
  slidesToScroll: 1,
}

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  loading: 'LOADING',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    popularList: [],
    upcomingList: [],
    topRatedList: [],
  }

  componentDidMount() {
    this.getPopularList()
    this.getUpcomingList()
    this.getTopRatedList()
  }

  renderLoading = () => <p>Loading......</p>

  renderFailure = () => <p>Loading Failed Retry!!!</p>

  getUpdated = (popularData) => ({
    totalPages: popularData.total_pages,
    totalResults: popularData.total_results,
    results: popularData.results.map((each) => ({
      id: each.id,
      posterPath: each.poster_path,
      voteAverage: each.vote_average,
      title: each.title,
    })),
  })

  getPopularList = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading })
    const API_KEY = '2b6bed2ca7d926b4afadfb343eebefad'
    const popularUrl = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
    try {
      const response = await fetch(popularUrl)
      if (response.ok) {
        const popularData = await response.json()
        const updatedPopular = this.getUpdated(popularData)
        this.setState({ popularList: updatedPopular.results, apiStatus: apiStatusConstants.success })
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure })
      }
    } catch {
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  getUpcomingList = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading })
    const API_KEY = '2b6bed2ca7d926b4afadfb343eebefad'
    const upcomingUrl = `https://api.themoviedb.org/3/movie/upcoming?api_key=${API_KEY}&language=en-US&page=1`
    try {
      const response = await fetch(upcomingUrl)
      if (response.ok) {
        const upcomingData = await response.json()
        const updatedUpcoming = this.getUpdated(upcomingData)
        this.setState({ upcomingList: updatedUpcoming.results, apiStatus: apiStatusConstants.success })
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure })
      }
    } catch {
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  getTopRatedList = async () => {
    this.setState({ apiStatus: apiStatusConstants.loading })
    const API_KEY = '2b6bed2ca7d926b4afadfb343eebefad'
    const topRatedUrl = `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
    try {
      const response = await fetch(topRatedUrl)
      if (response.ok) {
        const topRatedData = await response.json()
        const updatedTopRated = this.getUpdated(topRatedData)
        this.setState({ topRatedList: updatedTopRated.results, apiStatus: apiStatusConstants.success })
      } else {
        this.setState({ apiStatus: apiStatusConstants.failure })
      }
    } catch {
      this.setState({ apiStatus: apiStatusConstants.failure })
    }
  }

  renderHomeDetails = () => {
    const { popularList, upcomingList, topRatedList } = this.state
    return (
      <>
        <div className="Section">
          <h1 className="Head">Popular</h1>
          <Slider {...settings}>
            {popularList.map((each) => (
              <MovieItem movieDetails={each} key={each.id} />
            ))}
          </Slider>
        </div>
        <div className="Section">
          <h1 className="Head">Upcoming</h1>
          <Slider {...settings}>
            {upcomingList.map((each) => (
              <MovieItem movieDetails={each} key={each.id} />
            ))}
          </Slider>
        </div>
        <div className="Section">
          <h1 className="Head">Top Rated</h1>
          <Slider {...settings}>
            {topRatedList.map((each) => (
              <MovieItem movieDetails={each} key={each.id} />
            ))}
          </Slider>
        </div>
      </>
    )
  }

  renderAllPages = () => {
    const { apiStatus } = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderHomeDetails()
      case apiStatusConstants.loading:
        return this.renderLoading()
      case apiStatusConstants.failure:
        return this.renderFailure()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="HomeBg">
          <h1 className="HomeHead">Home</h1>
          {this.renderAllPages()}
        </div>
      </>
    )
  }
}

export default Home
