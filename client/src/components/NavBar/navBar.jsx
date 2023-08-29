import  './nav.modules.css'
import SearchBar from './searchBar'
import { Link } from 'react-router-dom';


export default function Nav({search,backHome}){
    return(
        <nav className='nav'> 
        <div><h1 className='titleNav'>CODE WORLD</h1></div>
        <div>
        <SearchBar onSearch={search}/>
        </div>
        <div className='buttonsNav'>
        <Link to={'/home'}>
            <button  className='buttonNav' onClick={backHome}>
                Home
            </button>
            </Link> 
            <Link to={'/form'}>
            <button className='buttonNav'>
                Create activity
            </button>
            </Link> 
            <Link to={'/activities'}>
            <button className='buttonNav'>
                View activities
            </button>
            </Link> 
        </div>
        </nav>
    )
}