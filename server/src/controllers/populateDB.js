
const {Country} = require('../db.js');
const axios= require('axios')

const populateDB= async (req,res)=>{

    try {
        const { data } = await axios.get("http://localhost:5000/countries");
        const countriesToCreate = data.map(countryData => {
            const { cca3, name, flags, continents, capital, subregion, area, population } = countryData;
            return {
                id: cca3,
                commonName: name.common,
                officialName: name.official,
                flags: flags.png,
                continents: continents.join(', '),
                capital: capital ? capital[0] : null,
                subregion,
                area,
                population
            };
        });
        
        await Country.bulkCreate(countriesToCreate);
        
        return res.status(201).json('Database populated correctly');
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports= populateDB