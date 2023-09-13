import { useDispatch, useSelector } from 'react-redux'
import './activities.modules.css'
import { useState } from 'react'
import { deleteActivity, loadActivities } from '../Redux/action-types'
import Alert from '../Alerts/alerts'
import trash from './trashIcon.png'

export default function Activity(props){
    const dispatch= useDispatch()
    const activities=useSelector(state=>state.allActivities)
    const [alertError, setAlertError] = useState(false)

    const closeAlert = () =>{
        setAlertError(false)
    }

    const handleDelete =(id) => {
        try {
            dispatch(deleteActivity(id));
            setAlertError({title: 'Done!', message:'Activity deleted succesfully'})
            dispatch(loadActivities());
        } catch (error) {
            setAlertError({title: 'Ups!', message:'Unexpected error, try again!'})
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
                        )})}
                    </div>} 
                    <div className='buttonDelete'><button className='deleteActivity' onClick={()=>{handleDelete(activity.id)}}>
                        <img src={trash} alt="Delete" className='trashIcon'/>
                        </button></div>
                    </div>
                </div>
            )}))}

        </div>
        {alertError && 
                <Alert 
                title={alertError.title} 
                message={alertError.message}
                onClose={closeAlert} />
                }
        </div>
    )}