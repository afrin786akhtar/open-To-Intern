const CollegeModel = require('../models/CollegeModel');
const InternModel = require('../models/InternModel')

const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
    return true;
};

const createIntern = async function (req, res) {
    try {
        let data = req.body;
        let alphabets = /^[A-Z][A-Z a-z]{3,20}$/
        let emailValid = /^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/
        let mobileValid = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/

        if (!isValid(data)) {
            return res.status(400).send({ status: false, msg: "You have not provided any data" })
        }
        if (!isValid(data.name)) {
            return res.status(400).send({ status: false, msg: "Please provide name. it's mandatory" })
        } else {
            data.name = data.name.trim().split(" ").filter(word => word).join(" ")
        }
        if (!alphabets.test(data.name)) {
            return res.status(400).send({ status: false, msg: "name must contain only letters and first letter is capital" })
        }
        if (!isValid(data.email)) {
            return res.status(400).send({ status: false, msg: "Please provide email. it's mandatory" })
        }
        if (!emailValid.test(data.email)) {
            return res.status(400).send({ status: false, msg: `Enter valid email,${data.email} is incorrect email` })
        }
        if (!data.mobile) {
            return res.status(400).send({ status: false, msg: "Please provide Mobile Number. it's mandatory" })
        }
        if (!mobileValid.test(data.mobile)) {
            return res.status(400).send({ status: false, msg: "please provide valid mobile Number 10-digit" })
        }
        let studentemail = await InternModel.findOne({ email: data.email })
        if (studentemail) {
            if (studentemail.email) {
                return res.status(400).send({ status: false, msg: "this email is already exist" })
            }
        }
        let studentdmobile = await InternModel.findOne({ mobile: data.mobile })
        if (studentdmobile) {
            if (studentdmobile.mobile) {
                return res.status(400).send({ status: false, msg: "this mobile Number is already exist" })
            }
        }
        if (!isValid(data.collegeName)) {
            return res.status(400).send({ status: false, msg: "please provide college Name" })
        }else{
            data.collegeName = data.collegeName.trim()
        }
        
        const colleges = await CollegeModel.findOne({ name: data.collegeName })
        if (!colleges) {
            return res.status(400).send({ status: false, msg: "this college is not available" })
        } else {
            data.collegeId = colleges._id.toString()
        }

        let savedata = await InternModel.create(data)
        const { name, email, mobile, collegeId } = savedata

        res.status(201).send({ status: true, data:{ name, email, mobile, collegeId } })
    } catch (err) {
        res.status(500).send({ status: false, error: err.message })
    }
}

module.exports.createIntern = createIntern