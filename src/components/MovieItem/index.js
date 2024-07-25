import {Link} from 'react-router-dom'
import './index.css'

const MovieItem = props => {
  const {movieDetails} = props
  const {id, title, voteAverage, posterPath} = movieDetails

  return (
    <li className="MovieLi">
      <img
        className="MovieImg"
        alt={title}
        src={`https://image.tmdb.org/t/p/w500${posterPath}`}
      />
      <div className="TitleVoteCont">
        <h1 className="Title">{title}</h1>
        <div className="VoteCont">
          <img
            className="VoteImg"
            alt="star"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7BXcaq69fKCWDFtAjWJZlDzl0pU1dPZpfTw&usqp=CAU"
          />
          <p className="Vote">{Math.floor(voteAverage)}</p>
        </div>
      </div>
      <button type="button" className="ViewBtn">
        <Link className="ViewBtnLink" to={`/movie/${id}`}>
          View Details
        </Link>
      </button>
    </li>
  )
}
export default MovieItem