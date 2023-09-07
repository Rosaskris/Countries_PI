import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './components/Redux/Store'
import axios from 'axios'

axios.defaults.baseURL='https://countries-back-nl4x.onrender.com';
// axios.defaults.baseURL='https://localhost:3001'

ReactDOM.createRoot(document.getElementById('root')).render(
<Provider store={store}>
<BrowserRouter>
    <App />
</BrowserRouter>
</Provider>)
