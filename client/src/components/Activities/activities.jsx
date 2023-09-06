import { useDispatch, useSelector } from 'react-redux'
import './activities.modules.css'
import { deleteActivity, loadActivities } from '../Redux/action-types'
import trash from './trashIcon.png'

export default function Activity(props){
    const dispatch= useDispatch()
    const activities=useSelector(state=>state.allActivities)

    const handleDelete = async (id) => {
        try {
            dispatch(deleteActivity(id));
            await dispatch(loadActivities());
        } catch (error) {
            console.error('Error deleting and loading activities', error);
        }
    };
    return(
        <div className='actView'> 
        <div className='title'><h1> Activities </h1></div>
        <div className="activities">
        {(activities.map((activity)=>{
            {console.log(activity)}
            return (
                <div key={activity.id}className='activity'>
                    <div className='activityName'><h3> {activity.name} </h3></div>
                    <div className='activityInfo'>
                    <div>Duration: {activity.duration}</div>
                    <div>Difficulty: {activity.difficulty}</div> 
                    <div>Season: {activity.season}</div>
                    {activity.Countries && <div>Countries: {activity.Countries.map(country=>{
                        return(
                            <li key={country.id}>{country.commonName}</li>
                        )
                    })}
                    <div className='buttonDelete'><button className='deleteActivity' onClick={()=>{handleDelete(activity.id)}}>
                        <img src={trash} alt="Delete" className='trashIcon'/>
                        </button></div>
                    </div>} 
                    </div>
                </div>
            )
        }))}
        </div>
        </div>
    )
}