const CollegeModel = require('../models/CollegeModel');
const InternModel = require('../models/InternModel')

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let alphabets = /^[A-Z][A-Z a-z]{3,20}$/
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        let mobileValid = /^([+]\d{2})?\d{10}$/

        if (Object.keys(data).length === 0) {
            return res.status(400).send({ status: false, msg: "You have not provided any data" })
        }
        if (!data.name) {
            return res.status(400).send({ status: false, msg: "Please provide name. it's mandatory" })
        }
        if (!alphabets.test(data.name)) {
            return res.status(400).send({ status: false, msg: "name must contain only letters and first letter is capital" })
        }
        if (!data.email) {
            return res.status(400).send({ status: false, msg: "Please provide email. it's mandatory" })
        }
        if (!emailValid.test(data.email)) {
            return res.status(400).send({ status: false, msg: `Enter valid email,${data.email} is incorrect email` })
        }
        if (!data.mobile) {
            return res.status(400).send({ status: false, msg: "Please provide Mobile Number. it's mandatory" })
        }
        if (!mobileValid.test(data.mobile)) {
            return res.status(400).send({ status: false, msg: "please provide ten digit mobile Number" })
        }
        let student = await InternModel.findOne({ email: data.email })
        if (student) {
            if (student.email) {
                return res.status(400).send({ status: false, msg: "this email is already exist" })
            }
        }
        if (student) {
            if (student.mobile) {
                return res.status(400).send({ status: false, msg: "this mobile Number is already exist" })
            }
        }

        const colleges = await CollegeModel.findOne({ name: data.collegeName }, { _id: 1 })
        if (!colleges) {
            return res.status(400).send({ status: false, msg: "this college is not available" })
        } else {
            data.collegeId = colleges._id.toString()
        }
        const { name, email, mobile, collegeId } = data

        let savedata = await InternModel.create({ name, email, mobile, collegeId })
        res.status(201).send({ status: true, data: savedata })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createIntern = createIntern