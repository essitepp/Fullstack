import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

import { Button } from '@material-ui/core'

const Toggleable = React.forwardRef((props, ref) => {

  Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired
  }

  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <Button className='toggle-button' onClick={toggleVisibility} color='primary' variant='contained'>
          {props.buttonLabel}
        </Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button onClick={toggleVisibility} variant='outlined' color='primary' style={{ marginTop: 5 }}>
          Cancel
        </Button>
      </div>
    </div>
  )
})

Toggleable.displayName = 'Toggleable'
export default Toggleable