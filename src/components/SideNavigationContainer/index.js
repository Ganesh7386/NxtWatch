import {Component} from 'react'
import styled from 'styled-components'
import {withRouter, Link} from 'react-router-dom'
import {
  HeaderAndSideNavBarDarkModeBackgroundStyling,
  HeaderAndSideNavBarLightModeBackgroundStyling,
} from '../StyledComponents/index'
import {lightDarkModeContext} from '../ThemeModeContext'
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

const SideNavBarBackgroundColor = styled.div`
  background-color: ${({inLightMode}) => (inLightMode ? '#ffffff' : '#313131')};
  color: ${({inLightMode}) => (inLightMode ? 'black' : 'white')};
  width: 20%;
`

const EachSideNavBarNavElementbtnStyling = styled.button`
  height: 40px;
  width: 60%;
  padding: 4px;
  border: 3px solid black;
  border-radius: 50px;
  background-color: ${({inLightMode}) => (inLightMode ? 'black' : 'white')};
  color: ${({inLightMode}) => (inLightMode ? 'white' : 'black')};
  &:hover {
    background-color: ${({inLightMode}) => (inLightMode ? 'black' : 'grey')};
  }
`

class SideNavBar extends Component {
  renderSideBarAccdToContextValue = () => (
    <lightDarkModeContext.Consumer>
      {value => {
        const {inLightMode} = value
        return (
          <SideNavBarBackgroundColor inLightMode={inLightMode}>
            {this.renderSideNavBarui()}
          </SideNavBarBackgroundColor>
        )
      }}
    </lightDarkModeContext.Consumer>
  )

  EachLeftSideNavTabs = props => (
    <EachSideNavBarNavElementbtnStyling type="button">
      {props.label}
    </EachSideNavBarNavElementbtnStyling>
  )

  renderSideNavBarui = () => (
    <>
      <div className="leftNavContainer">
        <ul
          style={{
            display: 'flex',
            flexDirection: 'column',
            rowGap: '10px',
            listStyleType: 'none',
            width: '100%',
          }}
        >
          {leftNavigationButtons.map(eachObj => (
            <li key={eachObj.id}>
              <Link
                key={eachObj.id}
                to={`/${eachObj.url}`}
                style={{color: 'inherit'}}
              >
                <this.EachLeftSideNavTabs label={eachObj.label} />
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
