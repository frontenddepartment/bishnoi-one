import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

/* Global layers load first so component stylesheets can override them
   and so media queries in components win over the base cascade. */
import './styles/tokens.css'
import './styles/base.css'
import './styles/animations.css'

import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
