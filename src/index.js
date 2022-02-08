const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser'); // it is used to extract or access data from body (req.body)
const route = require('./routes/route');
const multer = require('multer')
const app = express();



app.use(bodyParser.json()); // it help use recognise incoming body object is in json format
app.use(bodyParser.urlencoded({ extended: true })); // it is used to extract or access any particular key form the body data(req.body.name(key)) can say it helps us to use extension of dataBody
app.use(multer().any()) // it helps us to upload multimedia data like pdf, jpg etc.


mongoose.connect("mongodb+srv://monty-python:SnYUEY4giV9rekw@functionup-backend-coho.0zpfv.mongodb.net/vijetahiwarkar_db?retryWrites=true&w=majority", { useNewUrlParser: true })
    .then(() => console.log('mongodb running and connected'))
    .catch(err => console.log(err))


app.use('/', route); // =>  "/" hyphen represents route or domain or home page, next variable "route" represents call back function that we want res or req


app.listen(process.env.PORT || 3000, () => {
    console.log('Express app running on port ' + (process.env.PORT || 3000))
});