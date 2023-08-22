import { useLocation } from 'react-router-dom';
import { useState } from 'react'
import { Link } from 'react-router-dom';


export default function SearchBar({onSearch, backHome}) {
    const [name, setName]= useState('')

    const handleChange=(event)=>{
    event.preventDefault();
    onSearch(name);
    setName('')
}
    return (
        <div id='inputSearch' style={{display:'flex', justifyContent:'spaceAround'}}>
            <form action="post" method='post' onSubmit={handleChange}>
            <input required placeholder='Country name...' type='search' className='input' onChange={event=>setName(event.target.value)} value={name}/>
            <button className='searchButton'>
            Search
            </button>
            </form>
            <Link to={'/home'}>
            <button onClick={backHome}>
                backHome
            </button>
            </Link> 
            <Link to={'/form'}>
            <button >
                create Avtivity
            </button>
            </Link> 
        </div>
    );
}