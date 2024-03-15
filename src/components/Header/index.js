import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
// import DeleteIcon from '@mui/icons-material/Delete'
import Popup from 'reactjs-popup'
import Cookies from 'js-cookie'
import {
  HeaderAndSideNavBarLightModeBackgroundStyling,
  HeaderAndSideNavBarDarkModeBackgroundStyling,
} from '../StyledComponents/index'
import LightDarkModeContext from '../ThemeModeContext/index'
import './index.css'

const logosUrlAccdToMode = [
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png',
  'https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-dark-theme-img.png',
]

class Header extends Component {
  renderHeaderUsingContext = () => (
    <LightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        console.log(inLightMode)
        if (inLightMode) {
          return (
            <HeaderAndSideNavBarLightModeBackgroundStyling className="headerContainer">
              {this.renderAppHeader()}
            </HeaderAndSideNavBarLightModeBackgroundStyling>
          )
        }
        return (
          <HeaderAndSideNavBarDarkModeBackgroundStyling className="headerContainer">
            {this.renderAppHeader()}
          </HeaderAndSideNavBarDarkModeBackgroundStyling>
        )
      }}
    </LightDarkModeContext.Consumer>
  )

  handleLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = this.props
    history.replace('/login')
  }

  renderAppHeader = () => (
    <LightDarkModeContext.Consumer>
      {value => {
        const {inLightMode, changeMode} = value
        return (
          <>
            <Link to="/" style={{color: 'inherit'}}>
              <img
                className="logoStyling"
                src={
                  inLightMode ? logosUrlAccdToMode[0] : logosUrlAccdToMode[1]
                }
                alt="website logo"
              />
            </Link>

            <div>
              <ul className="headerRightSideDetails">
                <li>
                  <button
                    data-testid="theme"
                    onClick={() => {
                      changeMode()
                    }}
                    type="button"
                  >
                    mode
                  </button>
                </li>

                <li>
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/nxt-watch-profile-img.png"
                    alt="profile"
                    className="profileImgStyling"
                  />
                </li>
                <li>
                  <Popup
                    trigger={<button type="button">Logout</button>}
                    modal
                    closeOnDocumentClick={false}
                  >
                    {close => (
                      <div className="popup-content">
                        <p>Are you sure, you want to logout</p>
                        <div>
                          <button onClick={close} type="button">
                            Cancel
                          </button>
                          <button
                            onClick={() => {
                              this.handleLogout()
                              close()
                            }}
                            type="button"
                          >
                            Confirm
                          </button>
                        </div>
                      </div>
                    )}
                  </Popup>
                </li>
              </ul>
            </div>
          </>
        )
      }}
    </LightDarkModeContext.Consumer>
  )

  render() {
    return this.renderHeaderUsingContext()
  }
}

export default withRouter(Header)
