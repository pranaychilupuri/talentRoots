import {Component} from 'react'
import './index.css'

class SignInForm extends Component {
  state = {
    emailId: '',
    password: '',
    showEmailError: false,
    showPasswordError: false,
    isFormSubmitted: false,
    showIncorrectCredentialsError: false,
  }

  validateEmail = () => {
    const {emailId} = this.state

    return emailId !== ''
  }

  validatePassword = () => {
    const {password} = this.state

    return password !== ''
  }

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail()

    this.setState({showEmailError: !isValidEmail})
  }

  onBlurPassword = () => {
    const isValidPassword = this.validatePassword()

    this.setState({showPasswordError: !isValidPassword})
  }

  onChangeEmail = event => {
    const {target} = event
    const {value} = target

    this.setState({
      emailId: value,
    })
  }

  onChangePassword = event => {
    const {target} = event
    const {value} = target

    this.setState({
      password: value,
    })
  }

  onClickGetStartedResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      emailId: '',
      password: '',
    }))
  }

  getStartedForm = event => {
    event.preventDefault()
    const isValidEmail = this.validateEmail()
    const isValidPassword = this.validatePassword()

    if (isValidEmail && isValidPassword) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showEmailError: !isValidEmail,
        showPasswordError: !isValidPassword,
        isFormSubmitted: false,
      })
    }
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label className="input-label" htmlFor="password">
          Password<span className="star-image">*</span>
        </label>
        <input
          type="password"
          id="password"
          className="password-input-field"
          value={password}
          onChange={this.onChangePassword}
          onBlur={this.onBlurPassword}
        />
      </>
    )
  }

  renderEmailField = () => {
    const {emailId} = this.state
    return (
      <>
        <label className="input-label" htmlFor="username">
          Company Email Id<span className="star-image">*</span>
        </label>
        <input
          type="text"
          id="emailId"
          className="email-input-field"
          value={emailId}
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
        />
      </>
    )
  }

  renderSignInReport = () => (
    <>
      <img
        src="https://assets.ccbp.in/frontend/react-js/success-icon-img.png"
        alt="success"
        className="success-image"
      />
      <p>Sign In Successfully</p>
    </>
  )

  validateCredentials = event => {
    event.preventDefault()
    const {emailId, password} = this.state
    const {history} = this.props
    const registrants = JSON.parse(localStorage.getItem('registers'))

    const areCorrectCredentials = registrants.some(
      eachObj => eachObj.emailId === emailId && eachObj.password === password,
    )

    if (areCorrectCredentials) {
      history.replace(`/${emailId}`)
    } else {
      this.setState({showIncorrectCredentialsError: true})
    }
  }

  renderSignInForm = () => {
    const {
      showEmailError,
      showPasswordError,
      showIncorrectCredentialsError,
    } = this.state

    return (
      <div className="login-form-container">
        <img
          src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628516388/loginImage_rw1vo3.jpg"
          className="login-image"
          alt="website login"
        />
        <form className="form-container" onSubmit={this.validateCredentials}>
          <h1 className="heading-text">
            <span className="p-color">P</span>
            ROJECT
          </h1>
          <p className="signin-text">Sign in</p>
          <div className="input-container">{this.renderEmailField()}</div>
          {showEmailError && <p className="error-message">Required</p>}
          <div className="input-container">{this.renderPasswordField()}</div>
          {showPasswordError && <p className="error-message">Required</p>}
          <div className="remind-forgot-container">
            <div className="checkbox-container">
              <input type="checkbox" className="checkbox" id="remind-me" />
              <label className="remind-me" htmlFor="Remind Me">
                Remind Me
              </label>
            </div>
            <a href="forgot password" className="forgot-text">
              Forgot Password?
            </a>
          </div>
          <button type="submit" className="login-button">
            Submit
          </button>
          {showIncorrectCredentialsError && (
            <p className="error-message">Incorrect Credentials</p>
          )}
          <p className="signin-with">Sign in With</p>
          <div className="icons">
            <img
              src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628520322/google-icon_cnq32u.jpg"
              className="icon-size"
              alt="google"
            />
            <img
              src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628520458/microsoft-icon_ogpohg.jpg"
              className="icon-size"
              alt="microsoft"
            />
            <img
              src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628520628/linkedin-icon_fvqmpr.jpg"
              className="icon-size"
              alt="linkedin"
            />
          </div>
        </form>
      </div>
    )
  }

  render() {
    const {isFormSubmitted} = this.state

    return (
      <div className="signup-form-container">
        {isFormSubmitted ? this.renderSignInReport() : this.renderSignInForm()}
      </div>
    )
  }
}

export default SignInForm
