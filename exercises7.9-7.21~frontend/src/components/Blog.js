import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const Blog = ({ blogData }) => {

  // eslint-disable-next-line
  const [ blog, setBlog ] = useState(blogData)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  if (blog === null) {
    return (
      <div></div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blogInfo">
        <Link to={`blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </div>
    </div>
  )
}

export default Blog
