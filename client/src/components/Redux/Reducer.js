import {LOAD_CONTENT, FILTER_CONTINENT, RESET_FILTER, ORDER_ALPHABETIC, ORDER_POPULATION, SEARCH, LOAD_ACTIVITIES, FILTER_ACTIVITY, LOADING, DETAIL, DELETE_ACTIVITY} from "./action-types"

const initialState={
    myCountries:[],
    allCountries:[],
    myActivities:[],
    allActivities:[],
    loading:false
}

const rootReducer=(state= initialState, action)=>{
    switch (action.type) {

        case LOAD_CONTENT:
        return {
            ...state,
            allCountries: action.payload,
            myCountries:[]
        };
        case LOADING: 
        return {
            ...state,
            loading: action.payload,
        };
        case DETAIL:
            return{
                ...state,
                myCountries: action.payload
            }
        case LOAD_ACTIVITIES:
            return{
                ...state,
                allActivities:action.payload,
                myActivities:[]
            }
        case FILTER_ACTIVITY:
                if(action.payload==='All' || action.payload==='Null'){
                    return {
                    ...state,
                    myCountries: state.allCountries,
                    };
                } else{
                        const selectedActivity = action.payload;
                        const filteredActivities = state.allCountries.filter(country =>
                            country.Activities.some(activity => activity.name.includes(selectedActivity))
                        );
                        return {
                        ...state,
                        myCountries: filteredActivities,
                        };
                    }
        case DELETE_ACTIVITY:
            return{
                ...state,
                allActivities: action.payload
            }
        case RESET_FILTER:
            return{
                ...state,
                myCountries:[]
            };
        case SEARCH:
            return{
                ...state,
                myCountries:action.payload
            }
        case FILTER_CONTINENT:
        if(action.payload==='All' || action.payload==='Null'){
            return {
            ...state,
            myCountries: state.allCountries,
            };
        } else{
                const selectedContinent = action.payload;
                const filteredCountries = state.allCountries.filter(country =>
                country.continents.includes(selectedContinent)
                );
                return {
                ...state,
                myCountries: filteredCountries,
                };
            }
        case ORDER_ALPHABETIC:
            if(!state.myCountries.length){
                const sortedCountries = [...state.allCountries];
                if(action.payload==='All' || action.payload==='Null'){
                    return {
                    ...state,
                    myCountries: state.allCountries,
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
            } else{
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
            }


            case ORDER_POPULATION:
                if(!state.myCountries.length){
                    const sortedPopulation = [...state.allCountries];
                    if(action.payload==='All' || action.payload==='Null'){
                        return {
                        ...state,
                        myCountries: state.allCountries,
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
                } else{
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
                }


        default:
            return state
    }
}

export default rootReducer