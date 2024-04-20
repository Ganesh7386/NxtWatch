import {Component} from 'react'
import Cookies from 'js-cookie'
import ReactPlayer from 'react-player'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import {lightDarkModeContext} from '../ThemeModeContext/index'
import SavedVideosContext from '../SavedVideosContext/index'
/* import {
  DarkThemeModeStyling,
  LightThemeModeStyling,
} from './eachVideoDetailsStyledComp' */
import './index.css'

const OverAllRightContainerBgStyleDarkMode = styled.div`
  background-color: #181818;
  color: white;
`
const OverAllRightContainerBgStylingLightMode = styled.div`
  background-color: #f9f9f9;
  color: black;
`

function convertKeys(videoDetails) {
  const temp = {
    id: videoDetails.id,
    title: videoDetails.title,
    videoUrl: videoDetails.video_url,
    thumbnailUrl: videoDetails.thumbnail_url,
    channel: {
      name: videoDetails.channel.name,
      profileImageUrl: videoDetails.channel.profile_image_url,
      subscriberCount: videoDetails.channel.subscriber_count,
    },
    description: videoDetails.description,
    publishedAt: videoDetails.published_at,
    viewCount: videoDetails.view_count,
  }
  return temp
}

class EachVideoDetails extends Component {
  state = {
    eachVideoDetails: [],
    status: 'waiting',
    anyError: false,
  }

  componentDidMount() {
    this.getEachVideoDetailsUsingApi()
  }

  getEachVideoDetailsUsingApi = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params
    const eachVideoDetailsUrl = `https://apis.ccbp.in/videos/${id}`
    const token = Cookies.get('jwt_token')
    const apiDetails = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    this.setState({status: 'waiting'})
    const eachVideoDetailsPromise = await fetch(eachVideoDetailsUrl, apiDetails)
    if (eachVideoDetailsPromise.ok) {
      const eachVideoDetailsJson = await eachVideoDetailsPromise.json()
      const convertedKeysOfEachVideoDetailsFromJson = convertKeys(
        eachVideoDetailsJson.video_details,
      )
      console.log(convertedKeysOfEachVideoDetailsFromJson)
      this.setState({
        eachVideoDetails: convertedKeysOfEachVideoDetailsFromJson,
        status: 'success',
      })
    } else {
      this.setState({anyError: true, status: 'success'})
    }
  }

  overAllEachVideoUi = () => {
    const {eachVideoDetails} = this.state

    return (
      <SavedVideosContext.Consumer>
        {value => {
          const {pushVideo, savedVideosList} = value
          console.log('*****')
          console.log(savedVideosList)

          const handleAddingVideoToSaved = () => {
            pushVideo(eachVideoDetails)
          }

          return (
            <>
              <ReactPlayer
                width="70%"
                height="400px"
                light={eachVideoDetails.thumbnailUrl}
                url={eachVideoDetails.videoUrl}
              />
              <p>{eachVideoDetails.title}</p>
              <div className="likeUnlikeviewCountEtcContainer">
                <ul className="ulListStylingBottom">
                  <li>{eachVideoDetails.viewCount}</li>
                  <li>{eachVideoDetails.publishedAt}</li>
                </ul>
                <ul className="ulListStylingBottom">
                  <li>
                    <button type="button">Like</button>
                  </li>
                  <li>
                    <button type="button">Dislike</button>
                  </li>
                  <li>
                    <button
                      onClick={() => {
                        handleAddingVideoToSaved()
                      }}
                      type="button"
                    >
                      Save
                    </button>
                  </li>
                </ul>
              </div>
              <br style={{fontWeight: '600', color: 'black'}} />
              <div className="channelDetailsContainer">
                <img
                  src={eachVideoDetails.channel.profileImageUrl}
                  alt="profileImage"
                  className="channelImageStyling"
                />
                <div className="detailsContainer">
                  <h1>{eachVideoDetails.channel.name}</h1>
                  <p>{eachVideoDetails.channel.subscriberCount} subscribers</p>
                  <p>{eachVideoDetails.description}</p>
                </div>
              </div>
            </>
          )
        }}
      </SavedVideosContext.Consumer>
    )
  }

  overAllEachVideoUiAccdToContext = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <OverAllRightContainerBgStylingLightMode>
              {this.renderOverAllEachVideoUiAccrdToAnyError()}
            </OverAllRightContainerBgStylingLightMode>
          )
        }
        return (
          <OverAllRightContainerBgStyleDarkMode>
            {this.renderOverAllEachVideoUiAccrdToAnyError()}
          </OverAllRightContainerBgStyleDarkMode>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  renderOverAllEachVideoUiAccrdToAnyError = () => {
    const {anyError} = this.state
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
              this.getEachVideoDetailsUsingApi()
            }}
          >
            Retry
          </button>
        </>
      )
    }
    return this.overAllEachVideoUi()
  }

  loadingUi = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="blue" height="50" width="50" />
    </div>
  )

  renderEachVideoDetailsAccrdToLoadingStatus = () => {
    const {status} = this.state
    switch (status) {
      case 'waiting':
        return this.loadingUi()
      case 'success':
        return this.overAllEachVideoUiAccdToContext()
      default:
        return null
    }
  }

  render() {
    return this.renderEachVideoDetailsAccrdToLoadingStatus()
  }
}

export default EachVideoDetails
