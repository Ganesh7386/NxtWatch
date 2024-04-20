import {useContext} from 'react'
import styled from 'styled-components'
import {Link} from 'react-router-dom'
import {lightDarkModeContext} from '../ThemeModeContext/index'
import './index.css'

// const LightModeContainer = styled.li`
//   color: black;
// `
// const DarkModeContainer = styled.li`
//   color: white;
// `

const ChangeThemeAccrdToContext = styled.li`
  color: ${({inLightMode}) => (inLightMode ? 'black' : 'white')};
`

function EachGamingThumbnail(props) {
  const {eachVideoDetails} = props
  const themeContext = useContext(lightDarkModeContext)
  // console.log(eachVideoDetails)
  const renderEachGamingThumbnailContainer = () => (
    <Link
      to={`/videos/${eachVideoDetails.id}`}
      style={{color: 'inherit', textDecoration: 'none'}}
    >
      <ChangeThemeAccrdToContext
        inLightMode={themeContext.inLightMode}
        className="eachGamingcontainer"
      >
        <img
          src={eachVideoDetails.thumbnailUrl}
          alt="video thumbnail"
          style={{height: '40%'}}
        />
        <div className="detailsContainer">
          <p>{eachVideoDetails.title}</p>
          <p>{eachVideoDetails.viewCount} Watching worldwide</p>
        </div>
      </ChangeThemeAccrdToContext>
    </Link>
  )

  const renderEachGamingThumbnailContainerAccdContext = () =>
    renderEachGamingThumbnailContainer()

  return renderEachGamingThumbnailContainerAccdContext()
}

export default EachGamingThumbnail
