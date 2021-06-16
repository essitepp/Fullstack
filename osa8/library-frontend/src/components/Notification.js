import React from 'react'

const Notification = ({ message }) => {
  if (!message) {
    return null
  }
  return (
    <div style={{color: "#FF0000", padding: "10px 5px"}}>
      {message}
    </div>
  )
}

export default Notification