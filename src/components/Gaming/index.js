import {useState, useEffect} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import EachGamingThumbnail from './EachGamingthumbnailcomp'
import lightDarkModeContext from '../ThemeModeContext/index'
import modifyKeys from './extra'

const OverAllRightContainerBgStyleDarkMode = styled.div`
  background-color: #0f0f0f;
  color: white;
  width: 100%;
`
const OverAllRightContainerBgStylingLightMode = styled.div`
  background-color: #f9f9f9;
  color: black;
  width: 100%;
`

function Gaming() {
  const [gamesVideosList, updateGamesVideosList] = useState([])
  const [isLoading, setLoading] = useState('true')
  const [anyError, setError] = useState(false)

  const makeApiCallForGamingVideos = async () => {
    setLoading('true')
    const token = Cookies.get('jwt_token')
    const gamingApiUrl = 'https://apis.ccbp.in/videos/gaming'
    const apiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const gettingGamingVideosListPromise = await fetch(gamingApiUrl, apiDetails)
    const gamingVideosListJson = await gettingGamingVideosListPromise.json()
    console.log(gamingVideosListJson)
    if (gettingGamingVideosListPromise.ok) {
      const modifiedKeysOfListData = modifyKeys(gamingVideosListJson.videos)
      console.log(modifiedKeysOfListData)
      updateGamesVideosList(modifiedKeysOfListData)
      setLoading('false')
    } else {
      setError(true)
      setLoading('false')
    }
  }

  useEffect(() => {
    makeApiCallForGamingVideos()
    console.log(gamesVideosList)
  }, [])

  const renderLoadingUi = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  const renderOverAllGamingRouteThumbnailsRouteUi = () => {
    if (anyError) {
      return (
        <>
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-watch-failure-view-dark-theme-img.png"
            alt="failure view"
            style={{height: '100px', width: '100px'}}
          />
          <h1>Oops! Something Went Wrong</h1>
          <p>We are having some trouble</p>
          <button
            type="button"
            onClick={() => {
              makeApiCallForGamingVideos()
            }}
          >
            Retry
          </button>
        </>
      )
    }
    return (
      <>
        <h1>Gaming</h1>
        <ul className="gamingthumbnailsContainer">
          {gamesVideosList.map(eachObj => (
            <EachGamingThumbnail key={eachObj.id} eachVideoDetails={eachObj} />
          ))}
        </ul>
      </>
    )
  }

  const renderRightSideContainerAccordingdToContext = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <OverAllRightContainerBgStylingLightMode
              data-testid="gaming"
              className="rightContentContainer"
            >
              {renderOverAllGamingRouteThumbnailsRouteUi()}
            </OverAllRightContainerBgStylingLightMode>
          )
        }
        return (
          <OverAllRightContainerBgStyleDarkMode
            data-testid="gaming"
            className="rightContentContainer"
          >
            {renderOverAllGamingRouteThumbnailsRouteUi()}
          </OverAllRightContainerBgStyleDarkMode>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  const renderOverAllGamingRouteRouteUi = () =>
    renderRightSideContainerAccordingdToContext()

  const renderGamingRouteUiAccrdToLoadingStatus = () => {
    switch (isLoading) {
      case 'true':
        return renderLoadingUi()
      case 'false':
        return renderOverAllGamingRouteRouteUi()
      default:
        return null
    }
  }

  const renderOverallGamingUi = () => renderGamingRouteUiAccrdToLoadingStatus()

  return renderOverallGamingUi()
}
export default Gaming
