import React, { useEffect, useState } from 'react'
import userService from '../services/users'
import { useParams, Link } from 'react-router-dom'


export default function UserExtended() {
  const [user, setUser] = useState()
  const params = useParams()

  useEffect(() => {
    userService.getUser(params.id)
      .then(res => {
        setUser(res)
      })
  }, [params.id])


  return (
    <>
      {user && (
        <>
          <h1>{user.username}</h1>
          <h3>Added Blogs</h3>
          <ul>
            {user.blogs.map(blog => (
              <li key={blog.id}>
                <Link to={`blogs/${blog.id}`}>{blog.title}</Link>
              </li>
            ))}
          </ul>
        </>
      )}
    </>
  )
}