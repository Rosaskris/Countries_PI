import './form.modules.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import validations from './validations';
import { useDispatch } from 'react-redux';
import { loadActivities, loadContent, alert, setLoading } from '../Redux/action-types';
import Alert from '../Alerts/alerts';

export default function Form(props){
    const dispatch= useDispatch()
    const [alertError, setAlertError] = useState(false)

    const closeAlert = () =>{
        setAlertError(false)
    }

    const [formData, setFormData]= useState({
        name: '',
        difficulty: "1",
        duration: 1,
        season: 'Summer',
        selectedCountries: [],
        countries: []
    })

    const [errors,setErrors]=useState({
        name: '',
        difficulty: '',
        duration: '',
        season: '',
        selectedCountries: '',
    })

const hasErrors = Object.values(errors).some(error => error);

    useEffect(() => {
        axios.get('/countries')
        .then(response => {
            setFormData({
                ...formData,
                countries:(response.data)
            })
        })
        .catch(error => {
            window.alert('Error fetching countries:', error);
        });
    }, []);

    const handleCountryChange=(e)=>{
        const selectedCountry= e.target.value
        if(selectedCountry!= 'null'){
            const existsCountry = formData.selectedCountries.includes(selectedCountry);
            if (existsCountry) return('Error!')
            setFormData((prevData) => ({
                ...prevData,
                selectedCountries: [...prevData.selectedCountries, selectedCountry]
            }));
            setErrors(
                validations({
                    ...formData,
                    selectedCountries:  [...formData.selectedCountries, selectedCountry]
                } ,formData, errors)
            )
        }
    }
    const handleRemoveClick = (e) => {
        e.preventDefault();
        const name = e.target.name;
        const countries = formData.selectedCountries.filter(c => c !== name);
        setFormData({
            ...formData,
            selectedCountries:countries
        });
    }

    const handleChange=(event)=>{
        setFormData({
            ...formData,
            [event.target.name]: event.target.value
            })
            
        setErrors(
            validations({
                ...formData,
                [event.target.name]: event.target.value
            } ,formData, errors)
            )
        }
        
    const handleSubmit = async (event) => {
        event.preventDefault();
        
        if(!hasErrors){
            dispatch(setLoading(true))
            const{name,difficulty,duration,season,selectedCountries}=formData
            const newActivity = {
            name,
            difficulty,
            duration,
            season,
            countries:selectedCountries
            };
            axios.post('/activities', newActivity)
            .then(response => {
                setAlertError({title: "Done!", message: "Acitivity created succesfully!"});
                setFormData({
                    ...formData,
                    name: '',
                    difficulty: "1",
                    duration: 1,
                    season: 'Summer',
                    selectedCountries: [],
                })
                dispatch(loadActivities())
                dispatch(loadContent())
                dispatch(setLoading(false))
            })
            .catch(error => {
                if(error.message.includes('406')){
                    setAlertError({title: 'Ups!', message:'Activity already exist'}); 
                } else{
                    setAlertError({title: 'Ups!', message:'Please check the data'});
                }
                dispatch(setLoading(false))
            });
        }
        else{
            setAlertError({title: 'Ups!', message:'Incorrect data, please check the errors'})
        }
    };

    return (
        <div className='formBox'>
        <div className='part1'>
        <form onSubmit={handleSubmit} className='form'>
            <div><h2>Create Activity</h2></div>
        <div className='inputForm'> 
            <label>
            Name: 
            <input type="text" value={formData.name} name='name' onChange={handleChange} className='inputActivity' />
            {errors.name && <p className='Errors'>{errors.name}</p>}
            </label>
        </div>
        <div className='inputForm'> 
            <label>
            Difficulty: 
            <input type="number" value={formData.difficulty} name='difficulty' onChange={handleChange} className='inputActivity'/>
            </label>
            {errors.difficulty && <p className='Errors'>{errors.difficulty}</p>}
        </div>
        <div className='inputForm'>
            <label>
            Duration (hours): 
            <input type="number" value={formData.duration} name='duration' onChange={handleChange} className='inputActivity'/>
            {errors.duration && <p className='Errors'>{errors.duration}</p>}
            </label>
        </div>   
        <div className='inputForm'>
            <label>
            Season: 
            <select value={formData.season} name='season' onChange={handleChange} className='inputActivity'>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
            </select>
            </label>
            {errors.season && <p className='Errors'>{errors.season}</p>}
        </div>
        <div className='inputForm'>
        <label>
            Countries: 
            <select defaultValue={'None'} name='selectedCountries' onChange={handleCountryChange} className='inputActivity'>
            <option value='null'>Select Country</option>
            {formData.countries.map(country => (
            <option key={country.commonName} value={country.commonName}>{country.commonName}</option>
            ))
            }
            </select>
            </label>
            {errors.selectedCountries && <p className='Errors'>{errors.selectedCountries}</p>}
        </div>
        <div className='buttonSubmit'>
            <button type='submitButton' className='submitButton' disabled={hasErrors}>Create Activity</button>
        </div>
        </form>
        </div>
        <div className='part2'>
        <div className='selectedCountry'>
        {formData.selectedCountries.length ?
            <div className='countryContainer'>
                    {formData.selectedCountries.map(country => {
                        const actualCountry = formData.countries.find((c) => c.commonName === country)
                        if (actualCountry) {
                        return (
                        <div key={actualCountry.id} className='countriesContainer'>
                            <a href='#' onClick={handleRemoveClick} name={actualCountry.commonName} className='closeButton'>X</a>
                            <img src={actualCountry.flags} alt={`${actualCountry.id} flag`} className='flagSelected' />
                        </div>)
                    }else{ 
                        return <div className='emptyContainer'></div>}
                        
                    })}
            </div> : <div className='noCountries'>None</div>}
        <h4>Selected Countries</h4>
            {alertError && 
                <Alert 
                title={alertError.title} 
                message={alertError.message}
                onClose={closeAlert} />
                }
        </div> 
        </div>
        </div>
    );
}