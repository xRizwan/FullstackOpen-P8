const reducer = (state=null, action) => {
  switch (action.type) {
  case 'SET_USER':
    return action.data
  default:
    return state
  }
}

export const setUser = (data) => {
  return async (dispatch) => {
    dispatch ({
      type: 'SET_USER',
      data,
    })
  }
}

export default reducer