const {Activity, Country} = require('../db.js');

const getActivities= async (req,res)=>{
    try{
        const allActivities= await Activity.findAll({
            include:{
                model: Country,
                attributes: ["commonName"],
                through:{
                    attributes:[]
                }
            }
        })
        if(allActivities.length){
            return res.status(200).json(allActivities)
        }else{
            return res.status(404).json({ message: 'No activities to show yet, create one!' })
        }
    }
    catch(error){
        return res.status(500).json({ error: error.message });
    }
}

module.exports= getActivities