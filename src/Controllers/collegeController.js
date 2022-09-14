const collegeModel = require('../models/CollegeModel')
const InternModel = require('../models/InternModel')

const createCollege = async function (req, res) {
    try {
        let data = req.body
        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "You have not provided any data" })
        }
        if (!data.name) {
            return res.status(400).send({ status: false, msg: "Please provide name. it's mandatory" })
        }
        let college = await collegeModel.findOne({ name: data.name })
        if (college) {
            return res.status(400).send({ status: false, msg: "this college name is already reserved" })
        }
        if (!data.fullName) {
            return res.status(400).send({ status: false, msg: "Please provide fullName. it's mandatory" })
        }
        if (!data.logoLink) {
            return res.status(400).send({ status: false, msg: "Please provide logoLink. it's mandatory" })
        }
        let savedata = await collegeModel.create(data)
        return res.status(201).send({ status: true, data: savedata })
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

const getcollegeDetails = async function (req, res) {
    try {
        let collegeName = req.query.collegeName
        let findcollege= {}
             findcollege = await collegeModel.findOne({ name: collegeName },{updatedAt:0,createdAt:0,__v:0,isDeleted:0})
        let studentdetails = await InternModel.find({ collegeId: findcollege._id },{updatedAt:0,createdAt:0,__v:0,collegeId:0,isDeleted:0})

        // Object.assign(findcollege, {interns: studentdetails})
        // collegeDetails.findcollege= findcollege
        findcollege.interns = studentdetails
        res.status(200).send({status: true, data: findcollege})
    } catch (err) {
        return res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.getcollegeDetails = getcollegeDetails
module.exports.createCollege = createCollege