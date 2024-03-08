import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter,
  Route,
  Routes
} from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider } from '@mui/material/styles';
import { theme } from './utils';
import { Home, Test } from './pages';


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
          <Route path="/test" element={<Test />} />
        </Routes>
      </BrowserRouter>
      </ThemeProvider>
    </StrictMode>
  )
  document.body.appendChild(root);
}


