import './createSection.scss'

export default function CreateSection({ icon }) {
  return (
    <div className='create-section'>
      <button onClick={() => console.log("HELLO")}>
        {icon}
      </button>
    </div>
  )
}
