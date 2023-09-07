import axios from 'axios'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
const LOAD_CONTENT='LOAD_CONTENT'
const RESET_FILTER='RESET_FILTER'
const FILTER_CONTINENT= 'FILTER_CONTINENT'
const ORDER_ALPHABETIC='ORDER_ALPHABETIC'
const ORDER_POPULATION='ORDER_POPULATION'
const SEARCH='SEARCH'
const LOAD_ACTIVITIES= 'LOAD_ACTIVITIES'
const FILTER_ACTIVITY= 'FILTER_ACTIVITY'
const LOADING= 'LOADING'
const DETAIL= 'DETAIL'
const DELETE_ACTIVITY= 'DELETE_ACTIVITY,'
const ERROR= 'ERROR'

const serverOff=(error)=>({
    type: ERROR,
    payload:error
})

const setLoading = (status) => ({
    type: LOADING,
    payload: status,
});

const loadContent = () => {
    return async (dispatch) => {
        try {
            dispatch(setLoading(true)); // Set loading status to true
            const { data } = await axios.get('https://countries-back-nl4x.onrender.com/myCountries/countries');
            console.log('hola', data)
            dispatch({
                type: LOAD_CONTENT,
                payload: data,
            });
            dispatch(setLoading(false)); // Set loading status to false after fetching
        } catch (err) {
            console.error(err);
            dispatch(setLoading(false)); // Set loading status to false on error
        }
    };
};

const setDetail=(id)=>{
    return async(dispatch)=>{
        try {
            dispatch(setLoading(true))
            const {data}= await axios.get(`https://countries-back-nl4x.onrender.com/myCountries/country/${id}`)
            dispatch({
                type: DETAIL,
                payload: data
            })
            dispatch(setLoading(false))
        } catch (error) {
            console.error(err);
            dispatch(setLoading(false));
        }
    }
}

const loadActivities=()=>{
    return async (dispatch) => {
        try{
        dispatch(setLoading(true))
        const {data}= await axios.get('https://countries-back-nl4x.onrender.com/myCountries/activities')
                dispatch({
                    type: LOAD_ACTIVITIES,
                    payload: data,
                });
                dispatch(setLoading(false))
        }
        catch (err){
            console.log(err)
            dispatch(setLoading(false))
        }
    };
}

const filterActivities=(name)=>{
    return{
        type:FILTER_ACTIVITY,
        payload: name
    }
}

const deleteActivity=(id)=>{
    return async (dispatch)=>{
        try {
            dispatch(setLoading(true))
            const {data}= await axios.delete(`https://countries-back-nl4x.onrender.com/myCountries/activities/${id}`)
            dispatch({
                type:DELETE_ACTIVITY,
                payload: data
            })
            dispatch(setLoading(false))
        } catch (error) {
            console.error('Error deleting Activity', error);
            dispatch(setLoading(false))
        }
    }
}

const searchCountry=(name)=>{
    return async (dispatch) => {
        try{
            dispatch(setLoading(true))
            const {data}= await axios.get(`https://countries-back-nl4x.onrender.com/myCountries/country?name=${name}`)
            if(!data.length){
                window.alert('Are you sure about that name?')
            } else{
                return dispatch({
                    type: SEARCH,
                    payload: data
                })
            }
        }
        catch (err){
                console.log(err)
        }finally{
            dispatch(setLoading(false))
        }
        }
    };

const resetFilter=()=>{
    return{
        type:RESET_FILTER
    }
}


const filterByContinents=(continent)=>{
    return{
        type:FILTER_CONTINENT,
        payload: continent
    }
}

const orderAlfabetico=(order)=>{
    return{
        type:ORDER_ALPHABETIC,
        payload: order
    }
}

const orderPopulation=(order)=>{
    return{
        type:ORDER_POPULATION,
        payload:order
    }
}



export{
        filterByContinents, loadContent,resetFilter, orderAlfabetico, orderPopulation, searchCountry,loadActivities, filterActivities,setLoading, setDetail, deleteActivity, serverOff,
         LOADING,FILTER_ACTIVITY, LOAD_ACTIVITIES, SEARCH, ORDER_ALPHABETIC, ORDER_POPULATION, RESET_FILTER, FILTER_CONTINENT, LOAD_CONTENT, DETAIL, DELETE_ACTIVITY, ERROR
}