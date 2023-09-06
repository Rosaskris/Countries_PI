import { Link } from 'react-router-dom'
import './card.modules.css'

export default function Card(props) {
    return(
        <div className="card">
            <div className='flagContainer'>
                <img src={props.flag} alt="country flag" className='flag'/>
            </div>
            <Link to={`/detail/${props.id}`}>
            <h1 className='cardName'>{props.name}</h1>
            </Link>
            <h2>{props.continent}</h2>
        </div>
    )

}