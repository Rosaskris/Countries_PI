import './detail.modules.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Detail(props){

    const {id}= useParams();
    const [country, setCountry]= useState({});

    useEffect(() => {
    axios.get(`http://localhost:3001/myCountries/country/${id}`)
    .then(response=>{
            setCountry(response.data);
            // return setCountry({});
        }
        ).catch (error=>{
            window.alert(error)
        })
    },[id])
    

    return(
        <div className='details'>
            {country.commonName && <h1>{country.commonName}</h1>}
            {country.officialName && <h2>Official Name: {country.officialName}</h2>}
            {country.flags && <img src={country.flags} alt="flag" />}
            {country.continents && <h3>Continent: {country.continents}</h3>}
            {country.capital &&<h3>Capital: {country.capital}</h3>}
            {country.subregion &&<h3>Subregion: {country.subregion}</h3>}
            {country.area &&<h3>Area: {country.area}m2</h3>}
            {country.population &&<h3>Population: {country.population}</h3>}
            {country.languages &&<h3>Languages: {country.languages}</h3>}
            {country.Activities &&
            <div>
                <h3>What to do here:</h3>
                <ul>
                {country.Activities.map(activity => (
                <li key={activity.id}>{activity.name}</li>
                ))}
                </ul>
            </div>}
            {country.id && <h3>ID: {country.id}</h3>}
            {country.maps &&<a href={country.maps} target="_blank" rel="noopener noreferrer">Click to view map</a>}

        </div>
    )
}