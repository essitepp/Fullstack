import React from 'react'

const Notification = ({ message, type }) => {
  if (!message) {
    return null
  }
  return (
    <div style={{color: type === 'error' ? "#FF0000" : "#0000FF", padding: "10px 5px"}}>
      {message}
    </div>
  )
}

export default Notification