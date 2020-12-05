import React from 'react'
import { Link } from 'react-router-dom'

export default function NavBar() {
  return (
    <>
      <nav className="navbar navbar-light bg-light">
        <Link className="navbar-brand text-primary" to={'/'}>Blogs</Link>
        <Link className="navbar-brand text-primary" to={'/users'}>Users</Link>
      </nav>
    </>
  )
}