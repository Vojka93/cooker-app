import './menu.scss'
import { VscSearch } from 'react-icons/vsc'
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
        </ul>
      </nav>
    </div>
  )
}
