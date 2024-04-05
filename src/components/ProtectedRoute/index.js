import {Route, withRouter, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {useState} from 'react'
import styled from 'styled-components'
import lightDarkModeContext from '../ThemeModeContext/index'
import Header from '../Header/index'
import SideNavBar from '../SideNavigationContainer/index'
import SavedVideosContext from '../SavedVideosContext/index'
import './index.css'

const OverAllRightContainerBgStyleDarkMode = styled.div`
  background-color: #181818;
  width: 80%;
`
const OverAllRightContainerBgStylingLightMode = styled.div`
  background-color: #f9f9f9;
  width: 80%;
`

const ProtectedRoute = props => {
  const token = Cookies.get('jwt_token')
  const [savedVideosList, pushVideoIntoSavedList] = useState([])
  // const [appear, setAppear] = useState(false)

  const handleSavingVideos = eachVideoDetailsObj => {
    pushVideoIntoSavedList([...savedVideosList, eachVideoDetailsObj])
  }

  /* const PopupComp = () => (
    <Popup modal closeOnDocumentClick={appear} contentStyle={{padding: '20px'}}>
      {close => (
        <div>
          <h2>This is a Customized Popup</h2>
          <p>Click outside the popup to close or use the button below.</p>
          <button type="button" onClick={close}>
            Close
          </button>
        </div>
      )}
    </Popup>
  )  */

  const renderRightSideContainerAccrdToContext = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        const {path} = props
        if (inLightMode) {
          return (
            <OverAllRightContainerBgStylingLightMode
              data-testid={path}
              className="rightContentContainer"
            >
              <SavedVideosContext.Provider
                value={{savedVideosList, pushVideo: handleSavingVideos}}
              >
                <Route {...props} />
              </SavedVideosContext.Provider>
            </OverAllRightContainerBgStylingLightMode>
          )
        }
        return (
          <OverAllRightContainerBgStyleDarkMode
            data-testid={path}
            className="rightContentContainer"
          >
            <SavedVideosContext.Provider
              value={{savedVideosList, pushVideo: handleSavingVideos}}
            >
              <Route {...props} />
            </SavedVideosContext.Provider>
          </OverAllRightContainerBgStyleDarkMode>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  const renderOverAllHomeContainer = () => (
    <div className="overAllHomeContainerUi">
      <Header />
      <div className="containerWithLeftRightSubContainers">
        <SideNavBar />
        {renderRightSideContainerAccrdToContext()}
      </div>
    </div>
  )

  if (token === undefined) {
    return <Redirect to="/login" />
  }
  return renderOverAllHomeContainer()
}

export default withRouter(ProtectedRoute)
