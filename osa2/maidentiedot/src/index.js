import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios'

const App = () => {
    
    const [countries, setCountries] = useState([])
    const [filter, setFilter] = useState('')

    const handleFilterChange = (event) => {
        setFilter(event.target.value)
    }

    useEffect(() => {
        axios
            .get('https://restcountries.eu/rest/v2/all')
            .then(response => {
                setCountries(response.data)
            })
    }, [])


    return (
        <div>
            Find countries
            <input 
            value={filter}
            onChange={handleFilterChange}/>
            <Countries countries={countries} 
            filter={filter}
            setFilter={setFilter}/>
        </div>
    )
}

const Language = ({ language }) => {
    return (
        <li>{language}</li>
    )
}

const Languages = ({ country }) => {
    const languages = country.languages.map(language => 
        <Language key={language.name} language={language.name}/>
    )
    return (
        <div>
        {languages}
        </div>
    )
}

const Flag = ( {country }) => {
    return (
        <img src={country.flag}
                    alt='flag of country'
                    height='100'/>
    )
}

const Country = ( {country, full, selectCountry }) => {
    if (full) {
        return (
            <div>
                <h1>{country.name}</h1>
                <div>Capital: {country.capital}</div>
                <div>Population: {country.population}</div>
                <h2>Languages</h2>
                <Languages country={country}/>
                <br/>
                <Flag country={country} />
            </div>
        )
    }
    return (
        <div>
            {country.name}
            <button onClick={() => selectCountry(country)}>show</button>
        </div>
    )
}

const Countries = ({ countries, filter, setFilter }) => {

    const selectCountry = (country) => {
        setFilter(country.name)
    }

    if (filter === '') {
        return (
            <div>               
            </div>
        )
    }

    const show = filter === ''
        ? countries
        : countries.filter(country =>
            country.name.toLowerCase().includes(
                filter.toLowerCase()))

    if (show.length > 10) {
        return (
            <div>
                Too many matches, specify another filter
            </div>
        )
    } else if (show.length > 1) {
        const rows = show.map(country =>
            <Country key={country.name} country={country}
                full={false} selectCountry={selectCountry}/>
        )
        return (
            <div>
                {rows}
            </div>
        )
    } else if (show.length === 1) {
        const rows = show.map(country =>
            <Country key={country.name} 
            country={country}
            full={true}/>
        )
        return (
            <div>
                {rows}
            </div>
        )
    } else {
        return (
            <div>
                No matches
            </div>
        )
    }
}


ReactDOM.render(<App />, 
    document.getElementById('root'));


