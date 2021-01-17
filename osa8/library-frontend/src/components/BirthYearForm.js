import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { EDIT_BIRTHYEAR, ALL_AUTHORS } from '../queries'

const BirthYearForm = ({ authors }) => {

  const [name, setName] = useState('')
  const [year, setYear] = useState('')

  const [ editBirthYear ] = useMutation(EDIT_BIRTHYEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const submit = (event) => {
    event.preventDefault()

    if(name) {
      editBirthYear({ variables: { name, year } })

      setName('')
      setYear('')
    }
  }



  return (
    <div>
      <h3>Set birhtyear</h3>
      <form onSubmit={submit}>
        <div>
          <label>name </label>
          <select onChange={({ target}) => setName(target.value)}>
            <option hidden> -- select author -- </option>
            {authors.map(a => 
              <option key={a.id} value={a.name}>
                {a.name}
              </option>
            )}
          </select>
        </div>
        <div>
          <label>born </label>
          <input type="number" value={year} onChange={({ target }) => setYear(Number(target.value))} />
        </div>
        <button type="submit">update</button>
      </form>
    </div>
  )


}

export default BirthYearForm