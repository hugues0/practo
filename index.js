//import express from 'express';
const express = require ('express');
const app = express();
const Joi = require('joi');
const logger = require('./middlewares/logger');
const auth = require ('./middlewares/auth');
const morgan = require('morgan');
const students = require('./routes/students')

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(morgan('tiny'));
app.use('/api/students',students);
app.use('/api/login',auth);
app.use(logger);
//app.use(auth);

const port = process.env.PORT || 3000 ; 
app.listen(port,()=> console.log(`listening on port ${port}`));
  