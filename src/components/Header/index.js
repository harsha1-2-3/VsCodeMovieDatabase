import {Link, useNavigate} from 'react-router-dom'
import Cookies from 'js-cookie'
import PageContext from '../../context/PageContext'
import './index.css'

const Header = () => {
  const navigate=useNavigate()
  const clickedLogout=()=>{
    Cookies.remove('jwt_token')
    navigate('/login')
    console.log('Logged Out')
  }
  const renderSearchBar = () => (
    <PageContext.Consumer>
      {value => {
        const {onTriggerSearchBtn, onChangeSearch, searchInput} = value
        const onChangeHandler = event => onChangeSearch(event.target.value)
        const onSearchHandler = () => {
          onTriggerSearchBtn()
          navigate('/searched')
        }
  const  onEnterSearchInput = event => {
    if (event.key === 'Enter') {
      onTriggerSearchBtn()
      navigate('/searched')
    }
    }
        return (
          <div className="InputCont">
            <input
              onChange={onChangeHandler}
              value={searchInput}
              className="InputBox"
              placeholder="Search..."
              type="search"
            />
            <button
              type="button"
              onClick={onSearchHandler}
              className="SearchBtn"
                onKeyDown={onEnterSearchInput}
            >
              Search
            </button>
          </div>
        )
      }}
    </PageContext.Consumer>
  )

  return (
    <nav className="HeaderBg">
      <Link to="/" className="Link">
        <h1 className="LogoHead">MovieDB</h1>
      </Link>
      {renderSearchBar()}
      <ul className="LinksCont">
        <li>
          <Link to="/popular" className="Link">
            Popular
          </Link>
        </li>
        <li>
          <Link to="/top-rated" className="Link">
            Top Rated
          </Link>
        </li>
        <li>
          <Link to="/upcoming" className="Link">
            Upcoming
          </Link>
        </li>
        <li>
          <button onClick={clickedLogout} className="LogoutBtn" type="button">Logout</button>
        </li>
      </ul>
    </nav>
  )
}

export default Header
