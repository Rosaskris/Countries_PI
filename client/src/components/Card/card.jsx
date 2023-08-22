import { Link } from 'react-router-dom'
import './card.modules.css'

export default function Card(props) {
    return(
        <div className="card">
            <Link to={`/detail/${props.id}`}>
            <h2>{props.name}</h2>
            </Link>
            <img src={props.flag} alt="country flag" className="flag"/>
            <h3>Continent: {props.continent}</h3>
        </div>
    )

}