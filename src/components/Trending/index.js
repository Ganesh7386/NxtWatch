import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import EachVideoThumbnail from '../EachVideoThumbnail/index'
import {modifyKeysOfVideoDetails} from '../Home/index'
import lightDarkModeContext from '../ThemeModeContext/index'
import './index.css'

/* import {
  HomeContainerBGStylingInDarkMode,
  HomeContainerBGStylingInLightMode,
} from '../StyledComponents/index'  */

const OverAllRightContainerBgStyleDarkMode = styled.div`
  background-color: #0f0f0f;
  width: 100%;
`
const OverAllRightContainerBgStylingLightMode = styled.div`
  background-color: #f9f9f9;
  width: 100%;
`

class Trending extends Component {
  state = {
    latestVideosList: [],
    anyError: false,
    isLoading: 'true',
  }

  componentDidMount() {
    this.getLatestVideosList()
  }

  getLatestVideosList = async () => {
    this.setState({isLoading: 'true'})
    const latestVideosApi = 'https://apis.ccbp.in/videos/trending'
    const token = Cookies.get('jwt_token')
    const apiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    // making fetch api call
    const latestVideosApiPromise = await fetch(latestVideosApi, apiDetails)
    // console.log(latestVideosApiPromise)

    if (latestVideosApiPromise.ok) {
      const latestVideosJsonData = await latestVideosApiPromise.json()
      // console.log(latestVideosJsonData.videos)
      const modifiedKeysOfListOfLatestVideos = modifyKeysOfVideoDetails(
        latestVideosJsonData.videos,
      )
      console.log(modifiedKeysOfListOfLatestVideos)
      this.setState({
        latestVideosList: modifiedKeysOfListOfLatestVideos,
        isLoading: 'false',
      })
    } else {
      this.setState({anyError: true, isLoading: 'false'})
    }
  }

  /* renderTrendingPageAccrdToContext = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <HomeContainerBGStylingInLightMode>
              {this.renderTrendingthumbnailsui()}
            </HomeContainerBGStylingInLightMode>
          )
        }
        return (
          <HomeContainerBGStylingInDarkMode>
            {this.renderTrendingthumbnailsui()}
          </HomeContainerBGStylingInDarkMode>
        )
      }}
    </lightDarkModeContext.Consumer>
  )  */

  renderFailureOccuredTheme = () => (
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
          this.getLatestVideosList()
        }}
      >
        Retry
      </button>
    </>
  )

  renderTrendingthumbnailsui = () => {
    const {latestVideosList} = this.state
    return (
      <>
        <ul className="trendingVideosContainer">
          {latestVideosList.map(eachObj => (
            <EachVideoThumbnail key={eachObj.id} eachVideoDetails={eachObj} />
          ))}
        </ul>
      </>
    )
  }

  renderRightSideContainerAccrdToContext = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <OverAllRightContainerBgStylingLightMode
              data-testid="trending"
              className="rightContentContainer"
            >
              {this.renderUiAccrdToErrorStatus()}
            </OverAllRightContainerBgStylingLightMode>
          )
        }
        return (
          <OverAllRightContainerBgStyleDarkMode
            data-testid="trending"
            className="rightContentContainer"
          >
            {this.renderUiAccrdToErrorStatus()}
          </OverAllRightContainerBgStyleDarkMode>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  /* renderOverAllTrendingRoute = () => (
    <div className="overAllHomeContainerUi">
      <Header />
      <div className="containerWithLeftRightSubContainers">
        <SideNavBar />
        {this.renderRightSideContainerAccrdToContext()}
      </div>
    </div>
  )
 */

  renderUiAccrdToErrorStatus = () => {
    const {anyError} = this.state
    if (anyError) {
      return this.renderFailureOccuredTheme()
    }
    return this.renderTrendingthumbnailsui()
  }

  renderLoadingUi = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderTrendingUiAccrdToLoading = () => {
    const {isLoading} = this.state
    switch (isLoading) {
      case 'true':
        return this.renderLoadingUi()
      case 'false':
        return this.renderRightSideContainerAccrdToContext()
      default:
        return null
    }
  }

  render() {
    return this.renderTrendingUiAccrdToLoading()
  }
}

export default Trending
