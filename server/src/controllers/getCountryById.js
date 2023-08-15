const {Country} = require('../db.js');
const axios= require('axios')

const getCountryById= async (req,res)=>{
    const {id}=req.params
    try {
        const selectedCountry= await Country.findOne({ where: { id: id }})
        if (!selectedCountry) {
            return res.status(404).json({ message: 'Country not found' });
            } else{ return res.status(200).json(selectedCountry);}
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports=getCountryById