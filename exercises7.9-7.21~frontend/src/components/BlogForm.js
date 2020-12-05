import React, { useState } from 'react'
import blogService from '../services/blogs'
import { addBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { useDispatch } from 'react-redux'

const BlogForm = ({ visibilityReference }) => {
  const dispatch = useDispatch()
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleBlog = async (e) => {
    e.preventDefault()
    visibilityReference.current.toggleVisibility()

    if(title === '' || url === '' || author === ''){
      dispatch(setNotification('Missing Content'), 2000)
      return
    }

    let created = await blogService.create({
      title,
      author,
      url,
    })

    dispatch(addBlog(created))
    dispatch(setNotification(`A new blog ${title} by ${author} added`), 2000)

    setTitle('')
    setAuthor('')
    setUrl('')
  }


  return (
    <form onSubmit={handleBlog}>
      <h3>Create New Blog</h3>
      <div>
        Title:
        <input
          type="text"
          id="title"
          value={title}
          onChange={e => setTitle(e.target.value)}
        />
      </div>
      <div>
        Author:
        <input
          type="text"
          id="author"
          value={author}
          onChange={e => setAuthor(e.target.value)}
        />
      </div>
      <div>
        Url:
        <input
          type="text"
          id="url"
          value={url}
          onChange={e => setUrl(e.target.value)}
        />
      </div>
      <button type="submit" id="createButton">Create</button>
    </form>
  )}

export default BlogForm