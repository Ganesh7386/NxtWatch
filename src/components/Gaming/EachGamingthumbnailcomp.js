import styled from 'styled-components'
import {Link} from 'react-router-dom'
import lightDarkModeContext from '../ThemeModeContext/index'
import './index.css'

const LightModeContainer = styled.li`
  color: black;
`
const DarkModeContainer = styled.li`
  color: white;
`

function EachGamingThumbnail(props) {
  const {eachVideoDetails} = props
  console.log(eachVideoDetails)
  const renderEachGamingThumbnailContainer = () => (
    <Link
      to={`/videos/${eachVideoDetails.id}`}
      style={{color: 'inherit', textDecoration: 'none'}}
    >
      <li className="eachGamingcontainer">
        <img
          src={eachVideoDetails.thumbnailUrl}
          alt="video thumbnail"
          style={{height: '40%'}}
        />
        <div className="detailsContainer">
          <p>{eachVideoDetails.title}</p>
          <p>{eachVideoDetails.viewCount} Watching worldwide</p>
        </div>
      </li>
    </Link>
  )

  const renderEachGamingThumbnailContainerAccdContext = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <LightModeContainer>
              {renderEachGamingThumbnailContainer()}
            </LightModeContainer>
          )
        }
        return (
          <DarkModeContainer>
            {renderEachGamingThumbnailContainer()}
          </DarkModeContainer>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  return renderEachGamingThumbnailContainerAccdContext()
}

export default EachGamingThumbnail
