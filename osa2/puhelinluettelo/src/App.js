import React, { useState, useEffect } from 'react'
import personService from './services/persons'
import Persons from './components/Persons'
import Filter from './components/Filter'
import AddForm from './components/AddForm'


const App = () => {
    const [ persons, setPersons ] = useState([])
    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [filter, setFilter ] = useState('')

    useEffect(() => {
        personService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons)
            })
    }, [])

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    const deletePerson = (id, name) => {
        if (window.confirm(`Delete ${name}`)) { 
        personService
            .remove(id)
            .then(setPersons(persons.filter(
                person => person.id !== id)))
        }
    }

    const changeNumber = (id, newNumber) => {
        const person = persons.find(person => person.id === id)
        const changedPerson = { ...person, number: newNumber}
        personService
            .update(id, changedPerson)
            .then(returnedPerson => {
                setPersons(persons.map(person => 
                    person.id !== id
                    ? person : returnedPerson))
            })
    }

    return (
        <div>
            <h1>Phonebook</h1>
            <Filter 
                filter={filter} 
                handleFilterChange={handleFilterChange}
            />
            <h2>Add new</h2>
            <AddForm 
                newName={newName} 
                setNewName={setNewName}
                setNewNumber={setNewNumber}
                newNumber={newNumber} 
                persons={persons} 
                setPersons={setPersons} 
                handleNameChange={handleNameChange} 
                handleNumberChange={handleNumberChange}
                changeNumber={changeNumber}
            />
            <h2>Numbers</h2>
            <Persons 
                filter={filter} 
                persons={persons}
                deletePerson={deletePerson}
            />
        </div>
    )
}

export default App