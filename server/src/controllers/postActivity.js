const {Activity, Country} = require('../db.js');

const postActivity= async (req,res)=>{
    const {name, difficulty,duration,season,countries}= req.body
    try{
        if(!name || !difficulty || !duration || !season || !countries){
            return res.status(404).json({ message: 'Missing informarion' })
        } else{
            const [newActivity, created] = await Activity.findOrCreate({
                where: { name, difficulty, duration, season, countries },
                defaults: {} 
            });
            if(created){
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
            } else{
                return res.status(406).json({message:'Activity already exists'})
            }

        }
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports= postActivity