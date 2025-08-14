import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import GetLastFMINFO from './LastFMInfo/LastFMInfo.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
   <GetLastFMINFO />
  </StrictMode>
)
