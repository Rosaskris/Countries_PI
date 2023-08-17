const {Country, Activity} = require('../db.js');
const { Op } = require("sequelize");

const getCountryByName= async (req,res)=>{
    const {name}=req.params
    try {
        const selectedCountry= await Country.findOne({ 
            where: {
                [Op.or]: [
                    { commonName: { [Op.iLike]: `%${name}%` } }, // Compare with common name
                    { officialName: { [Op.iLike]: `%${name}%` } } // Compare with official name
                ]
            },
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

module.exports=getCountryByName


