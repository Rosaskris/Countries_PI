import axios from 'axios'
import { useDispatch } from 'react-redux'
const LOAD_CONTENT='LOAD_CONTENT'
const RESET_FILTER='RESET_FILTER'
const FILTER_CONTINENT= 'FILTER_CONTINENT'
const ORDER_ALPHABETIC='ORDER_ALPHABETIC'
const ORDER_POPULATION='ORDER_POPULATION'
const SEARCH='SEARCH'

const loadContent=()=>{
    return async (dispatch) => {
        try{
        const {data}= await axios.get('http://localhost:3001/myCountries/countries')
                return dispatch({
                    type: LOAD_CONTENT,
                    payload: data,
                });
        }
        catch (err){
            throw(err)
        }
    };
}

const searchCountry=(name)=>{
    return async (dispatch) => {
        try{
            const {data}= await axios.get(`http://localhost:3001/myCountries/country?name=${name}`)
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
                window.alert(err)
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
        filterByContinents, loadContent,resetFilter, orderAlfabetico, orderPopulation, searchCountry, SEARCH, ORDER_ALPHABETIC, ORDER_POPULATION, RESET_FILTER, FILTER_CONTINENT, LOAD_CONTENT
}