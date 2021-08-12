import {Component} from 'react'
import './index.css'

class SignUpForm extends Component {
  constructor() {
    super()
    this.state = {
      companyName: '',
      emailId: '',
      password: '',
      repeatPassword: '',
      showCompanyNameError: false,
      showEmailError: false,
      showPasswordError: false,
      showRepeatPasswordError: false,
      isFormSubmitted: false,
    }
    this.registers = this.getLocalStorage()
    this.count = this.registers.length
  }

  validateCompanyName = () => {
    const {companyName} = this.state

    return companyName !== ''
  }

  validateEmail = () => {
    const {emailId} = this.state

    return emailId !== ''
  }

  validatePassword = () => {
    const {password} = this.state

    return password !== ''
  }

  validateRepeatPassword = () => {
    const {repeatPassword} = this.state

    return repeatPassword !== ''
  }

  onChangeCompanyName = event => {
    this.setState({
      companyName: event.target.value,
    })
  }

  onChangeEmail = event => {
    this.setState({
      emailId: event.target.value,
    })
  }

  onChangePassword = event => {
    this.setState({
      password: event.target.value,
    })
  }

  onChangeRepeatPassword = event => {
    this.setState({
      repeatPassword: event.target.value,
    })
  }

  onBlurEmail = () => {
    const isValidEmail = this.validateEmail()

    this.setState({showEmailError: !isValidEmail})
  }

  onBlurCompanyName = () => {
    const isValidCompanyName = this.validateCompanyName()

    this.setState({showCompanyNameError: !isValidCompanyName})
  }

  onBlurPassword = () => {
    const isValidPassword = this.validatePassword()

    this.setState({showPasswordError: !isValidPassword})
  }

  onBlurRepeatPassword = () => {
    const isValidRepeatPassword = this.validateRepeatPassword()

    this.setState({showRepeatPasswordError: !isValidRepeatPassword})
  }

  onClickGetStartedResponse = () => {
    this.setState(prevState => ({
      isFormSubmitted: !prevState.isFormSubmitted,
      companyName: '',
      emailId: '',
      password: '',
      repeatPassword: '',
    }))
  }

  getStartedForm = event => {
    event.preventDefault()
    const isValidCompanyName = this.validateCompanyName()
    const isValidEmail = this.validateEmail()
    const isValidPassword = this.validatePassword()
    const isValidRepeatPassword = this.validateRepeatPassword()

    if (
      isValidCompanyName &&
      isValidEmail &&
      isValidPassword &&
      isValidRepeatPassword
    ) {
      this.setState({isFormSubmitted: true})
    } else {
      this.setState({
        showCompanyNameError: !isValidCompanyName,
        showEmailError: !isValidEmail,
        showPasswordError: !isValidPassword,
        showRepeatPasswordError: !isValidRepeatPassword,
        isFormSubmitted: false,
      })
    }
  }

  getLocalStorage = () => {
    const stringifiedList = localStorage.getItem('registers')
    const parsedRegister = JSON.parse(stringifiedList)
    if (parsedRegister === null) {
      return []
    }

    return parsedRegister
  }

  onClickSubmit = event => {
    event.preventDefault()
    const {companyName, emailId, password, repeatPassword} = this.state

    if (password === repeatPassword) {
      const newRegister = {
        companyName,
        emailId,
        password,
        leaves: [],
        remainingLeaves: {
          sickLeaves: 6,
          planLeaves: 12,
          casualLeaves: 6,
        },
      }
      this.registers.push(newRegister)
      this.setState(prevState => ({
        isFormSubmitted: !prevState.isFormSubmitted,
      }))
      localStorage.setItem('registers', JSON.stringify(this.registers))
      return null
    }
    return 'Password doesnot match'
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

  renderRepeatPasswordField = () => {
    const {repeatPassword} = this.state
    return (
      <>
        <label className="input-label" htmlFor="repeatPassword">
          Repeat Password<span className="star-image">*</span>
        </label>
        <input
          type="password"
          id="repeatPassword"
          className="password-input-field"
          value={repeatPassword}
          onChange={this.onChangeRepeatPassword}
          onBlur={this.onBlurRepeatPassword}
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
          className="username-input-field"
          value={emailId}
          onChange={this.onChangeEmail}
          onBlur={this.onBlurEmail}
        />
      </>
    )
  }

  renderCompanyNameField = () => {
    const {companyName} = this.state
    return (
      <>
        <label className="input-label" htmlFor="companyName">
          Company Name<span className="star-image">*</span>
        </label>
        <input
          type="text"
          id="companyName"
          className="companyName-input-field"
          value={companyName}
          onChange={this.onChangeCompanyName}
          onBlur={this.onBlurCompanyName}
        />
      </>
    )
  }

  renderSignUpReport = () => {
    const {history} = this.props
    history.replace('/signin')
  }

  renderSignUpForm = () => {
    const {
      showCompanyNameError,
      showEmailError,
      showPasswordError,
      showRepeatPasswordError,
    } = this.state

    return (
      <div className="signup-form-container">
        <img
          src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628516388/loginImage_rw1vo3.jpg"
          className="signup-image"
          alt="website signup"
        />
        <form className="form-container" onSubmit={this.onClickSubmit}>
          <h1 className="heading-text">
            <span className="p-color">P</span>
            ROJECT
          </h1>
          <p className="signup-text">Sign up</p>
          <div className="input-container">{this.renderCompanyNameField()}</div>
          {showCompanyNameError && <p className="error-message">Required</p>}
          <div className="input-container">{this.renderEmailField()}</div>
          {showEmailError && <p className="error-message">Required</p>}
          <div className="input-container">{this.renderPasswordField()}</div>
          {showPasswordError && <p className="error-message">Required</p>}
          <div className="input-container">
            {this.renderRepeatPasswordField()}
          </div>
          {showRepeatPasswordError && <p className="error-message">Required</p>}
          <button type="submit" className="signup-button">
            Submit
          </button>
          <p className="signup-with">Sign up With</p>
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
        {isFormSubmitted ? this.renderSignUpReport() : this.renderSignUpForm()}
      </div>
    )
  }
}

export default SignUpForm
