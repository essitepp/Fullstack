const initialState = {
  message: null,
  type: null
}

const notificationReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'SET_NOTIFICATION':
      return {
        ...state,
        message: action.data.message,
        type: action.data.type
      }
    case 'RESET_NOTIFICATION':
      return {
        ...state,
        message: null
      }
    default:
      return state
  }
}

export const setNotification = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    data: notification
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_NOTIFICATION'
  }
}

export default notificationReducer