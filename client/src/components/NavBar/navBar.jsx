import  './nav.modules.css'
import SearchBar from './searchBar'


export default function Nav(props){
    return(
        <nav className='nav'> 
        <div><h1 className='titleNav'>Countries APP</h1></div>
        <div>
        <SearchBar onSearch={props.search} backHome={props.backHome}/>
        </div>
        </nav>
    )
}