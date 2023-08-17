import './home.modules.css'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Card from '../Card/card'

const Home=(props)=>{
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        // Fetch data from the backend API
        axios.get('http://localhost:3001/myCountries/countries')
        .then(response => {
            // Set the retrieved data in the state
            setCountries(response.data);
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
        }, []);

    const [currentPage, setCurrentPage] = useState(1);
    const countriesPerPage = 10;

    const indexOfLastCountry = currentPage * countriesPerPage;
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage;
    const currentCountries = countries.slice(indexOfFirstCountry, indexOfLastCountry);

    const totalPages = Math.ceil(countries.length / countriesPerPage);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };



    return(
        <div >
            <h2 className='homeTitle'>All countries</h2>
        <div className='countries'>
        {currentCountries.map((char) => (
            <Card key={char.id} flag={char.flags} name={char.commonName} id={char.id} continent={char.continents}/>
        ))} 
        </div>
                <div>
                <button disabled={currentPage === 1} onClick={() => handlePageChange(currentPage - 1)}>
                    Previous
                </button>
                <button disabled={currentPage === totalPages} onClick={() => handlePageChange(currentPage + 1)}>
                    Next
                </button>
        </div>
        </div>
    )
}

export default Home