import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles.css'

const container = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML viene prerenderizado (scripts/prerender.mjs); en desarrollo #root está vacío.
if (container.hasChildNodes()) hydrateRoot(container, app)
else createRoot(container).render(app)
