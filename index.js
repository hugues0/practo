//import express from 'express';
const express = require ('express');
const app = express();
const Joi = require('joi');
const logger = require('./logger');
const auth = require('./authentication');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static('public'));
app.use(morgan('tiny'));

app.use(logger);
app.use(auth);

const students = [
    {id: 1, name: 'hugues'},
    {id: 2, name: 'jeexy'},
    {id: 3, name: 'manisha'},
]

app.get('/',(req,res)=>{
    res.send('hello world');
});

app.get('/api/students',(req,res)=>{
    res.send(students);
});

 app.post('/api/students',(req,res)=>{
      const { error } = validateStudent(req.body);
    if (error) return res.status(404).send(result.error.details[0].message);
        
    const student = {
        id: students.length +1,
        name: req.body.name
    };
    students.push(student);
    res.send(student);
        
 });

app.get('/api/students/:id', (req,res) =>{
    const student = students.find(c => c.id === parseInt(req.params.id));
    if (!student) return res.status(404).send('student with the given id was not found in the database');
    res.send(student);
});

app.put('/api/students/:id',(req,res) =>{
    const student = students.find (c =>c.id === parseInt (req.params.id));
    if (!student) return res.status(404).send('student with the given id was not found in the database');
    
  //  const result = validateStudent(req.body);
    const { error } = validateStudent(req.body);
    if (error)return res.status(404).send(error.details[0].message);

    student.name = req.body.name;
    res.send(student);
     
});

app.delete('/api/students/:id',(req,res) => {
    const student = students.find (c =>c.id === parseInt (req.params.id));
    if (!student) return res.status(404).send('student with the given id was not found in the database');
    const index = students.indexOf(student);
    students.splice (index,1);
    res.send(student);
});

function validateStudent(student){
     const schema = {
        name: Joi.string().min(3).required()
    };
    return Joi.validate(student, schema);
    
    }


const port = process.env.PORT || 3000 ; 
app.listen(port,()=> console.log(`listening on port ${port}`));
  