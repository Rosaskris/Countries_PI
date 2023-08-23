import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './components/LandingPage/landingPage'
import Home from './components/Home/homePage'
import Nav from './components/NavBar/navBar'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Detail from './components/Detail/detailPage'
import { useDispatch, useSelector } from 'react-redux'
import { loadActivities, loadContent, resetFilter, searchCountry } from './components/Redux/action-types'
import Form from './components/Form/formPage'

function App() {
  let location= useLocation()
  const [countries, setCountries]= useState([])
  const dispatch = useDispatch();
  let myCountries = useSelector(state => state.myCountries);

  //initialRender
    useEffect(() => {
      axios.get('http://localhost:3001/myCountries/countries')
      .then(response => {
          setCountries(response.data);
      })
      .catch(error => {
          console.error('Error fetching countries:', error);
      });
      }, []);

//load content of allCountries
  useEffect(() => {
    dispatch(loadContent());
  }, [dispatch]);

//load activities
useEffect(() => {
  dispatch(loadActivities());
}, [dispatch]);

//reset filter
  useEffect(()=>{
    if(location.pathname!=='/home' && myCountries.length > 0){
      dispatch(resetFilter())
    }
  }, [dispatch, location.pathname, myCountries.length])

//reset seCountries

const backHome=()=>{
    dispatch(loadContent())
  }

//pages
    const [currentPage, setCurrentPage] = useState(1);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };
//searchName
    const onSearch=(name)=>{
      const result=dispatch(searchCountry(name))
      if(result) {setCountries(data)
      setCurrentPage(1)}
    }

    
  return (
    <div className='app'>
      {location.pathname !=='/' && <Nav search={onSearch} backHome={backHome}/>}
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/home' element={<Home countries={countries} onPageChange={handlePageChange} currentPage={currentPage}/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/form' element={<Form/>}/>
      </Routes>
    </div>
  )
}

export default App
