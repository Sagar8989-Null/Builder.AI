import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter,RouterProvider,} from "react-router-dom";
import Main from './Pages/Main.jsx';

const router = createBrowserRouter([
  {
  path : "/",
  element : <App/>
  },
  {
    path: "/main",
    element : <Main/>
  }

])

createRoot(document.getElementById('root')).render(
  <StrictMode>
      {/* <App /> */}
      <RouterProvider router={router} />
  </StrictMode>,
)
