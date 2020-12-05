import React from 'react'
import { Link } from 'react-router-dom'

export default function Users({ data }) {

  return (
    <tr>
      <td>
        <Link to={`/users/${data.id}`}>
          <b>{data.username}</b>
        </Link>
      </td>
      <td><b>{data.blogs.length}</b></td>
    </tr>
  )
}