import axios from 'axios'
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
const SET_MY_COUNTRIES='SET_MY_COUNTRIES'
const ALERT= 'ALERT'
const CLEAR_ALERT= 'CLEAR_ALERT'
const CONTINENT= 'CONTINENT'

const alert=(message)=>({
    type:ALERT,
    payload:message
})

const clearAlert=()=>({
    type:CLEAR_ALERT,
    payload
})

const setLoading = (status) => ({
    type: LOADING,
    payload: status,
});

const setMyCountries=(data)=>({
        type: SET_MY_COUNTRIES,
        payload: data
})

const loadContent = (data) => {
    return async (dispatch) => {
        dispatch(setLoading(true));
        try {
            const { data } = await axios.get('/countries');
            dispatch({
                type: LOAD_CONTENT,
                payload: data,
            });
            dispatch(setLoading(false));
        } catch (err) {
            window.alert(err);
            dispatch(setLoading(false));
        }
    };
};

const loadActivities=()=>{
    return async (dispatch) => {
        try{
        dispatch(setLoading(true))
        const {data}= await axios.get('/activities')
                dispatch({
                    type: LOAD_ACTIVITIES,
                    payload: data,
                });
                dispatch(setLoading(false))
        }
        catch (err){
            window.alert(err)
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
            const {data}= await axios.delete(`/activities/${id}`)
            dispatch({
                type:DELETE_ACTIVITY,
                payload: data
            })
            dispatch(setLoading(false))
        } catch (error) {
            window.alert('Error deleting Activity', error);
            dispatch(setLoading(false))
        }
    }
}

const searchCountry=(name)=>{
    return async (dispatch) => {
        try{
            dispatch(setLoading(true))
            const {data}= await axios.get(`/country?name=${name}`)
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

const setContinent=(status)=>{
    return{
        type: CONTINENT,
        payload: status
    }
}

export{
        filterByContinents, loadContent,resetFilter, orderAlfabetico, orderPopulation, searchCountry,loadActivities, filterActivities,
        setLoading, deleteActivity,setMyCountries,alert,clearAlert, setContinent,
        LOADING,FILTER_ACTIVITY, LOAD_ACTIVITIES, SEARCH, ORDER_ALPHABETIC, ORDER_POPULATION, 
        RESET_FILTER, FILTER_CONTINENT, LOAD_CONTENT, DETAIL, DELETE_ACTIVITY, ERROR, SET_MY_COUNTRIES, ALERT,CLEAR_ALERT, CONTINENT
}