import { Link } from 'react-router-dom'
import './card.modules.css'

export default function Card(props) {
    return(
        <div className="card">
            <Link to={`/detail/${props.id}`}>
            <h1 className='cardName'>{props.name}</h1>
            </Link>
            <img src={props.flag} alt="country flag" className="flag"/>
            <h2>Continent: {props.continent}</h2>
        </div>
    )

}