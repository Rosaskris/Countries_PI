
import './card.modules.css'

export default function Card(props) {


    return(
        <div className="card">
            <h2>{props.name}</h2>
            <img src={props.flag} alt="country flag" className="flag"/>
            <h3>Continent: {props.continent}</h3>
        </div>
    )

}