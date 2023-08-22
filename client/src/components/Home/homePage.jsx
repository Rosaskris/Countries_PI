import './home.modules.css'
import Card from '../Card/card'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterByContinents, orderAlfabetico, orderPopulation } from '../Redux/action-types';

const Home=({countries, onPageChange, currentPage})=>{
    const dispatch= useDispatch();
    let myCountries = useSelector(state => state.myCountries);
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

    const countriesPerPage = 10;
    const totalPages = Math.ceil(countries.length / countriesPerPage)

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = myCountries.length
    ? myCountries.slice(indexOfFirstCountry, indexOfLastCountry)
    : countries.slice(indexOfFirstCountry, indexOfLastCountry);
    
        return(
        <div >
            <select  name="Filter" onChange={handleFilter} className='filterContinents'>
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

            <select name="Order" id="Alphabetic Order"  onChange={handleOrderAZ} className='orderAlphabet'>
            <option value="Null" >Order A-Z</option>   
            <option value="A">A-Z</option>
            <option value="D">Z-A</option>
            <option value="All" >Show all</option>
            </select>

            <select name="OrderNum" id="Population Order"  onChange={handleOrderPopulation} className='orderAlphabet'>
            <option value="Null" >Order by population</option> 
            <option value="D">More populated first</option>
            <option value="A">Less populated first</option>
            <option value="All" >Show all</option>
            </select>

        <div className='countries'>
            {(currentCountries.map((e) => (
            <Card key={e.id} flag={e.flags} name={e.commonName} id={e.id} continent={e.continents} />
            )))}
        </div>
            <div>
            <button disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>
            <button disabled={currentPage === totalPages} onClick={() => onPageChange(currentPage + 1)}>
                Next
            </button>
            </div>
            </div>
        )
    

}

export default Home