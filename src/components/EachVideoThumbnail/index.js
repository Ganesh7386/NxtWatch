import {Component} from 'react'
import {Link} from 'react-router-dom'
import lightDarkModeContext from '../ThemeModeContext/index'
import './index.css'

class EachVideoThumbnail extends Component {
  renderEachthumbnailListItem = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        const {eachVideoDetails} = this.props
        const themeStyling = inLightMode
          ? 'lightModeParastyling'
          : 'darkModeParastyling'
        return (
          <li key={eachVideoDetails.id}>
            <Link
              className="eachVideoThumbnailLinkContainer"
              to={`/videos/${eachVideoDetails.id}`}
            >
              <div className="eachVideoThumbnailContainer">
                <img
                  src={eachVideoDetails.thumbnailUrl}
                  alt="video thumbnail"
                  className="thumbnailImgDesign"
                />
                <div className="channelVideoDetailsContainer">
                  <img
                    src={eachVideoDetails.channel.profileImageUrl}
                    alt="channel logo"
                    className="channelImage"
                  />
                  <div>
                    <p className={themeStyling}>{eachVideoDetails.title}</p>
                    <p className={themeStyling}>
                      {eachVideoDetails.channel.name}
                    </p>
                    <p className={themeStyling}>
                      {eachVideoDetails.viewCount} views
                    </p>
                    <p className={themeStyling}>
                      {eachVideoDetails.publishedAt}
                    </p>
                  </div>
                </div>
              </div>
            </Link>
          </li>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  render() {
    return this.renderEachthumbnailListItem()
  }
}

export default EachVideoThumbnail
