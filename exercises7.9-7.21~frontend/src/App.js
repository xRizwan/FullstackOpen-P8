import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { setNotification } from './reducers/notificationReducer'
import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Togglable from './components/Toggleable'
import LoginForm from './components/LoginForm'
import Blogs from './components/Blogs'
import Users from './components/Users'
import UserExtended from './components/UserExtended'
import BlogExtended from './components/BlogExtended'
import NavBar from './components/NavBar'
import './App.css'

const App = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const notification = useSelector(state => state.notification)

  const handleLogout = () => {
    dispatch(setUser(null))
    dispatch(setNotification('Logged Out', 1000))
    window.localStorage.clear()
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [dispatch])

  return (
    <div>
      <Router>
        <NavBar />
        <Notification message={notification} />
        {user === null && (
          <Togglable buttonLabel='login' visible={true}>
            <LoginForm />
          </Togglable>)
        }
        {user !== null && (
          <p>{user.name} logged-in <button onClick={handleLogout}>LogOut</button></p>
        )}
        <Switch>
          <Route exact path="/">
            <Blogs />
          </Route>
          <Route exact path="/blogs/:id">
            <BlogExtended />
          </Route>
          <Route exact path="/users/:id">
            <UserExtended />
          </Route>
          <Route exact path="/users">
            <Users />
          </Route>
        </Switch>
      </Router>
    </div>
  )
}

export default App