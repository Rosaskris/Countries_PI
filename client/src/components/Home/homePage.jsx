import './home.modules.css'
import Card from '../Card/card'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterActivities, filterByContinents, orderAlfabetico, orderPopulation } from '../Redux/action-types';

const Home=({countries, onPageChange, currentPage})=>{
    const dispatch= useDispatch();
    let myCountries = useSelector(state => state.myCountries);
    let allActivities = useSelector(state => state.allActivities)
    const[aux, setAux]=useState(false)

    const handleFilter=(e)=>{
        dispatch(filterByContinents(e.target.value))
        setAux(!aux)
        onPageChange(1)
    }

    const handleOrderAZ=(e)=>{
        dispatch(orderAlfabetico(e.target.value))
        onPageChange(1)
    }

    const handleOrderPopulation=(e)=>{
        dispatch(orderPopulation(e.target.value))
        onPageChange(1)
    }

    const handleFilterActivities=(e)=>{
        dispatch(filterActivities(e.target.value))
        onPageChange(1)
    }

    const countriesPerPage = 10;

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = myCountries.length
    ? myCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    : countries.slice(indexOfFirstCountry, indexOfLastCountry);
    const totalPages = myCountries.length
    ? Math.ceil(myCountries.length / countriesPerPage)
    : Math.ceil(countries.length / countriesPerPage)
    
        return(
        <div className='homePage'>
            <div className='filters'> 
            <select  name="Filter" onChange={handleFilter} className='filter'>
                <option value="Null" >Filter by contient</option>
                <option value="North America" >North America</option>
                <option value="South America" >South America</option>
                <option value="Europe" >Europe</option>
                <option value="Asia" >Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antarctica</option>
                <option value="All" >Show all</option>
            </select>

            <select name="Order" id="Alphabetic Order"  onChange={handleOrderAZ} className='filter'>
            <option value="Null" >Order A-Z</option>   
            <option value="A">A-Z</option>
            <option value="D">Z-A</option>
            <option value="All" >Show all</option>
            </select>

            <select name="OrderNum" id="Population Order"  onChange={handleOrderPopulation} className='filter'>
            <option value="Null" >Order by population</option> 
            <option value="D">More populated first</option>
            <option value="A">Less populated first</option>
            <option value="All" >Show all</option>
            </select>

            <select name="FilterActivities" id="Activities Order" onChange={handleFilterActivities} className='filter'>
            <option value="Null" >Filter by Activities</option> 
            {allActivities.map(activity=>{
                return <option key={activity.id} value={activity.name}>{activity.name}</option>
            })}
            <option value="All" >Show all</option>
            </select>
            </div>
            
        <div className='countries'>
            {(currentCountries.map((e) => (
            <Card key={e.id} flag={e.flags} name={e.commonName} id={e.id} continent={e.continents} />
            )))}
        </div>
            <div className='pages'>
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button key={index + 1} onClick={() => onPageChange(index + 1)}>
                {index + 1}
                </button>
            ))}
            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
            </div>
            </div>
        )
    

}

export default Home