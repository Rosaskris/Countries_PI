const {Country, Activity} = require('../db.js');

const getCountries= async (req,res)=>{
    try {
        const allCountries= await Country.findAll({
            include:{
                model: Activity,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        }
        )
        return res.status(200).json(allCountries);
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports=getCountries