import './menu.scss'
import { VscSearch, VscColorMode } from 'react-icons/vsc'
import { BiFoodMenu } from 'react-icons/bi'
import useTheme from '../../hooks/useTheme'
import { useState } from 'react'

const darkColors = {
  textPrimary: '#eaeaea',
  bgQuaternary: '#6b728e',
  bgTertiary: '#50577a',
  bgPrimary: '#404258',
  inputBorder: 'none',
}

const lightColors = {
  textPrimary: '#000000',
  bgQuaternary: '#F3F2F1',
  bgTertiary: '#FAF9F8',
  bgPrimary: '#FFFFFF',
  inputBorder: '1px solid black',
}

export default function Menu({ itemSelected, setItemSelected }) {
  const [isDark, setIsDark] = useState(true)
  const { bgQuaternary, setDark, setLight } = useTheme()

  const handleThemeChange = () => {
    setIsDark(!isDark)

    if (isDark) {
      setLight(lightColors)
    }

    if (!isDark) {
      setDark(darkColors)
    }
  }

  return (
    <div className='menu' style={{ backgroundColor: bgQuaternary }}>
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

          <li className='color' onClick={handleThemeChange}>
            <VscColorMode />
          </li>
        </ul>
      </nav>
    </div>
  )
}
