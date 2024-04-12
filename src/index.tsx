import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './utils/theme';
import Home from './pages/Home';


document.addEventListener('readystatechange', init);

function init() {
  const root = document.createElement('div');
  root.setAttribute("style", "display: flex; flex-grow: 1");
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  )
  document.body.appendChild(root);
}


