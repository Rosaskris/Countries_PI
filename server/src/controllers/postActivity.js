const {Activity, Country} = require('../db.js');

const postActivity= async (req,res)=>{
    const {name, difficulty,duration,season,countries}= req.body
    try{
        if(!name || !difficulty || !duration || !season || !countries){
            return res.status(404).json({ message: 'Missing informarion' })
        } else{
            const newActivity= await Activity.create({name,difficulty,duration,season})
            const associatedCountries= await Country.findAll({
                where:{
                    commonName:countries
                }
            })
            console.log(associatedCountries)
            if (associatedCountries.length > 0) {
                await newActivity.addCountries(associatedCountries);
            }
            
            return res.status(201).json(newActivity)
        }
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports= postActivity