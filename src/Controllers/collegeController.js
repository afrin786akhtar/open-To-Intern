const collegeModel = require('../models/CollegeModel')

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if(Object.keys(data).length === 0){
            return res.status(400).send({ status: false, msg:"You have not provided any data"})
        }
        if(!data.name){
            return res.status(400).send({status: false, msg: "Please provide name. it's mandatory"})
        }
        let savedata = await collegeModel.create(data)
       return res.status(201).send({ status: true, data: savedata })
    } catch (err) {
       return res.status(500).send({ status: false, error: err.message})
    }
}

module.exports.createCollege = createCollege