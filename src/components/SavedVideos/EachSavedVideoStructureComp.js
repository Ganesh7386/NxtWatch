import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'

class EachSavedVideoComp extends Component {
  render() {
    const {eachVideoDetails} = this.props
    return (
      <li>
        <Link
          style={{color: 'inherit', textDecoration: 'none'}}
          to={`/videos/${eachVideoDetails.id}`}
        >
          <div className="eachSavedVideoContainer">
            <img
              src={eachVideoDetails.thumbnailUrl}
              alt="video thumbnail"
              className="savedVideothumbnail"
            />
            <div className="detailsContainer">
              <p>{eachVideoDetails.description}</p>
              <p>{eachVideoDetails.channel.name}</p>
              <p>{eachVideoDetails.viewCount}</p>
              <p>{eachVideoDetails.publishedAt}</p>
            </div>
          </div>
        </Link>
      </li>
    )
  }
}

export default EachSavedVideoComp
