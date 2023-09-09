import './detail.modules.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { loadContent, setDetail, setLoading } from '../Redux/action-types';
import { Link } from 'react-router-dom';


export default function Detail(props){
    const loading=useSelector(state=>state.loading);
    // const country= useSelector(state=>state.myCountries)
    const dispatch = useDispatch();
    const {id}= useParams();
    const [country, setCountry]= useState({});

    useEffect(() => {
    if(!loading){
        // dispatch(setDetail(id))
        dispatch(setLoading(true))
        axios.get(`/country/${id}`).then(
            res=>{
                const countrySelected= res.data
                setCountry(countrySelected)
                console.log(id, countrySelected)
                dispatch(setLoading(false))
            }
        )
        .catch( error=>{
            console.log(error)
            dispatch(setLoading(false))
        })
    }
    },[id, dispatch])

    if(loading){
        return(
            <div className='loading'>
            <div aria-label="Orange and tan hamster running in a metal wheel" role="img" className="wheel-and-hamster">
                <div className="wheel"></div>
                <div className="hamster">
                    <div className="hamster__body">
                        <div className="hamster__head">
                            <div className="hamster__ear"></div>
                            <div className="hamster__eye"></div>
                            <div className="hamster__nose"></div>
                        </div>
                        <div className="hamster__limb hamster__limb--fr"></div>
                        <div className="hamster__limb hamster__limb--fl"></div>
                        <div className="hamster__limb hamster__limb--br"></div>
                        <div className="hamster__limb hamster__limb--bl"></div>
                        <div className="hamster__tail"></div>
                    </div>
                </div>
                <div className="spoke"></div>
            </div>
            </div>
        )
    }else{
    return(
        <div className='details'>
            <div className='countryName'>
            {country.commonName && <h2>{country.commonName}</h2>}
            {country.officialName && <h3>Official Name: {country.officialName}</h3>}
            {country.flags && <img src={country.flags} alt="flag" />}
            {country.maps &&<a href={country.maps} target="_blank" rel="noopener noreferrer">Click to view map</a>}
            </div>
        <div className='countryInfo'>
            {country.continents && <h3>Continent: {country.continents}</h3>}
            {country.capital &&<h3>Capital: {country.capital}</h3>}
            {country.subregion &&<h3>Subregion: {country.subregion}</h3>}
            {country.area &&<h3>Area: {country.area}m2</h3>}
            {country.population &&<h3>Population: {country.population}</h3>}
            {country.languages &&<h3>Languages: {country.languages}</h3>}
            {country.Activities &&
            country.Activities.length?
            <div>
                <h3>What to do here:</h3>
                <ul key={country.id}>
                {country.Activities.map(activity => (
                <div>
                    <li key={activity.id}>{activity.name}</li>
                </div>
                ))}
                </ul>
            </div> :
            <div>
                <h3>What to do here:</h3>
                <Link to={'/form'}>
                <li>No Activties yet. Add One!</li>
                </Link> 

            </div>
            }
            {country.id && <h3>ID: {country.id}</h3>}
        </div>
        </div>
    )}
}