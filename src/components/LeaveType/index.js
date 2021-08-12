import Popover from '../Popover'
import './index.css'

const LeaveType = props => {
  const monthName = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ]
  const {typeOfLeave, day, id, emailId} = props
  const createdDate = new Date(Date.now())
  const date = createdDate.getDate()
  const Month = createdDate.getMonth()
  const year = createdDate.getFullYear()

  const onDeleteClick = () => {
    const camelCaseFormat = {
      'Sick Leave': 'sickLeaves',
      'Plan Leave': 'planLeaves',
      'Casual Leave': 'casualLeaves',
    }

    const registrants = JSON.parse(localStorage.getItem('registers'))
    const index = registrants.findIndex(eachObj => eachObj.emailId === emailId)
    const leaveIndex = registrants[index].leaves.findIndex(
      eachObj => eachObj.id === id,
    )
    console.log(
      typeof day,
      typeof registrants[index].remainingLeaves[camelCaseFormat[typeOfLeave]],
      registrants[index].remainingLeaves[camelCaseFormat[typeOfLeave]],
    )
    registrants[index].leaves.splice(leaveIndex, 1)
    registrants[index].remainingLeaves[camelCaseFormat[typeOfLeave]] += day
    localStorage.setItem('registers', JSON.stringify(registrants))
  }

  return (
    <li className="table-row">
      <p className="row-text">{typeOfLeave}</p>
      <p className="row-text">{day}</p>
      <p className="row-text">
        {date} {monthName[Month]} {year}
      </p>
      <div className="delete-container">
        <button className="delete-button" type="button" testid="delete">
          <Popover onDeleteClick={onDeleteClick} id={id} />
        </button>
      </div>
    </li>
  )
}

export default LeaveType
