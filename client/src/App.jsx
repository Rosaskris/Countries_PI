import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './components/LandingPage/landingPage'
import Home from './components/Home/homePage'
import Nav from './components/NavBar/navBar'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Detail from './components/Detail/detailPage'
import { useDispatch, useSelector } from 'react-redux'
import { SEARCH, loadActivities, loadContent, resetFilter, searchCountry, setLoading, serverOff } from './components/Redux/action-types'
import Form from './components/Form/formPage'
import Activity from './components/Activities/activities'
import Error from './components/Error/error'
import About from './components/About/about'

function App() {
  const loading= useSelector(state=>state.loading)
  let location= useLocation()
  const [countries, setCountries]= useState([])
  const dispatch = useDispatch();
  let myCountries = useSelector(state => state.myCountries);
  

  //initialRender
    useEffect(() => {
      dispatch(setLoading(true))
      dispatch(loadActivities())
      axios.get('https://countries-back-nl4x.onrender.com/myCountries/countries')
      .then(response => {
            setCountries(response.data);
            dispatch(setLoading(false))
      })
      .catch(error => {
          console.error('Error fetching countries:', error);
          dispatch(serverOff(error))
          dispatch(setLoading(false))
      });
      }, []);

//load content of allCountries
  useEffect(() => {
    if (!loading){
      dispatch(loadContent());
    }
  }, [dispatch]);

//load activities
useEffect(() => {
  if(!loading){
    dispatch(loadActivities());
  }
}, [dispatch]);

//reset filter
  useEffect(()=>{
    if(location.pathname!=='/home' && myCountries.length > 0){
      dispatch(resetFilter())
    }
  }, [dispatch, location.pathname, myCountries.length])

//reset seCountries
const backHome = () => {
    dispatch(setLoading(true))
    axios.get('https://countries-back-nl4x.onrender.com/myCountries/countries')
    .then(response => {
        dispatch(resetFilter())
        setCountries(response.data);
        dispatch(setLoading(false))
    })
    .catch(error => {
        console.error('Error fetching countries:', error);
        dispatch(setLoading(false))
    });
  
};


//pages
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
//searchName
const onSearch = async (name) => {
  if (!loading) {
      try {
          const response = await dispatch(searchCountry(name));
          if (response && response.type === SEARCH && response.payload && response.payload.length > 0) {
              setCountries(name);
              setCurrentPage(1);
          } else {
              window.alert('Are you sure about that name?');
          }
      } catch (error) {
          console.error('Error searching country', error);
      }
  }
};


    
  return (
    <div className='app'>
      {location.pathname !=='/' && <Nav search={onSearch} backHome={backHome}/>}
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home countries={countries} onPageChange={handlePageChange} currentPage={currentPage} backHome={backHome}/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/form' element={<Form/>}/>
      <Route path='/activities' element={<Activity/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='*' element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default App
