import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom';
import { App } from './pages';
import { Test } from './pages/test'
import './index.css';

document.addEventListener('readystatechange', init);

const router = createBrowserRouter([
  {
    path: '/',
    element: <App/>,
  },
  {
    path: '/test',
    element: <Test/>,
  }
]);

function init() {
  const root = document.createElement('div');
  ReactDOM.createRoot(root).render(
    <StrictMode>
      <RouterProvider router={router} />
    </StrictMode>,
  )
  document.body.appendChild(root);
}


