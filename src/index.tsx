import { StrictMode } from 'react'
import ReactDOM from 'react-dom/client'
import {
  HashRouter,
  Route,
  Routes
} from 'react-router-dom'
import CssBaseline from '@mui/material/CssBaseline'
import responsiveFont from './utils/responsiveFont'
import websocketTest from './utils/websocketTest'
import AppProvider from "@/providers/AppProvider"
import Home from '@/pages/Home'
import TextEditor from '@/pages/TextToSpeech'
import Settings from '@/pages/Settings'

document.addEventListener('readystatechange', init)

function init() {
  responsiveFont()
  websocketTest()
  const root = document.createElement('div')
  root.setAttribute("style", "display: flex; flex-grow: 1")
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <AppProvider>
        <CssBaseline />
        <HashRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/texteditor" element={<TextEditor />} />
          </Routes>
        </HashRouter>
      </AppProvider>
    </StrictMode>
  )
  document.body.appendChild(root)
}


