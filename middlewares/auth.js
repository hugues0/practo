const jwt = require('jsonwebtoken');
const express = require('express');
const { Router } = require('express');
const router = express.Router();

router.post('/',(req,res)=>{
    const user = {
        id: 3,
        name:'hugues'
    };
    const token = jwt.sign({user},'my_secret_key');
    res.json({
        token: token
    });
});

module.exports = router;