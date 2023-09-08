import  './nav.modules.css'
import SearchBar from './searchBar'
import { Link } from 'react-router-dom';
import globe from './globeicon.png'
import home from './homeIcon.png'
import menu from './menuIcon.png'


export default function Nav({search,backHome}){
    return(
        <div className='fullNav'>
        <nav className='nav'> 
        <div className='titleNav'>
            <img src={globe} alt="globe" />
            <h1 >CODE WORLD</h1>
        </div>
        <div className='buttonsNav'>
        <SearchBar onSearch={search}/>
        </div>
        <div className="dropdown">
            <button className="dropbtn">
                <img src={menu} alt="menu" className='menuIcon' />
            </button>
            <div className="dropdown-content">
                <Link to="/form">Create activity</Link>
                <Link to="/activities">View activities</Link>
                <Link to="/about">About</Link>
            </div>
        </div>

        </nav>
        <div className='buttonHome'>
        <Link to={'/home'}>
            <button  className='buttonNav' onClick={backHome}>
                <img className='homeIcon' src={home} alt="homeIcon" />
            </button>
            </Link>
        </div>
        </div>
    )
}