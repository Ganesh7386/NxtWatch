import {BrowserRouter, Route, Switch} from 'react-router-dom'
import {Component} from 'react'

import './App.css'
import {Home} from './components/Home/index'
import Login from './components/Login/index'
import Trending from './components/Trending/index'
import Gaming from './components/Gaming/index'
import SavedVideos from './components/SavedVideos/index'
import ProtectedRoute from './components/ProtectedRoute/index'
import EachVideoDetails from './components/EachVideoDetails/index'
import {LightDarkModeContextProvider} from './components/ThemeModeContext/index'
// import SavedVideosContext from './components/SavedVideosContext/index'

// Replace your code here

class App extends Component {
  //   state = {
  //     inLightMode: true,
  //   }

  //   handleChangeMode = () => {
  //     this.setState(prevState => ({inLightMode: !prevState.inLightMode}))
  //   }

  render() {
    // const {inLightMode} = this.state
    console.log('app rendered')

    return (
      <LightDarkModeContextProvider>
        <>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
              <ProtectedRoute
                exact
                path="/videos/:id/"
                component={EachVideoDetails}
              />
            </Switch>
          </BrowserRouter>
        </>
      </LightDarkModeContextProvider>
    )
  }
}

/*
class App extends Component {
  state = {
    inLightMode: true,
  }

  handleChangeMode = () => {
    this.setState(prevState => ({inLightMode: !prevState.inLightMode}))
  }

  render() {
    const {inLightMode} = this.state
    console.log('app rendered')

    return (
      <lightDarkModeContext.Provider
        value={{inLightMode, changeMode: this.handleChangeMode}}
      >
        <>
          <BrowserRouter>
            <Switch>
              <Route exact path="/login" component={Login} />
              <ProtectedRoute exact path="/" component={Home} />
              <ProtectedRoute exact path="/trending" component={Trending} />
              <ProtectedRoute exact path="/gaming" component={Gaming} />
              <ProtectedRoute
                exact
                path="/saved-videos"
                component={SavedVideos}
              />
              <ProtectedRoute
                exact
                path="/videos/:id/"
                component={EachVideoDetails}
              />
            </Switch>
          </BrowserRouter>
        </>
      </lightDarkModeContext.Provider>
    )
  }
}
*/

export default App
