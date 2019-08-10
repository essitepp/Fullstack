import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Person = ({ name, number })  => {
    return (
        <div>
        {name} {number}
        </div>
    )
}

const Persons = ({ filter, persons }) => {
    const show = filter === ''
    ? persons
    : persons.filter(person => 
        person.name.toLowerCase().includes(
            filter.toLowerCase()))
    
    const rows = () => show.map(person => 
        <Person key={person.name} name={person.name} 
        number={person.number}/>
    )
    
    return (
        <div>
        {rows()}
        </div>
    )
}

const Filter = ({ filter, handleFilterChange}) => {
    return (
        <div>
            Filter shown numbers
            <input
            value={filter}
            onChange={handleFilterChange}/>
        </div>
    )
}

const AddForm = ({ newName, newNumber, 
    persons, setPersons, setNewName, setNewNumber, 
    handleNameChange, handleNumberChange }) => {

    const addPerson = (event) => {
        event.preventDefault()
        const personObject = {
            name: newName,
            number: newNumber
        }
        if (persons.map(person => 
            person.name).includes(newName)) {
                window.alert(`${newName} is already added to phonebook`)
        } else {
            setPersons(persons.concat(personObject))
            setNewName('')
            setNewNumber('')
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


const App = () => {
    const [ persons, setPersons ] = useState([
        { 
            name: 'Arto Hellas',
            number: '040-123456' 
        },
        { 
            name: 'Ada Lovelace', 
            number: '39-44-5323523' 
        },
        { 
            name: 'Dan Abramov', 
            number: '12-43-234345' 
        },
        { 
            name: 'Mary Poppendieck', 
            number: '39-23-6423122' 
        }
    ])

    const [ newName, setNewName ] = useState('')
    const [ newNumber, setNewNumber ] = useState('')
    const [filter, setFilter ] = useState('')

    const handleNameChange = (event) => {
        setNewName(event.target.value)
    }

    const handleNumberChange = (event) => {
        setNewNumber(event.target.value)
    }

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
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
            />
            <h2>Numbers</h2>
            <Persons 
                filter={filter} 
                persons={persons}
            />
        </div>
    )
}




ReactDOM.render(<App />, 
    document.getElementById('root'));


