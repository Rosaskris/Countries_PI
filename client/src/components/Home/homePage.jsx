import './home.modules.css'
import Card from '../Card/card'
import { useState } from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { filterActivities, filterByContinents, orderAlfabetico, orderPopulation, setContinent } from '../Redux/action-types';

const Home=({onPageChange, currentPage,clearFilter})=>{
    const dispatch= useDispatch();
    let myCountries = useSelector(state => state.myCountries);
    let allActivities = useSelector(state => state.allActivities);
    const loading= useSelector(state=>state.loading)
    // const continent= useSelector(state=> state.continent)
    const [filterContinent, setFilterContinent]= useState('Null')
    const [filterActivity, setFilterActivity]=useState('Null')
    
    const handleOrderAZ=(e)=>{
        dispatch(orderAlfabetico(e.target.value))
        onPageChange(1)
    }
    
    const handleOrderPopulation=(e)=>{
        dispatch(orderPopulation(e.target.value))
        onPageChange(1)
    }
    
    const handleFilterContinent=(e)=>{
        setFilterContinent(e.target.value),
        dispatch(filterByContinents(e.target.value)),
        dispatch(filterActivities(filterActivity)),
        onPageChange(1)
    }
    const handleFilterActivities=(e)=>{
        setFilterActivity(e.target.value),
        dispatch(filterByContinents(filterContinent)),
        dispatch(filterActivities(e.target.value)),
        onPageChange(1)
    }
//pages    
    const countriesPerPage = 10;   
    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;

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
        const currentCountries = myCountries.slice(indexOfFirstCountry, indexOfLastCountry);
        const totalPages = Math.ceil(myCountries.length / countriesPerPage)

        return(
        <div className='home1'>
            <div className='pages'>
            <button className='buttonPages'disabled={currentPage === 1} onClick={() => onPageChange(currentPage - 1)}>
                Previous
            </button>
            {Array.from({ length: totalPages }, (_, index) => (
                <button className={index +1 === currentPage? 'currentPage' : 'numberPages'} key={index + 1} onClick={() => onPageChange(index + 1)}>
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
            <select value={filterContinent} name="Filter" onChange={handleFilterContinent} className='filter'>
                <option value="Null" >Filter by contient</option>
                <option value="North America" >North America</option>
                <option value="South America" >South America</option>
                <option value="Europe" >Europe</option>
                <option value="Asia" >Asia</option>
                <option value="Africa">Africa</option>
                <option value="Oceania">Oceania</option>
                <option value="Antarctica">Antarctica</option>
            </select>

            <select value={filterActivity} name="FilterActivities" id="Activities Order" onChange={handleFilterActivities} className='filter'>
                <option value="Null" >Filter by Activities</option> 
                {allActivities.map(activity=>{
                    return <option key={activity.id} value={activity.name}>{activity.name}</option>
                })}
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
            <button onClick={clearFilter} className='clearFilterButton'> Clear filters </button>
            </div>

            <div className='home2'>
            <div className='countries'>
                
            {currentCountries.length?
            (currentCountries.map((e) => (
            <Card key={e.id} flag={e.flags} name={e.commonName} id={e.id} continent={e.continents} />
            )))
            :<div className='divEmpty'><h1>No countries to show.</h1></div>
            }
            </div>
            </div>
            </div>
            </div>
        )}}

export default Home