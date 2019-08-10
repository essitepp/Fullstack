import React from 'react';
import ReactDOM from 'react-dom';
import Course from './components/Course'

const App = () => {
    const courses = [
        {
          name: 'Half Stack application development',
          parts: [
            {
              name: 'Fundamentals of React',
              exercises: 10,
              id: 1
            },
            {
              name: 'Using props to pass data',
              exercises: 7,
              id: 2
            },
            {
              name: 'State of a component',
              exercises: 14,
              id: 3
            },
            {
              name: 'Redux',
              exercises: 11,
              id: 4
            }
          ]
        }, 
        {
          name: 'Node.js',
          parts: [
            {
              name: 'Routing',
              exercises: 3,
              id: 1
            },
            {
              name: 'Middlewares',
              exercises: 7,
              id: 2
            }
          ]
        }
    ]
    
    const rows = () => 
        courses.map(course => <Course key={course.name} course={course}/>)

    return (
        <>
        {rows()}
        </>
    )
}

// const Course = ({ course }) => {
//     return (
//         <div>
//         <Header name={course.name}/>
//         <Content parts={course.parts}/>
//         <Total parts={course.parts}/>
//         </div>
//     )
// }

// const Header = ({ name }) => {
//     return (       
//         <h1>{name}</h1>        
//     )
// }

// const Content = ({ parts }) => {
//     const rows = () => 
//         parts.map(part => <Part key={part.id} name={part.name} count={part.exercises}/>)

//     return (
//         <>   
//         {rows()}    
//          </>
//     )
// }

// const Total = ({ parts }) => {
//     const total = 
//         parts.reduce(((sum, part) => sum + part.exercises),0)
//     return (
//         <p><strong>Total of {total} exercises</strong></p>
//         // <p>Number of exercises {parts[0].exercises + parts[1].exercises + parts[2].exercises}</p>
//     )
// }

// const Part = (props) => {
//     return (
//         <p>{props.name} {props.count}</p>
//     )
// }

ReactDOM.render(<App />, document.getElementById('root'));
