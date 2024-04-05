import {Link, Redirect, withRouter} from 'react-router-dom'
import {useContext, useState} from 'react'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import LightDarkModeContext from '../ThemeModeContext/index'
import './index.css'

const ContainerStylingAccrdToGivenParams = styled.div`
  background-color: ${({isLightTheme}) =>
    isLightTheme ? '#ffffff' : '#313131'};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
  width: 100%;
  position: fixed;
  top: 0;
  z-index: 2;
`

const logosUrlAccdToMode = [
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png',
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png',
]

const leftNavigationButtons = [
  {
    id: 1,
    label: 'Home',
    url: '',
  },
  {
    id: 2,
    label: 'Trending',
    url: 'trending',
  },
  {
    id: 3,
    label: 'Gaming',
    url: 'gaming',
  },
  {
    id: 4,
    label: 'Saved videos',
    url: 'saved-videos',
  },
]

function Header(props) {
  const contextValue = useContext(LightDarkModeContext)
  const [isDropDownActive, setDropDownActiveness] = useState(false)
  console.log(contextValue)
  const handleLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  const actualHeaderInGreaterMediumDevices = () => (
    <>
      <ContainerStylingAccrdToGivenParams
        isLightTheme={contextValue.inLightMode}
        className="headerContainer"
      >
        <Link to="/">
          <img
            className="logoStyling"
            src={
              contextValue.inLightMode
                ? logosUrlAccdToMode[0]
                : logosUrlAccdToMode[1]
            }
            alt="headerLogo"
          />
        </Link>
        <ul className="rightSideHeaderContainerTabs">
          <li>
            <button
              type="button"
              onClick={() => {
                contextValue.changeMode()
              }}
            >
              Mode
            </button>
          </li>
          <li>
            <button type="button">Profile</button>
          </li>
          <li>
            <Popup
              trigger={<button type="button">Open Popup</button>}
              position="center center"
              modal
            >
              {close => (
                <div className="popupContainer">
                  <button type="button" onClick={close}>
                    Close
                  </button>
                </div>
              )}
            </Popup>
          </li>
        </ul>
        <ul className="rightSideTabsInExtraSmallDevices">
          <li>
            <button
              type="button"
              onClick={() => {
                contextValue.changeMode()
              }}
            >
              Mode
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setDropDownActiveness(prevState => !prevState)
              }}
              type="button"
            >
              Options
            </button>
          </li>
          <li>
            <Popup
              trigger={<button type="button">Open Popup</button>}
              position="center center"
              modal
            >
              {close => (
                <div className="popupContainer">
                  <button type="button" onClick={close}>
                    Close
                  </button>
                </div>
              )}
            </Popup>
          </li>
        </ul>
      </ContainerStylingAccrdToGivenParams>
      {isDropDownActive && (
        <div className="dropDownContainer">
          <ul style={{display: 'flex', flexDirection: 'column'}}>
            {leftNavigationButtons.map(eachObj => (
              <li key={eachObj.id}>
                <Link
                  key={eachObj.id}
                  to={`/${eachObj.url}`}
                  style={{color: 'inherit'}}
                  onClick={() => {
                    setDropDownActiveness(prevState => !prevState)
                  }}
                >
                  {eachObj.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      )}
    </>
  )

  return actualHeaderInGreaterMediumDevices()
}

export default withRouter(Header)
