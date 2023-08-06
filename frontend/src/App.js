import { data } from './data'
import { useState } from 'react'

function App() {
  const [categories, setCategories] = useState(data)

  console.log(categories)

  return (
    <div className='app'>
      <div className='wrapper'>
        <div className='left'>
          <div className='left-item menu'>menu</div>
          <div className='left-item categories'>categories</div>
          <div className='left-item recipes'>recipes</div>
        </div>
        <div className='right'>right</div>
      </div>
    </div>
  )
}

export default App
