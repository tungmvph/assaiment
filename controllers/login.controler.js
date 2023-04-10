const express = require('express')
const UsModale=require('../modals/usera')
const app = express();


app.get('/',(req,res) =>{
    res.render('login/dn.hbs'
    )

})

module.exports=app;