import React from 'react'
import ReactDOM from 'react-dom/client'
import UserProfile from './components/UserProfile'
import './App.css'

function App() {
  return (
    <div className='sm:p-4 md:p-8 sm:max-w-xm md:max-w-sm'>
      <UserProfile />
    </div>
  )
}

export default App
