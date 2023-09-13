import './detail.modules.css'
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import {setLoading } from '../Redux/action-types';
import { Link } from 'react-router-dom';
import continent from './continent-icon.png'
import capital from './capital-icon.png'
import region from './region-icon.png'
import area from './area-icon.png'
import population from './population-icon.png'
import languages from './languages-icon.png'
import activities from './activities-icon.png'



export default function Detail(props){
    const dispatch = useDispatch();
    const loading=useSelector(state=>state.loading);
    const {id}= useParams();
    const [country, setCountry]= useState({});

    useEffect(() => {
    if(!loading){
        dispatch(setLoading(true))
        axios.get(`/country/${id}`).then(
            res=>{
                const countrySelected= res.data
                setCountry(countrySelected)
                dispatch(setLoading(false))
            }
        )
        .catch( error=>{
            window.alert({message: error})
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

            {country.continents && 
                <div className='dataContainer'>
                    <div className='iconContainer'>
                        <img src={continent} className='icon' alt="icon" />
                    </div> 
                    <h3>Continent: {country.continents}</h3>
                </div>
            }
            {country.capital && 
            <div className='dataContainer'> 
                <div className='iconContainer'>
                    <img src={capital} className='icon' alt="icon" />
                </div> 
                <h3>Capital: {country.capital}</h3> 
            </div>
            }
            {country.subregion && 
            <div className='dataContainer'> 
                <div className='iconContainer'>
                    <img src={region} className='icon' alt="icon" />
                </div> 
                <h3>Subregion: {country.subregion}</h3>
            </div>
            }
            {country.area && 
            <div className='dataContainer'> 
                <div className='iconContainer'>
                    <img src={area} className='icon' alt="icon" />
                </div> 
                <h3>Area: {country.area.toLocaleString()}m2</h3>
            </div>
            }
            {country.population && 
            <div className='dataContainer'>
                <div className='iconContainer'>
                    <img src={population} className='icon' alt="icon" />
                </div> 
                <h3>Population: {country.population}</h3>
            </div>
            }
            {country.languages && 
            <div className='dataContainer'>
                <div className='iconContainer'>
                    <img src={languages} className='icon' alt="icon" />
                </div>
                <h3>Languages: {country.languages}</h3>
            </div>
            }
            {country.Activities &&
            country.Activities.length
                ?   <div className='dataContainer'>
                        <div className='iconContainer'>
                        <img src={activities} className='icon' alt="icon" />
                        </div>
                    <div>
                    <h3>What to do here:</h3>
                        <ul key={country.id}>
                        {country.Activities.map(activity => (
                        <div>
                            <li key={activity.id}>{activity.name}</li>
                        </div>
                        ))}
                        </ul>
                    </div> 
                </div>
                :   <div className='dataContainer'>
                        <div className='iconContainer'>
                            <img src={activities} className='icon' alt="icon" />
                        </div>
                    <div>
                        <h3>What to do here:</h3>
                        <Link to={'/form'}>
                        <li>No Activties yet. Add One!</li>
                        </Link> 
                    </div>
                    </div>
            }
            {country.id && 
            <h3>ID: {country.id}</h3>
            }
        </div>
        </div>
)}}