const notificationReducer = (state = null, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return action.message
    default:
      return state
  }
}

let currentTimeout

export const setNotification = (message, time) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      message
    })
    clearTimeout(currentTimeout)
    currentTimeout = setTimeout(() => {
      dispatch({
        type: 'SET_NOTIFICATION',
        message: null
      })
    }, time*1000)
  }
}

export default notificationReducer