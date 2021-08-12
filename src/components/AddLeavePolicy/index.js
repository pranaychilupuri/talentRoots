import {Component} from 'react'
import './index.css'

class AddLeavePolicy extends Component {
  state = {
    policyName: '',
    leaveDays: '',
    description: '',
  }

  onChangePolicyName = event => {
    this.setState({policyName: event.target.value})
  }

  onChangeLeaveDays = event => {
    this.setState({leaveDays: event.target.value})
  }

  onChangeDescription = event => {
    this.setState({description: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {policyName, leaveDays, description} = this.state
    const {emailId, closeDrawer} = this.props
    const camelCaseFormat = {
      'Sick Leave': 'sickLeaves',
      'Plan Leave': 'planLeaves',
      'Casual Leave': 'casualLeaves',
    }
    const newLeavePolicy = {
      id: Date.now(),
      policyName,
      leaveDays,
      description,
    }

    const registrants = JSON.parse(localStorage.getItem('registers'))
    const index = registrants.findIndex(eachObj => eachObj.emailId === emailId)
    registrants[index].leaves.push(newLeavePolicy)
    console.log(registrants[index].remainingLeaves)
    if (
      registrants[index].remainingLeaves[camelCaseFormat[policyName]] !== 0 &&
      registrants[index].remainingLeaves[camelCaseFormat[policyName]] >=
        leaveDays
    ) {
      registrants[index].remainingLeaves[
        camelCaseFormat[policyName]
      ] -= leaveDays

      localStorage.setItem('registers', JSON.stringify(registrants))
      closeDrawer(true)
    } else {
      alert('You are not eligible for mentioned leave days.')
    }
  }

  render() {
    const {policyName, leaveDays, description} = this.state

    return (
      <div className="app-container">
        <div className="add-container">
          <div className="add-heading-container">
            <p className="add-heading">Add Leave Policy</p>
          </div>
          <form className="contact-form-container" onSubmit={this.onSubmit}>
            <label className="input-label" htmlFor="policyName">
              Policy Name
            </label>
            <input
              type="text"
              id="policyName"
              value={policyName}
              onChange={this.onChangePolicyName}
              className="input"
              placeholder="Name of Policy"
            />
            <label className="input-label" htmlFor="leaveDays">
              Leave Days
            </label>
            <input
              type="number"
              id="leaveDays"
              className="input"
              value={leaveDays}
              onChange={this.onChangeLeaveDays}
              placeholder="Number Of Days"
            />
            <label className="input-label" htmlFor="description">
              Description
            </label>
            <input
              type="text"
              id="description"
              className="input-description"
              value={description}
              onChange={this.onChangeDescription}
              placeholder="Enter Leave Description"
            />
            <div className="add-button-container">
              <button type="submit" className="button">
                + Add New Policy
              </button>
            </div>
          </form>
          <div className="button-container">
            <button type="submit" className="submit-button">
              Submit
            </button>
            <button type="submit" className="close-button">
              Close
            </button>
          </div>
        </div>
      </div>
    )
  }
}

export default AddLeavePolicy
