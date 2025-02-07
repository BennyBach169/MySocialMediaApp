import { BrowserRouter } from 'react-router-dom'
import './App.css'
import { Menu } from './Components/Menu/Menu'
import { Routing } from './Components/Routing/Routing'
import { useEffect, useState } from 'react'
import { authStore } from './redux/AuthStore'
import axios from 'axios'
import { getToeknState } from './Utils'
import { ToastNotifications } from './Components/ToastNotifications'
import { Token } from '@mui/icons-material'
import { AboutProject } from './Components/AboutProject/AboutProject'
import { MenuLogInButton } from './Components/Menu/MenuLogInButton/MenuLogInButton'


function App() {

 

  useEffect(()=>{
    
  },[authStore.getState().token])



  return (
    <div className='App' >
      <ToastNotifications />
      <div className='phoneProfile'>
        <span className='prfileContainerForPhone'>
      <MenuLogInButton/>
      </span>
      <span className='logoContainer' >
      <img src="/assets/Golden Black Minimalist Elegant Apartment Logo (2).png" alt="" />
      </span>
      </div>
      <Menu />
      <div className='routes'>
      <Routing  />
      </div>
      <AboutProject/>
    </div>
  )
}

export default App
