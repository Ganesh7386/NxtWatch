import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'
import {
  HeaderAndSideNavBarDarkModeBackgroundStyling,
  HeaderAndSideNavBarLightModeBackgroundStyling,
} from '../StyledComponents/index'
import lightDarkModeContext from '../ThemeModeContext'
import './index.css'

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

class SideNavBar extends Component {
  renderSideBarAccdToContextValue = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        if (inLightMode) {
          return (
            <HeaderAndSideNavBarLightModeBackgroundStyling className="leftNavContainer">
              {this.renderSideNavBarui()}
            </HeaderAndSideNavBarLightModeBackgroundStyling>
          )
        }
        return (
          <HeaderAndSideNavBarDarkModeBackgroundStyling className="leftNavContainer">
            {this.renderSideNavBarui()}
          </HeaderAndSideNavBarDarkModeBackgroundStyling>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  renderSideNavBarui = () => (
    <>
      <div className="leftNavContainer">
        <ul style={{display: 'flex', flexDirection: 'column'}}>
          {leftNavigationButtons.map(eachObj => (
            <li>
              <Link
                key={eachObj.id}
                to={`/${eachObj.url}`}
                style={{color: 'inherit'}}
              >
                {eachObj.label}
              </Link>
            </li>
          ))}
        </ul>
        <div className="sideNavBarBottomDetailsContainer">
          <p>CONTACT US</p>
          <ul style={{display: 'flex', listStyleType: 'none'}}>
            <li>
              <img
                style={{height: '30px', width: '30px'}}
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-facebook-logo-img.png"
                alt="facebook logo"
              />
            </li>
            <li>
              <img
                style={{height: '30px', width: '30px'}}
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-twitter-logo-img.png"
                alt="twitter logo"
              />
            </li>
            <li>
              <img
                style={{height: '30px', width: '30px'}}
                src="https://assets.ccbp.in/frontend/react-js/nxt-watch-linked-in-logo-img.png"
                alt="linked in logo"
              />
            </li>
          </ul>
          <p>Enjoy! Now to see your channels and recommendations!</p>
        </div>
      </div>
    </>
  )

  render() {
    return this.renderSideBarAccdToContextValue()
  }
}

export default withRouter(SideNavBar)
