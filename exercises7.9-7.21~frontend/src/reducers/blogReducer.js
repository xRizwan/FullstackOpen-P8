import blogService from '../services/blogs'

const reducer = (state = [], action) => {

  switch (action.type) {
  case 'ADD_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data
  default:
    return state
  }
}

export const addBlog = (data) => {
  return async (dispatch) => {
    dispatch({
      type: 'ADD_BLOG',
      data,
    })
  }
}

export const initBlogs = () => {
  return async (dispatch) => {
    const data = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data
    })
  }
}

export default reducer