import './home.modules.css'
import Card from '../Card/card'
import { useEffect, useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterActivities, filterByContinents, orderAlfabetico, orderPopulation } from '../Redux/action-types';

const Home=({countries, onPageChange, currentPage, backHome})=>{
    const countriesPerPage = 10;
    
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const dispatch= useDispatch();
    let myCountries = useSelector(state => state.myCountries);
    let allActivities = useSelector(state => state.allActivities);
    const error= useSelector(state=> state.error)
    const loading= useSelector(state=>state.loading)
    const[aux, setAux]=useState(false)
    // const [currentCountries, setCurrentCountries]=useState(countries.slice(indexOfFirstCountry, indexOfLastCountry))
    // const [totalPages, setTotalPages]=useState(Math.ceil(countries.length / countriesPerPage))

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

    // useEffect(()=>{
        if(loading){
            return(
                <div className='loading'><h1>LOADING...</h1></div>
            )
        }else if(countries.length){
        const currentCountries = myCountries.length
        ? myCountries.slice(indexOfFirstCountry, indexOfLastCountry)
        : countries.slice(indexOfFirstCountry, indexOfLastCountry);

        const totalPages = myCountries.length
        ? Math.ceil(myCountries.length / countriesPerPage)
        : Math.ceil(countries.length / countriesPerPage)

    
        return(
        <div className='home1'>
            <div className='pages'>
            <button className='buttonPages'disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button className='numberPages' key={index + 1} onClick={() => onPageChange(index + 1)}>
                {index + 1}
                </button>
            ))}
            <button className='buttonPages' disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
            </div>
        <div className='homePage'>
            <div className='filters'> 
            <h4>Filter</h4>
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
            </select>

            <select name="OrderNum" id="Population Order"  onChange={handleOrderPopulation} className='filter'>
            <option value="Null" >Order by population</option> 
            <option value="D">More populated first</option>
            <option value="A">Less populated first</option>
            </select>

            <select name="FilterActivities" id="Activities Order" onChange={handleFilterActivities} className='filter'>
            <option value="Null" >Filter by Activities</option> 
            {allActivities.map(activity=>{
                return <option key={activity.id} value={activity.name}>{activity.name}</option>
            })}
            </select>
            <button onClick={backHome} className='clearFilterButton'> Clear filters </button>
            </div>

            <div className='home2'>
            <div className='countries'>
            {(currentCountries.map((e) => (
            <Card key={e.id} flag={e.flags} name={e.commonName} id={e.id} continent={e.continents} />
            )))}
            {console.log(currentCountries)}
        </div>
            </div>

            </div>
            </div>
        )} else{
            return(
                <div className='serverOff'><h1>Something went wrong!</h1></div>
            )
        }
    

}

export default Home