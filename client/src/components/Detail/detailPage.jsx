import './detail.modules.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { setDetail, setLoading } from '../Redux/action-types';


export default function Detail(props){
    const loading=useSelector(state=>state.loading);
    const country= useSelector(state=>state.myCountries)
    const dispatch = useDispatch();
    const {id}= useParams();
    // const [country, setCountry]= useState({});

    useEffect(() => {
    if(!loading){
        dispatch(setDetail(id))
    }
    },[id])
    

    return(
        <div className='details'>
            <div className='countryName'>
            {country.commonName && <h2>{country.commonName}</h2>}
            {country.officialName && <h2>Official Name: {country.officialName}</h2>}
            {country.flags && <img src={country.flags} alt="flag" />}
            </div>
            <hr />
        <div className='countryInfo'>
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
        </div>
    )
}