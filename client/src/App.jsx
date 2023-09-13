import './App.css'
import { Route, Routes, useLocation } from 'react-router-dom'
import Landing from './components/LandingPage/landingPage'
import Home from './components/Home/homePage'
import Nav from './components/NavBar/navBar'
import { useState, useEffect } from 'react';
import axios from 'axios'
import Detail from './components/Detail/detailPage'
import { useDispatch, useSelector } from 'react-redux'
import { SEARCH, loadActivities, resetFilter, searchCountry,loadContent, setLoading,setMyCountries } from './components/Redux/action-types'
import Form from './components/Form/formPage'
import Activity from './components/Activities/activities'
import Error from './components/Error/error'
import About from './components/About/about'
import Footer from './components/footer/footer'
import Alert from './components/Alerts/alerts'

function App() {
  let location= useLocation()
  const dispatch = useDispatch();
  const loading= useSelector(state=>state.loading)
  const [currentPage, setCurrentPage] = useState(1);
  const [alertError, setAlertError] = useState(false)

  const closeAlert = () =>{
    setAlertError(false)
}
  
  //initialRender
    useEffect(() => {
        dispatch(setLoading(true))
        axios.get('/countries')
        .then (res=>
          dispatch(setMyCountries(res.data)),
          dispatch(loadActivities()),
          dispatch(setLoading(false))
        ).catch(error=>
          setAlertError({title:'Ups!', message:'Error loading content'}),
          dispatch(setLoading(false))
        )
      }, []);

//load activities
useEffect(() => {
  if(!loading){
    dispatch(loadContent()),
    dispatch(loadActivities());
  }
}, []);

//reset filter
  // useEffect(()=>{
  //   if(location.pathname!=='/home' && myCountries.length > 0){
  //     dispatch(resetFilter())
  //   }
  // }, [dispatch, location.pathname, myCountries.length])

//pages
    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

//backHone
const backHome = () => {
  if (!loading) {
        dispatch(setLoading(true))
        dispatch(setLoading(false))
        setCurrentPage(1)
  }};

//clearFilter
const clearFilter=()=>{
  if (!loading) {
        dispatch(setLoading(true))
        dispatch(resetFilter())
        dispatch(setLoading(false))
        setCurrentPage(1)
    }
}

//searchName
const onSearch = async (name) => {
  if (!loading) {
      try {
          const response= await dispatch(searchCountry(name))
          if (response && response.type === SEARCH && response.payload && response.payload.length > 0) {
              setCurrentPage(1);
          } else {
              setAlertError({title:'Ups!', message:'Are you sure about that name?'})
              dispatch(loading(false))
          }
      } catch (error) {
          console.log(error);
          dispatch(loading(false))
  }}};
    
  return (
    <div className='app'>
      {location.pathname !=='/' && <Nav search={onSearch} backHome={backHome}/>}
      {location.pathname !== '/' && <Footer/>}
      <Routes>
      <Route path='/' element={<Landing/>}/>
      <Route path='/about' element={<About/>}/>
      <Route path='/home' element={<Home onPageChange={handlePageChange} currentPage={currentPage} backHome={backHome} clearFilter={clearFilter}/>}/>
      <Route path='/detail/:id' element={<Detail/>}/>
      <Route path='/form' element={<Form/>}/>
      <Route path='/activities' element={<Activity/>}/>
      <Route path='*' element={<Error/>}/> 
      </Routes>
      {alertError && 
                <Alert 
                title={alertError.title} 
                message={alertError.message}
                onClose={closeAlert} />
                }
    </div>
  )
}

export default App
