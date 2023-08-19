import { createContext, useReducer } from 'react'

export const ThemeContext = createContext()

const themeReducer = (state, action) => {
  switch (action.type) {
    case 'SET_DARK':
      return {
        ...action.payload,
      }
    case 'SET_LIGHT':
      return {
        ...action.payload,
      }
    default:
      return state
  }
}

export function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, {
    textPrimary: '#eaeaea',
    bgPrimary: '#404258',
    bgSecondary: '#474e68',
    bgTertiary: '#50577a',
    bgQuaternary: '#6b728e',
    inputBorder: 'none'
  })

  const setDark = (colors) => {
    dispatch({ type: 'SET_DARK', payload: colors })
  }

  const setLight = (colors) => {
    dispatch({ type: 'SET_LIGHT', payload: colors })
  }

  return (
    <ThemeContext.Provider value={{ ...state, setDark, setLight }}>
      {children}
    </ThemeContext.Provider>
  )
}
