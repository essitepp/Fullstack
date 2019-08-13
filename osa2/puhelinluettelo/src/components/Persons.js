import React from 'react'
import Person from './Person'

const Persons = ({ filter, persons, deletePerson }) => {
    const show = filter === ''
        ? persons
        : persons.filter(person => 
            person.name.toLowerCase().includes(
                filter.toLowerCase()))
    
    const rows = () => show.map(person => 
        <Person 
            key={person.name} 
            name={person.name} 
            number={person.number}
            handleDelete={() => deletePerson(person.id, person.name)}
            />
    )
    
    return (
        <div>
        {rows()}
        </div>
    )
}

export default Persons