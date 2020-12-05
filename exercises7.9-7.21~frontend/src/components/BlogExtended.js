import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import blogService from '../services/blogs'
import { useSelector } from 'react-redux'

const BlogExtended = () => {
  const params = useParams()
  const [ message, setMessage ] = useState('')
  const [ blog, setBlog ] = useState(null)
  const [ comments, setComments ] = useState([])
  const user = useSelector(state => state.user)

  useEffect(() => {
    blogService.getBlog(params.id)
      .then(res => {
        console.log(res)
        setComments(res.comments)
        setBlog(res)
      })
  }, [params.id])

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const handleLikes = async () => {
    const obj = {
      user: blog.user.id,
      likes: parseInt(blog.likes) + 1,
      author: blog.author,
      title: blog.title,
      url: blog.url,
    }

    try {
      await blogService.update(`${blog.id}`, obj)
      setBlog(blog => ({ ...blog, likes: blog.likes + 1 }))
    } catch (err) {
      console.log(err)
    }
  }

  const handleRemove = async () => {
    const result = window.confirm(`Remove blog ${blog.title} by ${blog.author}?`)
    if (result) {
      const result = await blogService.delete(blog.id)
      if (result.status === 204) {
        setBlog(null)
      }
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log(message)

    blogService.postComment(blog.id, message)
      .then(res => {
        const newObj = { message: res.message, id: res.id }
        setComments(comments => comments.concat(newObj))
        setMessage('')
      })
  }

  if (blog === null) {
    return (
      <div></div>
    )
  }

  return (
    <div style={blogStyle} className="blog">
      <div className="blogInfo">
        <h2>{blog.title}</h2>
      </div>
      { blog && (
        <>
          <div>
            {blog.url}
          </div>
          <div className="likes">
            likes {blog.likes} <button onClick={handleLikes} className="likeButton">Like</button>
          </div>
          <div>
            { blog.user ? blog.user.username : null}
          </div>
          {blog.user.username === user.username
            ? <button onClick={handleRemove} className="deleteButton">Remove</button>
            : null}
          <div>Added by {blog.user.username}</div>
        </>
      )}
      <h4>Comments</h4>
      <form onSubmit={handleSubmit}>
        <input type="text" name="comment" value={message} onChange={({ target }) => setMessage(target.value)} />
        <input type="submit"/>
      </form>
      <ul>
        {comments && (
          comments.map(comment => <li key={comment.id}>{comment.message}</li>)
        )}
      </ul>
    </div>
  )
}

export default BlogExtended
