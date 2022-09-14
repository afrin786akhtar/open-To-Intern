const express = require('express')
const router = express.Router()
const collegeController= require('../Controllers/collegeController')
const InternController= require('../Controllers/InternController')

//-----------------dummy---------------------

router.get("/test-me",function(req,res){
    res.send("maari api testing")
})

//--------------createCollege----------------

router.post("/functionup/colleges", collegeController.createCollege)

router.post('/functionup/interns', InternController.createIntern)

module.exports = router