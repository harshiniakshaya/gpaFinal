import React from 'react'
import Home from './pages/Home'
import './styles/Home.css'
import { FaGithub } from "react-icons/fa";

const App = () => {
  return (
    <div>
      <Home />
      <a href='https://github.com/harshiniakshaya/gpaFinal' target='_blank'><FaGithub 
            className='github-icon fixed bottom-4 right-4 text-3xl cursor-pointer bg-transparent'
        /> 
      </a>
    </div>
  )
}

export default App