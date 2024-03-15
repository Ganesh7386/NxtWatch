import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showPswd: false,
  }

  handleSuccessLogin = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 1})
    const {history} = this.props
    console.log(history)
    history.replace('/')
  }

  handleLoggingUsingApi = async takenDetails => {
    const loginApiDetails = {
      method: 'POST',
      body: JSON.stringify(takenDetails),
    }
    console.log(loginApiDetails)
    const loggingApiPromise = await fetch(
      'https://apis.ccbp.in/login',
      loginApiDetails,
    )
    const parsedResponseFromPromise = await loggingApiPromise.json()
    console.log(loggingApiPromise)
    if (loggingApiPromise.ok) {
      this.handleSuccessLogin(parsedResponseFromPromise.jwt_token)
    } else {
      this.setState({errorMsg: parsedResponseFromPromise.error_msg})
    }
  }

  handleSubmit = event => {
    event.preventDefault()
    const {username, password} = this.state
    console.log({username, password})
    const takenDetails = {username, password}
    // make an api call
    this.handleLoggingUsingApi(takenDetails)
  }

  handleTakingUsername = event => {
    this.setState({username: event.target.value})
  }

  handleTakingPassword = event => {
    this.setState({password: event.target.value})
  }

  handleShowPswd = () => {
    this.setState(prevState => ({showPswd: !prevState.showPswd}))
  }

  render() {
    const {errorMsg, showPswd} = this.state
    const token = Cookies.get('jwt_token')
    if (token !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <img
          src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
          alt="website logo"
          className="logoStyling"
        />
        <label htmlFor="username">USERNAME</label>
        <input type="text" id="username" onChange={this.handleTakingUsername} />
        <br />
        <label htmlFor="PswDInput">PASSWORD</label>
        <input
          type={showPswd ? 'text' : 'password'}
          id="PswDInput"
          onChange={this.handleTakingPassword}
        />
        <br />
        <input
          id="showPassword"
          type="checkbox"
          checked={showPswd}
          onChange={this.handleShowPswd}
        />
        <label htmlFor="showPassword">Show Password</label>
        <br />
        <button className="loginBtnStyling" type="submit">
          Login
        </button>
        <p>{errorMsg}</p>
      </form>
    )
  }
}

export default Login
