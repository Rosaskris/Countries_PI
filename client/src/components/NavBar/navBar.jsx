import  './nav.modules.css'
import { useState } from 'react';
import SearchBar from './searchBar'
import { Link } from 'react-router-dom';
import globe from './globeicon.png'
import home from './homeIcon.png'
import menu from './menuIcon.png'


export default function Nav({search,backHome}){
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleDropdownClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    return(
        <div className='fullNav'>
        <nav className='nav'> 
        <div className='titleNav'>
            <Link to="/home">
            <img src={globe} alt="globe" />
            </Link>
            <h1 >CODE WORLD</h1>
        </div>
        <div className='buttonsNav'>
        <SearchBar onSearch={search}/>
        </div>

        <div className="dropdown">
            <button className="dropbtn" onClick={handleDropdownClick}>
            <img src={menu} alt="menu" className="menuIcon" />
        </button>
        {isDropdownOpen && (
            <div className="dropdown-content">
            <Link to="/form" onClick={handleDropdownClick}>Create activity</Link>
            <Link to="/activities" onClick={handleDropdownClick}>View activities</Link>
            <Link to="/about" onClick={handleDropdownClick}>About</Link>
        </div>
        )}
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