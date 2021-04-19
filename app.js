require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path=require('path')

const urlRoutes = require('./routes/url');

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.use(express.static('public'));

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views','ejs'));

app.use(urlRoutes);

mongoose.connect(process.env.mongoConnectionString, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        app.listen(3000);
    })
    .catch(err=>{
        console.log(err)
    })

app.use((err,res,req,next)=>{
    console.log(err);
})
