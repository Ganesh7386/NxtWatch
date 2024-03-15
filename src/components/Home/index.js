import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import styled from 'styled-components'
import Loader from 'react-loader-spinner'
import EachVideoThumbnail from '../EachVideoThumbnail/index'
import lightDarkModeContext from '../ThemeModeContext/index'
import './index.css'

const BannerStyledContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/nxt-watch-banner-bg.png');
  background-size: cover;
  height: 120px;
  margin-bottom: 20px;
`

const OverAllRightContainerBgStyleDarkMode = styled.div`
  background-color: #181818;
`
const OverAllRightContainerBgStylingLightMode = styled.div`
  background-color: #f9f9f9;
`

/* import {
  HomeContainerBGStylingInDarkMode,
  HomeContainerBGStylingInLightMode,
} from '../StyledComponents/index'  */

export function modifyKeysOfVideoDetails(listOfVideos) {
  const allResultedVideos = listOfVideos.map(eachObj => ({
    id: eachObj.id,
    title: eachObj.title,
    thumbnailUrl: eachObj.thumbnail_url,
    channel: {
      name: eachObj.channel.name,
      profileImageUrl: eachObj.channel.profile_image_url,
    },
    viewCount: eachObj.view_count,
    publishedAt: eachObj.published_at,
  }))

  return allResultedVideos
}

export class Home extends Component {
  state = {
    videosList: [],
    loading: 'true',
    searchValue: '',
    anyError: false,
  }

  componentDidMount() {
    this.getVideosForHomeRoute()
  }

  //   componentDidUpdate(prevProps, prevState) {
  //     // Check if the theme has changed before making an API call
  //     const {videosList} = this.state
  //     if (videosList !== prevState.videosList) {
  //       this.getVideosForHomeRoute() // Your function to fetch data
  //     }
  //   }

  loadingUi = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="black" height="50" width="50" />
    </div>
  )

  renderNoVideosUi = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-search-results-img.png"
        alt="no videos"
        style={{height: '100px', width: '100px'}}
      />
      <h1>No Search results found</h1>
      <p>Try different key words or remove search filter</p>
      <button
        type="button"
        onClick={() => {
          this.setState({searchValue: ''}, this.getVideosForHomeRoute)
        }}
      >
        Retry
      </button>
      <p>{}</p>
    </>
  )

  getVideosForHomeRoute = async () => {
    const storedToken = Cookies.get('jwt_token')
    const videoApiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${storedToken}`,
      },
    }
    const {searchValue} = this.state
    console.log(`https://apis.ccbp.in/videos/all?search=${searchValue}`)
    const homeVideosApiPromise = await fetch(
      `https://apis.ccbp.in/videos/all?search=${searchValue}`,
      videoApiDetails,
    )
    const allVideosListFromVideosApiPromise = await homeVideosApiPromise.json()
    // console.log(homeVideosApiPromise)
    // console.log(allVideosListFromVideosApiPromise.videos)

    if (homeVideosApiPromise.ok) {
      const modifiedKeysOfEachVideoDetails = modifyKeysOfVideoDetails(
        allVideosListFromVideosApiPromise.videos,
      )
      // console.log(modifiedKeysOfEachVideoDetails)
      this.setState({
        videosList: modifiedKeysOfEachVideoDetails,
        loading: 'false',
      })
    } else {
      this.setState({loading: 'false', anyError: true})
    }
  }

  /* renderHomeRouteAccdToContextValue = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <HomeContainerBGStylingInLightMode className="homeRouteContainer">
              {this.renderHomeRouteAccdToLoadingStatus()}
            </HomeContainerBGStylingInLightMode>
          )
        }
        return (
          <HomeContainerBGStylingInDarkMode className="homeRouteContainer">
            {this.renderHomeRouteAccdToLoadingStatus()}
          </HomeContainerBGStylingInDarkMode>
        )
      }}
    </lightDarkModeContext.Consumer>
  ) */

  handleSearchForVideo = event => {
    this.setState({searchValue: event.target.value})
  }

  renderHomeRouteWithAllVideosUi = () => {
    const {videosList, searchValue, anyError} = this.state
    if (anyError) {
      return this.renderSomethingWentWrongUi()
    }
    if (videosList.length === 0) {
      return this.renderNoVideosUi()
    }
    return (
      <>
        <input
          type="search"
          value={searchValue}
          onChange={this.handleSearchForVideo}
        />
        <div data-testid="searchButton">
          <button
            data-testid="searchButton"
            onClick={() => {
              this.getVideosForHomeRoute()
            }}
            type="button"
          >
            search
          </button>
        </div>
        <ul>
          <div className="videosListContainer" data-testid="home">
            <ul className="videosListContainer">
              {videosList.map(eachObj => (
                <EachVideoThumbnail
                  key={eachObj.id}
                  eachVideoDetails={eachObj}
                />
              ))}
            </ul>
          </div>
        </ul>
      </>
    )
  }

  renderSomethingWentWrongUi = () => (
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
          this.getVideosForHomeRoute()
        }}
      >
        Retry
      </button>
    </>
  )

  renderHomeRouteAccdToLoadingStatus = () => {
    const {loading} = this.state

    switch (loading) {
      case 'true':
        return this.loadingUi()
      case 'false':
        return this.renderHomeRouteWithAllVideosUi()
      default:
        return null
    }
  }

  renderHomeRightSideContainer = () => (
    <>
      <BannerStyledContainer data-testid="banner">
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="nxt watch logo"
          className="bannerLogoStyling"
        />
        <p>Buy Nxt Watch Premium</p>
        <button data-testid="close" type="button">
          GET IT NOW
        </button>
      </BannerStyledContainer>
      {this.renderHomeRouteAccdToLoadingStatus()}
    </>
  )

  renderRightSideContainerAccrdToContext = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <OverAllRightContainerBgStylingLightMode className="rightContentContainer">
              {this.renderHomeRightSideContainer()}
            </OverAllRightContainerBgStylingLightMode>
          )
        }
        return (
          <OverAllRightContainerBgStyleDarkMode className="rightContentContainer">
            {this.renderHomeRightSideContainer()}
          </OverAllRightContainerBgStyleDarkMode>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  render() {
    return this.renderRightSideContainerAccrdToContext()
  }
}
