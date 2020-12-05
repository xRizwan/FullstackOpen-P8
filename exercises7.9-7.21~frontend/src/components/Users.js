import React, { useState, useEffect } from 'react'
import userService from '../services/users'
import User from './User'

export default function Users() {
  const [users, setUsers] = useState(null)

  useEffect(() => {
    userService.getAll()
      .then(res => {
        setUsers(res)
      })
  }, [])


  return (
    <>
      <h1>Users</h1>
      {users && (<table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Blogs Created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => <User key={user.id} data={user} />)}
        </tbody>
      </table>
      )}
    </>
  )
}