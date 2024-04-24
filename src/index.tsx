import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AppProvider from "./providers/AppProvider"
import TextEditor from './pages/TextEditor';


document.addEventListener('readystatechange', init);

function init() {
  const root = document.createElement('div');
  root.setAttribute("style", "display: flex; flex-grow: 1");
  ReactDOM.createRoot(root).render(
    <StrictMode>
        <AppProvider>
          <CssBaseline />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<TextEditor />} />
            </Routes>
          </BrowserRouter>
        </AppProvider>
    </StrictMode>
  )
  document.body.appendChild(root);
}


