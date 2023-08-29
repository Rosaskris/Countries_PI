import { useLocation } from 'react-router-dom';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import './nav.modules.css'



export default function SearchBar({onSearch}) {
    const [name, setName]= useState('')
    const loading= useSelector(state=>state.loading)

    const handleChange = async (event) => {
        event.preventDefault();
        if (!loading) { // Only call onSearch if loading is false
            await onSearch(name);
            setName('');
        }
    };
    return (
        <div id='inputSearch' className='searchBar'>
            <form onSubmit={handleChange}>
            <input required placeholder='Country name...' type='search' className='input' onChange={event=>setName(event.target.value)} value={name}/>
            <button className='searchButton'>
            Search
            </button>
            </form>
        </div>
    );
}