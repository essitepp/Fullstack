import React from 'react'
import personService from '../services/persons'

const AddForm = ({ newName, newNumber, 
    persons, setPersons, setNewName, setNewNumber, 
    handleNameChange, handleNumberChange, changeNumber }) => {

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
                // window.alert(`${newName} is already added to phonebook`)
        } else {
            personService
                .create(personObject)
                .then(returnedPerson => {
                    setPersons(persons.concat(returnedPerson))
                    setNewName('')
                    setNewNumber('')
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