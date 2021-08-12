import {withRouter} from 'react-router-dom'

import './index.css'

const Header = props => {
  const onClickEvent = () => {
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header">
      <div className="nav-content">
        <div className="project-name-container">
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628609364/project_rt33fa.png"
            className="project-image"
            alt="project"
          />
          <img
            src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628606372/nav-icon_yjdyub.jpg"
            className="nav-lines"
            alt="bars"
          />
        </div>

        <ul className="nav-menu">
          <li>
            <img
              src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628605276/search_ikrbkf.png"
              className="nav-icons"
              alt="search"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628605515/comment-dots_qy4tkc.png"
              className="nav-icons"
              alt="comment"
            />
          </li>
          <li>
            <img
              src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628605514/bell_flqd1x.png"
              className="nav-icons"
              alt="bell"
            />
          </li>
        </ul>
        <div className="name-container">
          <p className="name-text">
            <span className="hi-text">Hi,</span>John
          </p>
          <div className="letter-container">
            <p className="letter-text">J</p>
          </div>
        </div>
      </div>
    </nav>
  )
}
export default withRouter(Header)
