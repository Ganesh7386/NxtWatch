import {Link, withRouter} from 'react-router-dom'
import {useContext, useState} from 'react'
import {
  FaMoon as DarkModeIcon,
  FaSun as LightModeIcon,
  FaBars as HamburgerIcon,
  FaSignOutAlt as LogoutIcon,
} from 'react-icons/fa'
import styled from 'styled-components'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {lightDarkModeContext} from '../ThemeModeContext/index'
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

const ThemeProfileButtonsStyling = styled.button`
  height: 40px;
  width: 40px;
  border: ${inLightMode =>
    inLightMode ? `black solid 3px` : `white solid 3px`};
};
 background-color : ${inLightMode => (inLightMode ? 'white' : '')};
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  padding: 3px;
  &:hover {
    background-color: ${inLightMode => (inLightMode ? 'grey' : 'black')};
  };
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
  const contextValue = useContext(lightDarkModeContext)
  const [isDropDownActive, setDropDownActiveness] = useState(false)
  console.log(contextValue)
  const handleLogOut = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  //   const LogoutPopupUi = ({closing}) => (
  //     <div>
  //       <h1>Are you sure , want to Logout</h1>
  //       <button onClick={handleLogOut()} type="button">
  //         Logout
  //       </button>
  //       <button
  //         onClick={() => {
  //           closing()
  //         }}
  //         type="button"
  //       >
  //         Cancel
  //       </button>
  //     </div>
  //   )

  const RightSidetabsContainerInSmallMediumDevicesUi = () => (
    <ul className="rightSideTabsInExtraSmallDevices">
      <li>
        <ThemeProfileButtonsStyling
          inLightMode={contextValue.inLightMode}
          type="button"
          onClick={() => {
            console.log(contextValue)
            contextValue.changeMode()
          }}
        >
          {contextValue.inLightMode ? (
            <DarkModeIcon className="headerIconStyling" />
          ) : (
            <LightModeIcon className="headerIconStyling" />
          )}
        </ThemeProfileButtonsStyling>
      </li>
      <li>
        <ThemeProfileButtonsStyling
          inLightMode={contextValue.inLightMode}
          onClick={() => {
            setDropDownActiveness(prevState => !prevState)
          }}
          type="button"
        >
          <HamburgerIcon className="headerIconStyling" />
        </ThemeProfileButtonsStyling>
      </li>
      <li>
        <Popup
          trigger={
            <ThemeProfileButtonsStyling
              inLightMode={contextValue.inLightMode}
              className="loginLogoutBtnStyling"
              type="button"
            >
              <LogoutIcon className="headerIconStyling" />
            </ThemeProfileButtonsStyling>
          }
          position="center center"
          modal
        >
          {close => (
            <div className="popupContainerForLogout">
              <h1>Are you sure , want to Logout</h1>
              <button
                onClick={() => {
                  handleLogOut()
                }}
                type="button"
              >
                Logout
              </button>
              <button
                onClick={() => {
                  close()
                }}
                type="button"
              >
                Cancel
              </button>
            </div>
          )}
        </Popup>
      </li>
    </ul>
  )
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
            <ThemeProfileButtonsStyling
              inLightMode={contextValue.inLightMode}
              type="button"
              onClick={() => {
                console.log(contextValue)
                contextValue.changeMode()
              }}
            >
              {contextValue.inLightMode ? (
                <DarkModeIcon className="headerIconStyling" />
              ) : (
                <LightModeIcon className="headerIconStyling" />
              )}
            </ThemeProfileButtonsStyling>
          </li>
          <li>
            <ThemeProfileButtonsStyling
              inLightMode={contextValue.inLightMode}
              type="button"
            >
              <img
                className="headerIconStyling"
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                alt="profile"
              />
            </ThemeProfileButtonsStyling>
          </li>
          <li>
            <Popup
              trigger={
                <button className="loginLogoutBtnStyling" type="button">
                  Logout
                </button>
              }
              position="center center"
              modal
            >
              {close => (
                <div className="popupContainerForLogout">
                  <h1>Are you sure , want to Logout</h1>
                  <div className="buttonsContainer">
                    <button
                      onClick={() => {
                        handleLogOut()
                      }}
                      type="button"
                    >
                      Logout
                    </button>
                    <button
                      onClick={() => {
                        close()
                      }}
                      type="button"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
            </Popup>
          </li>
        </ul>
        <RightSidetabsContainerInSmallMediumDevicesUi />
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
