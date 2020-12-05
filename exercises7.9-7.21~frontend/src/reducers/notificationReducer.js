import { setTimeoutID } from './timeoutReducer'

const notificationReducer = (state='', action) => {
  switch (action.type){
  case 'SET_MESSAGE':
    return action.data
  default:
    return state
  }
}

export const setNotification = (data, time) => {
  return async (dispatch) => {
    dispatch ({
      type: 'SET_MESSAGE',
      data,
    })
    let id = window.setTimeout(async () => {
      return dispatch({
        type: 'SET_MESSAGE',
        data: '',
      })
    }, [time])
    dispatch(setTimeoutID(id))
  }
}

export default notificationReducer