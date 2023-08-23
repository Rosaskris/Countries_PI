import { Link } from "react-router-dom";
import "./landing.modules.css";
import myImg from './backgroundimg.jpg'

export default function Landing(){

    return(
        
    <div className="landing">
        <div className="titleLanding1">
            <div className="titleLanding2">
            <div className="welcome">
                <h1 >CODE WORLD</h1>
                <Link to='/home'>
                <button className="buttonLanding">Start exploring the world</button>
                </Link>
            </div>
            </div>
        </div>
    </div>
    )
    
}
