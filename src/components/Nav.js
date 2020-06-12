import React from 'react'
import { Link } from 'react-router-dom'
import logo from './../images/logo1.jpg'


function Nav() {
  const navStyle = {
    color: 'white'
  }

  return (
    <nav>
      <h3><Link style={navStyle} to='/'><img className="logo" src={logo}></img></Link></h3>
      <ul className="nav-link">
        <Link style={navStyle} to='/settings'><li>Settings</li></Link>
        <Link style={navStyle} to='/about'><li>About</li></Link>
      </ul>
    </nav>
  );
}

export default Nav
