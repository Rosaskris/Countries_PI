const {Country} = require('../db.js');
const axios= require('axios')

const getCountries= async (req,res)=>{
    try {
        const allCountries= await Country.findAll()
        return res.status(200).json(allCountries);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports=getCountries