import React from 'react'
import personService from '../services/persons'

const AddForm = ({ newName, newNumber, 
    persons, setPersons, setNewName, setNewNumber, 
    handleNameChange, handleNumberChange, changeNumber,
    setMessage, setError }) => {

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.map(person => 
            person.name).includes(newName)) {
                if (window.confirm(`${newName} is already added to phonebook. Replace the old number with a new one?`)) {
                    const id = persons.find(person => person.name === newName).id
                    changeNumber(id, newNumber)
                }
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
                    setError(false)
                    setMessage(
                        `${personObject.name} was added`
                    )
                    setTimeout(() => {
                        setMessage(null)
                    }, 2000)
                }
            )
        }
    }

    return (
        <form onSubmit={addPerson}>
                <div>
                    name: 
                    <input
                    value={newName}
                    onChange={handleNameChange}/>
                </div>
                <div>
                    number: 
                    <input
                    value={newNumber}
                    onChange={handleNumberChange}/>
                </div>
                <div>
                    <button type='submit'>add</button>
                </div>
            </form>
    )
}

export default AddForm