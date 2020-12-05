import React, { useEffect, useRef } from 'react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import Togglable from './Toggleable'
import { useSelector, useDispatch } from 'react-redux'
import { initBlogs } from '../reducers/blogReducer'

const Blogs = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const blogs = useSelector(state => state.blogs)
  const blogRef = useRef()

  useEffect(() => {
    dispatch(initBlogs())
  }, [dispatch])

  return (
    <div>
      {user !== null && (
        <div>
          <Togglable buttonLabel='New Blog' ref={blogRef}>
            <BlogForm
              visibilityReference={blogRef}
            />
          </Togglable>
          <h2>blogs</h2>
          {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
            <Blog key={blog.id} blogData={blog} userData={user} />
          )}
        </div>
      )}
    </div>
  )
}

export default Blogs