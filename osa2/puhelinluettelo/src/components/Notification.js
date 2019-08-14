import React from 'react'

const Notification = ({ message, error }) => {
    if (message === null) {
        return null
    } else if (error) {
        return (
            <div className='errorNotification'>
                {message}
            </div>
        )
    } else {
        return (
            <div className='successNotification'>
                {message}
            </div>
        )
    }
}

export default Notification