import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
        </div>
    )
}

const Header = ({ name }) => {
    return (       
        <h1>{name}</h1>        
    )
}

const Content = ({ parts }) => {
    const rows = () => 
        parts.map(part => <Part key={part.id} name={part.name} count={part.exercises}/>)

    return (
        <>   
        {rows()}    
         </>
    )
}

const Total = ({ parts }) => {
    const total = 
        parts.reduce(((sum, part) => sum + part.exercises),0)
    return (
        <p><strong>Total of {total} exercises</strong></p>
    )
}

const Part = (props) => {
    return (
        <p>{props.name} {props.count}</p>
    )
}

export default Course