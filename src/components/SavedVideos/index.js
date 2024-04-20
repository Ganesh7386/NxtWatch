import {Component} from 'react'
import styled from 'styled-components'
import SavedVideosContext from '../SavedVideosContext/index'
import EachSavedVideoComp from './EachSavedVideoStructureComp'
import {lightDarkModeContext} from '../ThemeModeContext/index'
import './index.css'

const LightThemeStyling = styled.div`
  background-color: white;
  color: black;
`

const DarkThemeStyling = styled.div`
    background-color : black,
    color : white ;
`

class SavedVideos extends Component {
  renderSavedVideosFromContext = () => (
    <SavedVideosContext.Consumer>
      {value => {
        const {savedVideosList} = value
        console.log('in saved Videos Route')
        console.log(savedVideosList)
        if (savedVideosList.length === 0) {
          return (
            <>
              <img
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-no-saved-videos-img.png"
                alt="no saved videos"
                className="noSavedVideosImage"
              />
              <p>No saved videos found</p>
              <p>You can save your videos while watching them</p>
            </>
          )
        }
        return (
          <>
            <h1>Saved Videos</h1>
            <ul>
              {savedVideosList.map(eachObj => (
                <EachSavedVideoComp
                  key={eachObj.id}
                  eachVideoDetails={eachObj}
                />
              ))}
            </ul>
          </>
        )
      }}
    </SavedVideosContext.Consumer>
  )

  renderAccrdToThemeContextValue = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <LightThemeStyling>
              {this.renderSavedVideosFromContext()}
            </LightThemeStyling>
          )
        }
        return (
          <DarkThemeStyling>
            {this.renderSavedVideosFromContext()}
          </DarkThemeStyling>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  render() {
    return this.renderAccrdToThemeContextValue()
  }
}

export default SavedVideos
