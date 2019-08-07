import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>{text}</button>
)

const App = (props) => {
    const [selected, setSelected] = useState(0)
    const [points, setPoints] = useState(
        Array.apply(null, new Array(anecdotes.length)).map(Number.prototype.valueOf,0)
    ) 

    const handleClickNext = () => {
        const max = anecdotes.length
        const min = 0
        const random = Math.floor(Math.random() * (+max - +min)) + +min; 
        setSelected(random)
    }

    const handleClickVote = () => {       
        const copy = [...points]
        copy[selected] += 1
        setPoints(copy)
    }

    const mostVoted = points.indexOf(Math.max(...points))

    return (
        <div>
            <h1>Anecdote of the day</h1>
            <p>{props.anecdotes[selected]}</p>
            <p>{points[selected]} votes</p>
            <Button text='vote' handleClick={handleClickVote}/>
            <Button text='next anecdote' handleClick={handleClickNext}/>
            <h1>Anecdote with most votes</h1>
            <p>{props.anecdotes[mostVoted]}</p>
            <p>{points[mostVoted]} votes</p>
        </div>
    )
}

const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]

ReactDOM.render(<App anecdotes={anecdotes}/>, 
    document.getElementById('root'));

