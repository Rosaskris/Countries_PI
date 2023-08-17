const {Activity, Country} = require('../db.js');

const postActivity= async (req,res)=>{
    const {name, dificulty,duration,season,countries}= req.body
    try{
        if(!name || !dificulty || !duration || !season || !countries){
            return res.status(404).json({ message: 'Missing informarion' })
        } else{
            const newActivity= await Activity.create({name,dificulty,duration,season})
            const associatedCountries= await Country.findAll({
                where:{
                    id:countries
                }
            })
            console.log(associatedCountries)
            if (associatedCountries.length > 0) {
                await newActivity.addCountries(associatedCountries.datavalues);
            }
            
            return res.status(201).json(newActivity)
        }
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports= postActivity