import {LOAD_CONTENT, FILTER_CONTINENT, RESET_FILTER, ORDER_ALPHABETIC, ORDER_POPULATION, SEARCH, LOAD_ACTIVITIES, FILTER_ACTIVITY, LOADING, DETAIL, DELETE_ACTIVITY, ERROR, SET_MY_COUNTRIES, ALERT, CLEAR_ALERT, CONTINENT} from "./action-types"

const initialState={
    myCountries:[],
    allCountries:[],
    myActivities:[],
    allActivities:[],
    loading:false,
    error: [],
    alert:false,
    continent:'Null'
}

const rootReducer=(state= initialState, action)=>{
    switch (action.type) {
        case CONTINENT:
            return{
                ...state,
                continent: action.payload
            }
        case ALERT:
            return{
                ...state,
                alert: action.payload
            }
        case CLEAR_ALERT:
            return{
                ...state,
                alert:''
            }
        case ERROR:
            return{
                ...state,
                error: state.error.push('Error')
            }

        case LOAD_CONTENT:
        return {
            ...state,
            allCountries: action.payload,
            myCountries:action.payload
        };
        case LOADING: 
        return {
            ...state,
            loading: action.payload,
        };
        case LOAD_ACTIVITIES:
            return{
                ...state,
                allActivities:action.payload,
                myActivities:action.payload
            }
        case DELETE_ACTIVITY:
            return{
                ...state,
                allActivities: action.payload
            }
        case RESET_FILTER:
            return{
                ...state,
                myCountries:state.allCountries
            };
        case SET_MY_COUNTRIES:
            return{
                ...state,
                myCountries:action.payload
            }
        case SEARCH:
            return{
                ...state,
                myCountries:action.payload
            }
        case FILTER_ACTIVITY:
            if(action.payload==='Null' ){
                    return {
                    ...state,
                    myCountries: state.myCountries,
                    };
                } else{
                    const selectedActivity = action.payload;
                    const filteredActivities = 
                        [...state.myCountries].filter(country =>
                        country.Activities.some(activity => activity.name.includes(selectedActivity))
                        )
                    return {
                    ...state,
                    myCountries: filteredActivities,
                    };
                }
        case FILTER_CONTINENT:
        if(action.payload==='Null' ){
                return {
                ...state,
                myCountries: state.myCountries,
            };
        } else{
                const selectedContinent = action.payload;
                const filteredCountries = 
                [...state.allCountries].filter(country =>
                country.continents.includes(selectedContinent)
                );
                return {
                ...state,
                myCountries: filteredCountries,
                };
            }
        case ORDER_ALPHABETIC:
                const sortedCountries = [...state.myCountries];
                if(action.payload==='All' || action.payload==='Null'){
                    return {
                    ...state,
                    myCountries: state.myCountries,
                    }}
                else if (action.payload === 'A') {
                        sortedCountries.sort((a, b) => a.commonName.localeCompare(b.commonName));
                } else if (action.payload === 'D') {
                        sortedCountries.sort((a, b) => b.commonName.localeCompare(a.commonName));
                        }
                return {
                    ...state,
                    myCountries: sortedCountries,
                };
        case ORDER_POPULATION:
                const sortedPopulation = [...state.myCountries];
                if(action.payload==='All' || action.payload==='Null'){
                    return {
                    ...state,
                    myCountries: state.myCountries,
                }}
                else if (action.payload === 'A') {
                    sortedPopulation.sort((a, b) => a.population-b.population);
                } else if (action.payload === 'D') {
                    sortedPopulation.sort((a, b) => b.population-a.population);
                }
                return {
                    ...state,
                    myCountries: sortedPopulation,
                };
        default:
            return state
    }
}

export default rootReducer