import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import ThemeProvider from '@mui/material/styles/ThemeProvider';
import theme from './utils/muiTheme';
import Home from './pages/home';


document.addEventListener('readystatechange', init);

function init() {
  const root = document.createElement('div');
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


