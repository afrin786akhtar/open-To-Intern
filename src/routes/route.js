const express = require('express')
const router = express.Router()
const collegeController= require('../Controllers/collegeController')
const InternController= require('../Controllers/InternController')
const InternModel = require('../models/InternModel')

//-----------------dummy---------------------

router.get("/test-me",function(req,res){
    res.send("maari api testing")
})

//--------------createCollege----------------

router.post("/functionup/colleges", collegeController.createCollege)

router.post('/functionup/interns', InternController.createIntern)

router.get("/functionup/collegeDetails", collegeController.getcollegeDetails)

router.all("/**", function (req, res) {         
    res.status(400).send({
        status: false,
        msg: "The api request is not available"
    })
})

module.exports = router