const {Country, Activity} = require('../db.js');

const getCountryById= async (req,res)=>{
    const {id}=req.params
    try {
        const selectedCountry= await Country.findOne({ 
            where: { id: id },
            include:{
                model: Activity,
                attributes: ["name"],
                through:{
                    attributes:[]
                }
            }
        })
        if (!selectedCountry) {
            return res.status(404).json({ message: 'Country not found' });
            } else{ return res.status(200).json(selectedCountry);}
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports=getCountryById