import ReactDOM from 'react-dom/client'
import { ThemeProvider } from './context/ThemeContext'
import App from './App'
import './index.scss'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <ThemeProvider>
    <App />
  </ThemeProvider>
)
