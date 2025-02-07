import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter, useNavigate  } from 'react-router-dom'
import { Login } from './Components/Login/Login.tsx'
import axios from 'axios'
import authService from './services/AuthService.ts'
import { authStore, logOut } from './redux/AuthStore.ts'
import { Token } from '@mui/icons-material'




axios.interceptors.request.use(function (config) {
  const token = authStore.getState().token
  if (token ) { // if token exists
      config.headers.Authorization = "Bearer " + token;
  }
  return config;
});




createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
    <App  />
    </BrowserRouter>
  </StrictMode>,
)
