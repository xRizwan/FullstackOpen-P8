const reducer = (state = null, action) => {

  switch (action.type) {
  case 'SET_TIMEOUT':
    return action.data.id
  case 'RESET_TIMEOUT':
    return null
  default:
    return state
  }
}

export const setTimeoutID = (id) => {
  return {
    type: 'SET_TIMEOUT',
    data: { id },
  }
}

export const resetTimeoutID = () => {
  return {
    type: 'RESET_TIMEOUT',
  }
}

export default reducer