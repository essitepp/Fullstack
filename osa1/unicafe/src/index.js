import React, { useState } from 'react';
import ReactDOM from 'react-dom';


const Button = ({ text, handleClick }) => (
    <button onClick={handleClick}>
        {text}
    </button>
)

const Statistic = ({ text, value }) => (
    <>
    {/* <p>{text} {value}</p> */}
    <tr>
        <td>{text}</td>
        <td>{value}</td>
    </tr>
    </>
)

const Statistics = ({ good, neutral, bad }) => {
    const all = good + neutral + bad
    const average = (good - bad)/all
    const positive = 100 * good / all
    if (all > 0) {
        return (
            <div>
                <table>
                    <tbody>
                        <Statistic text='Good' value={good}/>
                        <Statistic text='Neutral' value={neutral}/>
                        <Statistic text='Bad' value={bad}/>
                        <Statistic text='All' value={all}/>
                        <Statistic text='Average' value={average}/>
                        <Statistic text='Positive' value={positive + ' %'}/> 
                    </tbody>
                </table>
            </div>
            // <div>
            //     <Statistic text='Good' value={good}/>
            //     <Statistic text='Neutral' value={neutral}/>
            //     <Statistic text='Bad' value={bad}/>
            //     <Statistic text='All' value={all}/>
            //     <Statistic text='Average' value={average}/>
            //     <Statistic text='Positive' value={positive + ' %'}/>
            // </div>
        )
    }
    return (
        <div>No feedback given</div>
    )
}
    
const App = () => {
    const [good, setGood] = useState(0)
    const [neutral, setNeutral] = useState(0)
    const [bad, setBad] = useState(0)

    const handleClickGood = () => {
        setGood(good + 1)
    }
    const handleClickNeutral = () => {
        setNeutral(neutral + 1)
    }
    const handleClickBad = () => {
        setBad(bad + 1)
    }

    return (
        <div>
            <h1>Give feedback</h1>
            <Button text='Good' handleClick={handleClickGood}/>
            <Button text='Neutral' handleClick={handleClickNeutral}/>
            <Button text='Bad' handleClick={handleClickBad}/>
            <h1>Statistics</h1>
            <Statistics good={good} neutral={neutral} bad={bad}/>
            </div>
    )
}



ReactDOM.render(<App />,
     document.getElementById('root'));


