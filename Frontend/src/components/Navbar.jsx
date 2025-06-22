import React from 'react'
import '../Styles/Navbar.css'

const Navbar = () => {
  return (
    <>
    <nav className='container'>
        <div className="logo">
            <img src='/gettyimages-985915172-612x612.jpg' alt="logo" />
        </div>
        <ul>
            <li>Github</li>
            <li>LinkedIn</li>
            <li>xyz</li>
        </ul>
    </nav>
    </>
    
  )
}

export default Navbar
