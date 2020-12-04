import React from 'react'
import PropTypes from 'prop-types'

import { Alert } from '@material-ui/lab'

const Notification = ({ notification }) => {

  Notification.propTypes = {
    notification: PropTypes.object
  }

  if (notification.message === null) {
    return null
  }
  return (
    <Alert severity={notification.type}>
      {notification.message}
    </Alert>
  )
}

export default Notification