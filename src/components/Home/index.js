import {Component} from 'react'
import Drawer from '@material-ui/core/Drawer'
import LeaveType from '../LeaveType'
import Header from '../Header'
import AddLeavePolicy from '../AddLeavePolicy'
import './index.css'

class Home extends Component {
  constructor() {
    super()
    this.state = {
      leaveType: [],
      onClickAddLeave: false,
    }
  }

  toggleDrawer = open => event => {
    console.log('toggle called')
    if (
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return
    }
    this.setState({onClickAddLeave: open})
  }

  deleteLeaveType = id => {
    const {leaveType} = this.state
    const updatedLeaveType = leaveType.filter(eachObj => id !== eachObj.id)
    this.setState({
      leaveType: updatedLeaveType,
    })
  }

  render() {
    const {onClickAddLeave} = this.state
    const {match} = this.props
    const {emailId} = match.params
    const registrants = JSON.parse(localStorage.getItem('registers'))
    console.log(registrants, 'registrants')
    const registrantArr = registrants.filter(
      eachObj => eachObj.emailId === emailId,
    )
    const {leaves} = registrantArr[0]

    return (
      <>
        <Header />
        <div className="home-container">
          <div className="time-off-container">
            <p className="time-off-text">Time Off</p>
            <button
              type="button"
              onClick={this.toggleDrawer(true)}
              className="add-leave-button"
            >
              + Add Leave Policy
            </button>
            <Drawer
              anchor="right"
              open={onClickAddLeave}
              onClose={this.toggleDrawer(false)}
            >
              <AddLeavePolicy
                emailId={emailId}
                closeDrawer={this.toggleDrawer}
              />
            </Drawer>
          </div>
        </div>
        <div className="heading-container">
          <ul className="heading-list-container">
            <li className="table-header">
              <p className="table-header-cell">Name</p>
              <p className="table-header-cell">Day</p>
              <p className="table-header-cell">Create On</p>
              <p className="table-header-cell">Action</p>
            </li>
            {leaves.map(eachLeave => (
              <LeaveType
                id={eachLeave.id}
                emailId={emailId}
                typeOfLeave={eachLeave.policyName}
                day={eachLeave.leaveDays}
                deleteLeaveType={this.deleteLeaveType}
              />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Home
