import {useState} from 'react'
import {Button, Popover} from 'reactstrap'
import './index.css'

const Example = props => {
  const [popoverOpen, setPopoverOpen] = useState(false)
  const {onDeleteClick} = props
  const toggle = () => setPopoverOpen(!popoverOpen)

  return (
    <div className="pop-container">
      <Button id="Popover1" type="button">
        <img
          src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628768768/pop-icon_g0f4ov.jpg"
          className="pop-icon"
          alt="pop icon"
        />
      </Button>
      <div>
        <Popover
          placement="bottom"
          isOpen={popoverOpen}
          target="Popover1"
          toggle={toggle}
        >
          <div className="pop-over">
            <button type="button" className="edit-container">
              <img
                src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628771152/edit_image_eflkyv.png"
                className="icon"
                alt="edit"
              />
              Edit
            </button>
            <button
              type="button"
              className="edit-container"
              onClick={onDeleteClick}
            >
              <img
                src="https://res.cloudinary.com/dklo7bpno/image/upload/v1628771152/del_image_vsviay.png"
                className="icon"
                alt="delete"
              />
              Delete
            </button>
          </div>
        </Popover>
      </div>
    </div>
  )
}

export default Example
