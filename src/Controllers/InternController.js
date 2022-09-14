const InternModel = require('../models/InternModel')

const createIntern = async function(req, res){
 try{
     let data = req.body;
    let savedata = await InternModel.create(data)
    res.status(201).send({status:true, data: savedata})
}catch(err){
    res.status(500).send({status:false,error: err.message})
}
}

module.exports.createIntern= createIntern