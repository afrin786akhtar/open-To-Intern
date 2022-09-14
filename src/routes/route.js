const express = require('express')
const router = express.Router()
const collegeController= require('../Controllers/collegeController')

//-----------------dummy---------------------

router.get("/test-me",function(req,res){
    res.send("maari api testing")
})

//--------------

router.post("/createcollege/functionup/colleges", collegeController.createCollege)
module.exports = router