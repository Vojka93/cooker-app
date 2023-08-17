import './menu.scss'
import { VscSearch, VscColorMode } from 'react-icons/vsc'
import { BiFoodMenu } from 'react-icons/bi'

export default function Menu({ itemSelected, setItemSelected }) {
  return (
    <div className='menu'>
      <nav>
        <ul>
          <li
            className={itemSelected === 'Library' ? 'selected' : ''}
            onClick={() => setItemSelected('Library')}
          >
            <BiFoodMenu />
          </li>
          <li
            className={itemSelected === 'Search' ? 'selected' : ''}
            onClick={() => setItemSelected('Search')}
          >
            <VscSearch />
          </li>
          <li
            className='color'
            onClick={() => console.log('hi')}
          >
            <VscColorMode />
          </li>
        </ul>
      </nav>
    </div>
  )
}
