const {Activity, Country} = require('../db.js');

const deleteActivity=async(req,res)=>{
    const {id}=req.params;

    try {
        const { id } = req.params;
        const act= await Activity.findAll({where:{id}})
        if(act.length){
            await Activity.destroy({ where: { id } });
    
            const allActivities= await Activity.findAll({
                include:{
                    model: Country,
                    attributes: ["commonName"],
                    through:{
                        attributes:[]
                    }
                }
            })
        
            return res.status(200).json(allActivities);

        } else{
            return res.status(404).json({message:'activity does not exists'})
        }

    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
}

module.exports= deleteActivity