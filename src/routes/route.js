const express = require('express')
const router = express.Router()

//-----------------dummy---------------------

router.get("/test-me",function(req,res){
    res.send("maari api testing")
})

//--------------

module.exports = router