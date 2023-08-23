import './form.modules.css'
import axios from 'axios';
import { useEffect, useState } from 'react';
import validations from './validations';
import { useDispatch } from 'react-redux';
import { loadActivities } from '../Redux/action-types';

export default function Form(props){
    const dispatch= useDispatch()

    const [formData, setFormData]= useState({
        name: '',
        difficulty: 1,
        duration: '',
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

    useEffect(() => {
        axios.get('http://localhost:3001/myCountries/countries')
        .then(response => {
            setFormData({
                ...formData,
                countries:(response.data)
            })
        })
        .catch(error => {
            console.error('Error fetching countries:', error);
        });
    }, []);

    const handleCountryChange=(e)=>{
        const selectedData= e.target.selectedOptions
        setFormData({
            ...formData,
            selectedCountries:Array.from(selectedData, option=>option.value)
        })
        setErrors(
            validations({
                ...formData,
                selectedCountries:Array.from(selectedData, option=>option.value)
            } ,formData, errors)
        )
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

        const hasErrors = Object.values(errors).some(error => error);
        
        if(!hasErrors){
            const{name,difficulty,duration,season,selectedCountries}=formData
            const newActivity = {
            name,
            difficulty,
            duration,
            season,
            countries:selectedCountries
            };
            console.log(newActivity)
            axios.post('http://localhost:3001/myCountries/activities', newActivity)
            .then(response => {
                window.alert('Activity created!');
                setFormData({
                    ...formData,
                    name: '',
                    difficulty: 1,
                    duration: '',
                    season: 'Summer',
                    selectedCountries: [],
                })
                dispatch(loadActivities())
            })
            .catch(error => {
                window.alert(error);
            });
        }
        else{
            window.alert('Incorrect data, please check errors')
        }
    };

    return (
        <div className='formBox'>
        <h2>Create Activity</h2>
        <form onSubmit={handleSubmit}>
        <div className='name'> 
            <label>
            Name:
            <input type="text" value={formData.name} name='name' onChange={handleChange} />
            </label>
            {errors.name && <p className='Errors'>{errors.name}</p>}
        </div>
        <div className='difficulty'> 
            <label>
            Difficulty:
            <input type="number" value={formData.difficulty} name='difficulty' onChange={handleChange} />
            </label>
            {errors.difficulty && <p className='Errors'>{errors.difficulty}</p>}
        </div>
        <div className='duration'>
            <label>
            Duration (hours):
            <input type="number" value={formData.duration} name='duration' onChange={handleChange} />
            </label>
            {errors.duration && <p className='Errors'>{errors.duration}</p>}
        </div>   
        <div className='season'>
            <label>
            Season:
            <select value={formData.season} name='season' onChange={handleChange}>
                <option value="Summer">Summer</option>
                <option value="Fall">Fall</option>
                <option value="Winter">Winter</option>
                <option value="Spring">Spring</option>
            </select>
            </label>
            {errors.season && <p className='Errors'>{errors.season}</p>}
        </div>
        <div className='countries'>
        <label>
            Countries:
            <select multiple value={formData.selectedCountries} name='selectedCountries' onChange={handleCountryChange}>
            {/* {console.log(formData.selectedCountries)} */}
            {formData.countries.map(country => (
            <option key={country.commonName} value={country.commonName}>{country.commonName}</option>
            ))}
            </select>
            <div>
            <input
                type="text"
                value={formData.selectedCountries.join(', ')}
                readOnly
                className='SelectedCountries'
            />
            </div>
            </label>
            {errors.selectedCountries && <p className='Errors'>{errors.selectedCountries}</p>}
        </div>
        <div className='buttonSubmit'>
            <button type='submitButton'>Create Activity</button>
        </div>
        </form>
        </div>
    );
}