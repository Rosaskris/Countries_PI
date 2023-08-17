import { Link } from "react-router-dom";
import "./landing.modules.css";

export default function Landing(){

    return(
    <body className="bodyLanding">
    <div className="landing">
        <h1>Welcome to my Countries page</h1>
        <Link to='/home'>
        <button>Start exploring the world</button>
        </Link>
    </div>
    </body>

    )
    
}
