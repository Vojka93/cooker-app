import './modal.scss'

export default function Modal() {
  return (
    <div className='modal-wrapper'>
      <div className='modal'>
        <div className='modal-header'>
          <div className='modal-title'>Modal Title</div>
          <button>X</button>
        </div>
        <hr />
        <div className='modal-body'>
          <div className='modal-text'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            Reprehenderit!
          </div>
        </div>
        <hr />

        <div className='modal-footer'>
          <button>Close</button>
        </div>
      </div>
    </div>
  )
}
